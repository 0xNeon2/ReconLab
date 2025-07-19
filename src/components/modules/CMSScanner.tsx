import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Play, Square, Download, AlertCircle, Save } from 'lucide-react';

const cleanCMSOutput = (raw: string) => {
  let cleaned = raw
    // Remove ANSI escape codes
    .replace(/\x1b\[[0-9;]*m/g, '')
    // Remove screen clear sequences
    .replace(/\x1b\[[0-9;]*[A-Z]/g, '')
    // Remove CMSeeK banners and branding
    .replace(/_{3,}[\s\S]*?by @r3dhax0r[\s\S]*?Version.*?K-RONA/g, '')
    .replace(/CMSeeK says ~ Fir milenge/g, '')
    .replace(/\[\+\]  CMS Detection And Deep Scan  \[\]/g, '')
    .replace(/\[\+\]  Deep Scan Results  \[\]/g, '')
    // Trim extra newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Highlight the summary block
  const summaryStart = cleaned.indexOf('┏━Target:');
  const summaryEnd = cleaned.lastIndexOf('Requests');
  if (summaryStart !== -1 && summaryEnd !== -1) {
    const endPos = summaryEnd + 'Requests'.length;
    const before = cleaned.slice(0, summaryStart);
    const highlight = cleaned.slice(summaryStart, endPos);
    const after = cleaned.slice(endPos);
    cleaned = `${before}<HIGHLIGHT>${highlight}</HIGHLIGHT>${after}`;
  }

  return cleaned;
};

const CMSScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const { currentUser } = useAuth();

  const handleRun = async () => {
    if (!url.trim()) return;

    setIsRunning(true);
    setOutput(`Starting CMSeek scan on ${url}...\n`);

    try {
      const res = await fetch('http://localhost:8000/api/run-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'cmseek',
          target: url,
          command: `cmseek`,
        }),
      });

      const data = await res.json();
      const sid = data.scan_id;
      setSessionId(sid);

      setTimeout(() => {
        pollResults(sid);
      }, 10000);
    } catch (error) {
      setOutput((prev) => prev + `Error starting scan: ${error}\n`);
      setIsRunning(false);
    }
  };

  const pollResults = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/result/${id}`);
      const data = await response.json();

      if (data.output) {
        const cleaned = cleanCMSOutput(data.output);
        setOutput((prev) => prev + '\nScan Output:\n' + cleaned);
      }

      if (data.status !== 'running') {
        setIsRunning(false);
      } else {
        setTimeout(() => pollResults(id), 3000);
      }
    } catch (error) {
      setOutput((prev) => prev + `Error fetching results: ${error}\n`);
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput((prev) => prev + '\nScan stopped by user.\n');
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output.replace(/<HIGHLIGHT>|<\/HIGHLIGHT>/g, '')], {
      type: 'text/plain',
    });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `cmseek_${url.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const handleStore = async () => {
    if (!sessionId || !output) return;
    
    setIsStoring(true);
    try {
      const response = await fetch('http://localhost:8000/api/store-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scan_id: sessionId,
          user_id: currentUser?.uid || '',
          title: `CMS Scanner - ${url}`
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsStored(true);
        alert(`Scan result stored successfully: ${data.title}`);
      } else {
        alert('Failed to store scan result');
      }
    } catch (error) {
      console.error('Error storing result:', error);
      alert('Error storing scan result');
    } finally {
      setIsStoring(false);
    }
  };

  const renderOutput = (text: string) => {
    return text.split('<HIGHLIGHT>').map((chunk, i) =>
      i % 2 === 1 ? (
        <span
          key={i}
          className="text-red-500 bg-purple-900/20 shadow-[0_0_10px_#a855f7] px-2 py-1 rounded-lg block my-2 whitespace-pre-wrap"
        >
          {chunk}
        </span>
      ) : (
        <span key={i}>{chunk}</span>
      )
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Shield className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">CMS Scanner</h1>
          <p className="text-gray-400">Scan websites using CMSeek interactively</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              Target URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={isRunning ? handleStop : handleRun}
              disabled={!url.trim() && !isRunning}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-primary hover:bg-primary/80 text-dark-900'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!output}
              className="flex items-center px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleStore}
              disabled={!output || isStoring || isStored}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isStored 
                  ? 'bg-green-600 text-white' 
                  : 'bg-secondary hover:bg-secondary/80 text-white'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isStoring ? 'Storing...' : isStored ? 'Stored' : 'Store'}
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="text-green-400 font-medium mb-1">Command Info</h4>
            <p className="text-sm text-gray-300">
              Running: <code className="bg-dark-700 px-2 py-1 rounded text-primary font-mono">
                cmseek → {url}
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-dark-800/50 rounded-xl border border-dark-700">
        <div className="p-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">Output</h3>
          {sessionId && (
            <p className="text-sm text-gray-400">Session ID: {sessionId}</p>
          )}
        </div>
        <div className="p-4">
          <div className="bg-dark-950 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
              {output ? renderOutput(output) : (
                <span className="text-gray-500">
                  Output will appear here when you run a scan...
                  {isRunning && <span className="animate-pulse">{'\n'}Scanning...</span>}
                </span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSScanner;

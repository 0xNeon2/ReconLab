import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Play, Square, Download, AlertCircle, Save } from 'lucide-react';

const EndpointDiscovery: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const { currentUser } = useAuth();

  const handleRun = async () => {
    setIsRunning(true);
    setScanId(`endpoint_${Date.now()}`);
    setOutput('Starting endpoint discovery...\n');

    try {
      const response = await fetch('http://localhost:8000/api/run-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'dirsearch',
          target: url,
          command: `python3 dirsearch.py -u ${url} -w /usr/share/wordlists/dirb/test.txt`
        }),
      });

      const data = await response.json();
      if (data.scan_id) {
        setScanId(data.scan_id);
        pollResults(data.scan_id);
      }
    } catch (error) {
      setOutput(prev => prev + `Error: ${error}\n`);
      setIsRunning(false);
    }
  };

  const pollResults = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    try {
      const response = await fetch(`http://localhost:8000/api/results/${id}`);
      const data = await response.json();

      if (data.output) setOutput(data.output);
      if (data.progress !== undefined) setProgress(data.progress);

      if (data.status === 'completed') {
        setIsRunning(false);
      } else if (data.status === 'running') {
        setTimeout(() => pollResults(id), 2000);
      }
    } catch (error) {
      setOutput(prev => prev + `Error polling results: ${error}\n`);
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput(prev => prev + '\nScan stopped by user.\n');
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `endpoints_${url.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const handleStore = async () => {
    if (!scanId || !output) return;
    
    setIsStoring(true);
    try {
      const response = await fetch('http://localhost:8000/api/store-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scan_id: scanId,
          user_id: currentUser?.uid || '',
          title: `Endpoint Discovery - ${url}`
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

  const parseOutput = (raw: string) => {
    const lines = raw.split('\n').filter(line =>
      line.trim() !== '' && /^[1-5][0-9]{2}\s+/.test(line)
    );

    const rows: any[] = [];
    lines.forEach((line, index) => {
      const match = line.match(/^(\d{3})\s+(\S+)\s+(https?:\/\/[^\s]+)(?:\s+->\s+(https?:\/\/[^\s]+))?/);
      if (!match) return;

      const [, status, size, url, redirect] = match;
      let color = 'text-gray-300';
      let hint = '';

      if (status.startsWith('2')) {
        color = 'text-green-400';
        hint = '✅ Sensitive endpoint';
      } else if (status.startsWith('3')) {
        color = 'text-blue-400';
        hint = '🔀 Redirect — check for open redirect';
      } else if (status === '403') {
        color = 'text-yellow-400';
        hint = '🔒 Forbidden — try bypass';
      } else if (status === '401') {
        color = 'text-orange-400';
        hint = '🔐 Unauthorized';
      } else if (status === '404') {
        color = 'text-purple-300';
        hint = '❔ Not Found — look for anomalies';
      } else if (status === '406') {
        color = 'text-pink-400';
        hint = '🚫 Not Acceptable — content negotiation or WAF';
      } else if (status.startsWith('5')) {
        color = 'text-red-400';
        hint = '🔥 Server error';
      }

      rows.push({ index, status, size, url, redirect, color, hint });
    });

    const grouped: { [key: string]: any[] } = {};
    rows.forEach(row => {
      if (!grouped[row.status]) grouped[row.status] = [];
      grouped[row.status].push(row);
    });

    const renderTable = (rows: any[], title: string) => (
      <div className="mb-6" key={title}>
        <h4 className="text-white font-bold mb-2">{title}</h4>
        <table className="w-full text-sm text-left text-gray-300 table-auto border border-dark-700">
          <thead className="text-xs uppercase bg-dark-700 text-gray-400">
            <tr>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Redirect</th>
              <th className="px-4 py-2">Hint</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {rows.map(row => (
              <tr key={row.index} className="border-b border-dark-700">
                <td className={`px-4 py-2 font-mono ${row.color}`}>{row.status}</td>
                <td className="px-4 py-2 text-gray-400">{row.size}</td>
                <td className="px-4 py-2 text-blue-300 break-all">{row.url}</td>
                <td className="px-4 py-2 text-purple-300 break-all">{row.redirect || '-'}</td>
                <td className="px-4 py-2 text-gray-400 text-xs">{row.hint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <>
        {Object.entries(grouped).map(([status, rows]) => renderTable(rows, `Status ${status}`))}
      </>
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Search className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Endpoint Discovery</h1>
          <p className="text-gray-400">Discover hidden directories and endpoints using Dirsearch</p>
        </div>
      </div>

      <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Target URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={isRunning ? handleStop : handleRun}
              disabled={!url.trim() && !isRunning}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isRunning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-primary hover:bg-primary/80 text-dark-900'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRunning ? <><Square className="w-4 h-4 mr-2" /> Stop</> : <><Play className="w-4 h-4 mr-2" /> Run</>}
            </button>
            <button
              onClick={handleDownload}
              disabled={!output}
              className="flex items-center px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg"
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

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5" />
          <div>
            <h4 className="text-purple-400 font-medium mb-1">Command Info</h4>
            <p className="text-sm text-gray-300">
              Running:
              <code className="bg-dark-700 px-2 py-1 rounded text-primary font-mono ml-2">
                python3 dirsearch.py -u {url || 'URL'} -w /usr/share/wordlists/dirb/test.txt
              </code>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-dark-800/50 rounded-xl border border-dark-700">
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Output</h3>
            {progress !== null && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Progress:</span>
                <div className="w-32 bg-dark-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-sm text-primary">{progress}%</span>
              </div>
            )}
          </div>
          {scanId && <p className="text-sm text-gray-400">Scan ID: {scanId}</p>}
        </div>
        <div className="p-4 bg-dark-950 rounded-b-lg min-h-[400px] max-h-[600px] overflow-y-auto">
          {output ? parseOutput(output) : (
            <span className="text-gray-500 font-mono text-sm">
              Output will appear here when you run a scan...
              {isRunning && <span className="animate-pulse">{''}Scanning...</span>}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndpointDiscovery;

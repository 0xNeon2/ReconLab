import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Target, Play, Square, Download, AlertCircle, Save } from 'lucide-react';

const ParameterDiscovery: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const { currentUser } = useAuth();

  const handleRun = async () => {
    if (!domain.trim()) return;
    
    setIsRunning(true);
    setScanId(`parameter_${Date.now()}`);
    setOutput('Starting parameter discovery...\n');

    try {
      const response = await fetch('http://localhost:8000/api/run-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'arjun',
          target: domain,
          command: `arjun -u ${domain}`
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
    try {
      const response = await fetch(`http://localhost:8000/api/result/${id}`);
      const data = await response.json();

      if (data.output) {
        // Filter out 'Processing chunks' lines
        let filteredOutput = data.output
          .split('\n')
          .filter(line => !line.includes('Processing chunks'))
          .join('\n');

        // Remove ANSI escape codes
        filteredOutput = filteredOutput.replace(/\x1b\[[0-9;]*m/g, '');

        setOutput(filteredOutput);
      }

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
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parameters_${domain}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
          title: `Parameter Discovery - ${domain}`
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

  // Beautify output with color-coded lines
  const renderOutput = (rawOutput: string) => {
    if (!rawOutput) return null;

    return rawOutput.split('\n').map((line, i) => {
      let style = {};
      let cleanedLine = line;

      // Warnings in orange bold
      if (line.toLowerCase().includes('warning') || line.toLowerCase().includes('warn')) {
        style = { color: 'black', fontWeight: 'bold' };
      }
      // Success messages in green bold
      else if (line.toLowerCase().includes('parameters found')) {
        style = { color: 'green', fontWeight: 'bold' };
      }
      // Info messages starting with [*]
      else if (line.startsWith('[*]')) {
        style = { color: 'black' };
        cleanedLine = line.replace(/^\[\*\]\s*/, '');
      }
      // Heuristic scanner results in yellowgreen bold
      else if (line.toLowerCase().includes('heuristic scanner found')) {
        style = { color: 'green', fontWeight: 'bold' };
      }
      // Others: soft green text
      else {
        style = { color: 'black' };
      }

      // Remove other special markers like [+], [!]
      cleanedLine = cleanedLine.replace(/^\[[+!]\]\s*/, '');

      return (
        <div key={i} style={style}>
          {cleanedLine}
        </div>
      );
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Target className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Parameter Discovery</h1>
          <p className="text-gray-400">Discover URL parameters using Arjun</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-2">
              Target Domain
            </label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={isRunning ? handleStop : handleRun}
              disabled={!domain.trim() && !isRunning}
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
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
          <div>
            <h4 className="text-orange-400 font-medium mb-1">Command Info</h4>
            <p className="text-sm text-gray-300">
              Running: <code className="bg-dark-700 px-2 py-1 rounded text-primary font-mono">
                arjun -u {domain || 'domain'}
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-dark-800/50 rounded-xl border border-dark-700">
        <div className="p-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">Output</h3>
          {scanId && (
            <p className="text-sm text-gray-400">Scan ID: {scanId}</p>
          )}
        </div>
        <div className="p-4">
          <div
            className="bg-dark-950 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto font-mono text-sm"
            style={{ whiteSpace: 'pre-line' }}
          >
            {output ? renderOutput(output) : (
              <span className="text-gray-500">
                Output will appear here when you run a scan...
                {isRunning && (
                  <span className="animate-pulse">
                    {'\n'}Scanning...
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterDiscovery;

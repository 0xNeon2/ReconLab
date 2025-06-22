import React, { useState } from 'react';
import { Globe, Play, Square, Download, AlertCircle } from 'lucide-react';

const SubdomainEnumeration: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);

  const handleRun = async () => {
    if (!domain.trim()) return;
    
    setIsRunning(true);
    setScanId(`subdomain_${Date.now()}`);
    setOutput('Starting subdomain enumeration...\n');

    try {
      const response = await fetch('http://localhost:8000/api/run-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'subfinder',
          target: domain,
          command: `subfinder -d ${domain}`
        }),
      });

      const data = await response.json();
      
      if (data.scan_id) {
        setScanId(data.scan_id);
        // Poll for results
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
        setOutput(data.output);
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
    a.download = `subdomain_${domain}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Globe className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Subdomain Enumeration</h1>
          <p className="text-gray-400">Discover subdomains using Subfinder</p>
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
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Command Info</h4>
            <p className="text-sm text-gray-300">
              Running: <code className="bg-dark-700 px-2 py-1 rounded text-primary font-mono">
                subfinder -d {domain || 'domain'}
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
          <div className="bg-dark-950 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
              {output || (
                <span className="text-gray-500">
                  Output will appear here when you run a scan...
                  {isRunning && (
                    <span className="animate-pulse">
                      {'\n'}Scanning...
                    </span>
                  )}
                </span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubdomainEnumeration;
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Terminal, Play, Square, Download, AlertCircle, Save } from 'lucide-react';

const NmapScanning: React.FC = () => {
  const [target, setTarget] = useState('');
  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const { currentUser } = useAuth();

  const scanTypes = [
    {
      id: 'top-ports',
      name: 'Top Ports Scan',
      description: 'Quickly scan the top 1000 commonly used ports',
      command: 'nmap -T4 --top-ports 1000 -v',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'service-version',
      name: 'Service and Version Detection',
      description: 'Detect open ports and the services/versions running on them',
      command: 'nmap -sV',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'aggressive',
      name: 'Aggressive Scan',
      description: 'Performs OS detection, version detection, script scanning, and traceroute',
      command: 'nmap -A',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'stealth',
      name: 'Stealth SYN Scan (with Firewall Evasion)',
      description: 'Stealthy scan that avoids full TCP handshakes, skips ping check',
      command: 'nmap -sS -Pn -T4',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'vuln',
      name: 'Vulnerability Scan (Nmap Scripts)',
      description: 'Uses built-in Nmap scripts to find common vulnerabilities (CVE-based)',
      command: 'nmap --script vuln',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'http-enum',
      name: 'HTTP Enumeration',
      description: 'Enumerates web server structure and info if HTTP/HTTPS is open',
      command: 'nmap -p 80,443 --script http-enum',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'brute-force',
      name: 'Brute-Force Login Attempts',
      description: 'Attempts brute-forcing credentials (like SSH, FTP)',
      command: 'nmap -p 22 --script ssh-brute',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'full-port',
      name: 'Full Port Scan (All 65535 Ports)',
      description: 'Checks all TCP ports on the host',
      command: 'nmap -p- -T4',
      color: 'from-gray-500 to-slate-500'
    }
  ];

  const handleScanSelect = (scanType: any) => {
    setSelectedScan(scanType.id);
  };

  const handleRun = async () => {
    if (!target.trim() || !selectedScan) return;
    
    const scan = scanTypes.find(s => s.id === selectedScan);
    if (!scan) return;

    setIsRunning(true);
    setScanId(`nmap_${selectedScan}_${Date.now()}`);
    setOutput('Starting Nmap scan...\n');

    try {
      const response = await fetch('http://localhost:8000/api/run-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'nmap',
          target: target,
          scan_type: selectedScan,
          command: `${scan.command} ${target}`
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
    a.download = `nmap_${selectedScan}_${target.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.txt`;
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
          title: `Nmap ${selectedScanType?.name || 'Scan'} - ${target}`
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

  const selectedScanType = scanTypes.find(s => s.id === selectedScan);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-red-500/20 rounded-lg">
          <Terminal className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Nmap Scanning</h1>
          <p className="text-gray-400">Network reconnaissance and port scanning</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-2">
              Target IP/Host
            </label>
            <input
              type="text"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="192.168.1.1 or example.com"
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={isRunning ? handleStop : handleRun}
              disabled={(!target.trim() || !selectedScan) && !isRunning}
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

      {/* Scan Types */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select Scan Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scanTypes.map((scan) => (
            <div
              key={scan.id}
              onClick={() => handleScanSelect(scan)}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedScan === scan.id
                  ? 'border-primary bg-primary/10'
                  : 'border-dark-600 bg-dark-700/50 hover:border-dark-500'
              }`}
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${scan.color} rounded-lg flex items-center justify-center mb-3`}>
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-2">{scan.name}</h4>
              <p className="text-gray-400 text-xs">{scan.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      {selectedScanType && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-medium mb-1">Command Info</h4>
              <p className="text-sm text-gray-300">
                Running: <code className="bg-dark-700 px-2 py-1 rounded text-primary font-mono">
                  {selectedScanType.command} {target || 'target'}
                </code>
              </p>
            </div>
          </div>
        </div>
      )}

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
                  Select a scan type and enter a target to begin...
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

export default NmapScanning;

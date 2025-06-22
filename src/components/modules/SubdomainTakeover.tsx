import React, { useState, useRef } from 'react';
import { Zap, Play, Square, Download, AlertCircle, Upload } from 'lucide-react';

const SubdomainTakeover: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      setUploadedFile(file);
    } else {
      alert('Please upload a valid .txt file');
    }
  };

  const handleRun = async () => {
    if (!uploadedFile) {
      alert('Please upload a subdomain list file first');
      return;
    }
    
    setIsRunning(true);
    setScanId(`takeover_${Date.now()}`);
    setOutput('Starting subdomain takeover scan...\n');

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('tool', 'takeover');
      formData.append('command', 'python3 takeover.py -l subdomains.txt');

      const response = await fetch('http://localhost:8000/api/run-tool-with-file', {
        method: 'POST',
        body: formData,
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
    a.download = `subdomain_takeover_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Zap className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Subdomain Takeover</h1>
          <p className="text-gray-400">Detect vulnerable subdomains for takeover</p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subdomain List File (.txt)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </button>
              {uploadedFile && (
                <span className="text-sm text-primary">{uploadedFile.name}</span>
              )}
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={isRunning ? handleStop : handleRun}
              disabled={!uploadedFile && !isRunning}
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
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
          <div>
            <h4 className="text-orange-400 font-medium mb-1">Command Info</h4>
            <p className="text-sm text-gray-300 mb-2">
              Running: <code className="bg-dark-700 px-2 py-1 rounded text-primary font-mono">
                python3 takeover.py -l {uploadedFile?.name || 'subdomains.txt'}
              </code>
            </p>
            <p className="text-xs text-gray-400">
              Upload a text file containing one subdomain per line (e.g., admin.example.com)
            </p>
          </div>
        </div>
      </div>

      {/* Sample File Format */}
      <div className="bg-dark-800/30 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-2">Sample File Format:</h4>
        <pre className="text-gray-300 text-sm font-mono">
{`admin.example.com
api.example.com
blog.example.com
dev.example.com
test.example.com`}
        </pre>
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
                  Upload a subdomain list file to begin scanning...
                  {isRunning && (
                    <span className="animate-pulse">
                      {'\n'}Scanning for takeover vulnerabilities...
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

export default SubdomainTakeover;
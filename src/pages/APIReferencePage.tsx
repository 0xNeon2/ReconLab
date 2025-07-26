import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Code, Terminal, Copy, Check, Play, Database,
  Shield, Globe, Search, Target, Eye, Bot, FileText, Settings
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const APIReferencePage = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      id: 'run-tool',
      method: 'POST',
      path: '/api/run-tool',
      title: 'Execute Security Tool',
      description: 'Run any integrated security tool with specified parameters and get real-time results.',
      requestBody: {
        tool: 'string (required) - Tool name (subfinder, dirsearch, arjun, cmseek, wafw00f, nmap)',
        target: 'string (required) - Target domain or URL',
        command: 'string (required) - Full command to execute',
        scan_type: 'string (optional) - Specific scan type for tools like nmap'
      },
      response: {
        scan_id: 'string - Unique identifier for the scan',
        status: 'string - Current status (running, completed, failed)',
        message: 'string - Status message'
      },
      example: `{
  "tool": "subfinder",
  "target": "example.com",
  "command": "subfinder -d example.com --silent"
}`,
      responseExample: `{
  "scan_id": "uuid-string",
  "status": "running",
  "message": "Started subfinder scan"
}`,
      color: 'green'
    },
    {
      id: 'get-result',
      method: 'GET',
      path: '/api/result/{scan_id}',
      title: 'Get Scan Results',
      description: 'Retrieve the results of a specific scan by its unique identifier.',
      parameters: {
        scan_id: 'string (required) - The unique scan identifier returned from run-tool'
      },
      response: {
        scan_id: 'string - The scan identifier',
        status: 'string - Scan status (running, completed, failed)',
        output: 'string - Complete scan output',
        command: 'string - The command that was executed',
        progress: 'number - Progress percentage (if available)'
      },
      responseExample: `{
  "scan_id": "uuid-string",
  "status": "completed",
  "output": "www.example.com\\napi.example.com\\nadmin.example.com",
  "command": "subfinder -d example.com --silent"
}`,
      color: 'blue'
    },
    {
      id: 'store-result',
      method: 'POST',
      path: '/api/store-result',
      title: 'Store Scan Result',
      description: 'Store scan results to MongoDB database with user association for persistent storage.',
      requestBody: {
        scan_id: 'string (required) - The scan identifier to store',
        user_id: 'string (required) - Firebase user ID for ownership',
        title: 'string (optional) - Custom title for the stored result'
      },
      response: {
        message: 'string - Success message',
        stored_id: 'string - MongoDB document ID',
        title: 'string - The title used for storage'
      },
      example: `{
  "scan_id": "uuid-string",
  "user_id": "firebase-user-id",
  "title": "Subdomain Enumeration - example.com"
}`,
      responseExample: `{
  "message": "Scan result stored successfully",
  "stored_id": "mongodb-object-id",
  "title": "Subdomain Enumeration - example.com"
}`,
      color: 'purple'
    },
    {
      id: 'get-reports',
      method: 'GET',
      path: '/api/reports',
      title: 'Get User Reports',
      description: 'Retrieve all stored scan results and reports for a specific user.',
      parameters: {
        user_id: 'string (optional) - Firebase user ID to filter results'
      },
      response: {
        reports: 'array - List of stored scan results with metadata'
      },
      responseExample: `{
  "reports": [
    {
      "id": "mongodb-id",
      "scan_id": "uuid-string",
      "title": "Subdomain Enumeration - example.com",
      "content": "scan output...",
      "module": "subfinder",
      "target": "example.com",
      "date": "2025-01-01T00:00:00Z",
      "status": "completed",
      "command": "subfinder -d example.com"
    }
  ]
}`,
      color: 'indigo'
    },
    {
      id: 'delete-report',
      method: 'DELETE',
      path: '/api/reports/{report_id}',
      title: 'Delete Report',
      description: 'Delete a stored report from the database. Users can only delete their own reports.',
      parameters: {
        report_id: 'string (required) - MongoDB document ID of the report',
        user_id: 'string (optional) - Firebase user ID for verification'
      },
      response: {
        message: 'string - Success message'
      },
      responseExample: `{
  "message": "Report deleted successfully"
}`,
      color: 'red'
    },
    {
      id: 'ai-chat',
      method: 'POST',
      path: '/api/ai-chat',
      title: 'AI Security Assistant',
      description: 'Interact with the AI security assistant for analysis, guidance, and expert recommendations.',
      requestBody: {
        message: 'string (required) - Your question or request',
        api_key: 'string (optional) - API key (pre-configured for OpenRouter)',
        provider: 'string (optional) - AI provider (openrouter, deepseek, openai)',
        context: 'string (optional) - Scan results or additional context'
      },
      response: {
        response: 'string - AI assistant response',
        suggestions: 'array - Actionable suggestions extracted from response'
      },
      example: `{
  "message": "Analyze these Nmap results and suggest attack vectors",
  "provider": "openrouter",
  "context": "PORT STATE SERVICE\\n22/tcp open ssh\\n80/tcp open http"
}`,
      responseExample: `{
  "response": "Based on the Nmap results, I can see SSH and HTTP services...",
  "suggestions": [
    "Test for SSH brute force vulnerabilities",
    "Enumerate web server for hidden directories",
    "Check for default credentials"
  ]
}`,
      color: 'orange'
    }
  ];

  const tools = [
    { name: 'subfinder', icon: Globe, description: 'Subdomain enumeration' },
    { name: 'dirsearch', icon: Search, description: 'Directory discovery' },
    { name: 'arjun', icon: Target, description: 'Parameter discovery' },
    { name: 'cmseek', icon: Shield, description: 'CMS detection' },
    { name: 'wafw00f', icon: Eye, description: 'WAF detection' },
    { name: 'nmap', icon: Terminal, description: 'Network scanning' }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-400';
      case 'POST': return 'bg-green-500/20 text-green-400';
      case 'DELETE': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-6 animate-glow"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                API Reference
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Complete API documentation for integrating ReconLab's security tools into your applications
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Base URL */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Base URL</h2>
            <div className="bg-dark-950 rounded-lg p-4 flex items-center justify-between">
              <code className="text-green-400 font-mono text-lg">http://localhost:8000</code>
              <button
                onClick={() => copyToClipboard('http://localhost:8000', 'base-url')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {copiedCode === 'base-url' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Supported Tools */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Supported Security Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-dark-800/50 rounded-lg p-4 border border-dark-700 hover:border-primary/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* API Endpoints */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">API Endpoints</h2>
            
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                variants={fadeUp}
                custom={index}
                className="bg-dark-800/50 rounded-xl border border-dark-700 overflow-hidden"
              >
                <div className="p-6 border-b border-dark-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{endpoint.title}</h3>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded font-mono text-sm ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-dark-950 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-green-400 font-mono text-lg">{endpoint.method} {endpoint.path}</code>
                      <button
                        onClick={() => copyToClipboard(`${endpoint.method} ${endpoint.path}`, endpoint.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedCode === endpoint.id ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300">{endpoint.description}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Parameters */}
                  {endpoint.parameters && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Parameters</h4>
                      <div className="bg-dark-950 rounded-lg p-4">
                        {Object.entries(endpoint.parameters).map(([key, value]) => (
                          <div key={key} className="mb-2 last:mb-0">
                            <code className="text-blue-400 font-mono">{key}</code>
                            <span className="text-gray-400 ml-2">- {value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Request Body */}
                  {endpoint.requestBody && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Request Body</h4>
                      <div className="bg-dark-950 rounded-lg p-4">
                        {Object.entries(endpoint.requestBody).map(([key, value]) => (
                          <div key={key} className="mb-2 last:mb-0">
                            <code className="text-blue-400 font-mono">{key}</code>
                            <span className="text-gray-400 ml-2">- {value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Request */}
                  {endpoint.example && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Example Request</h4>
                      <div className="bg-dark-950 rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(endpoint.example, `${endpoint.id}-example`)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === `${endpoint.id}-example` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                          {endpoint.example}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  {endpoint.response && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Response</h4>
                      <div className="bg-dark-950 rounded-lg p-4">
                        {Object.entries(endpoint.response).map(([key, value]) => (
                          <div key={key} className="mb-2 last:mb-0">
                            <code className="text-orange-400 font-mono">{key}</code>
                            <span className="text-gray-400 ml-2">- {value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Response */}
                  {endpoint.responseExample && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Example Response</h4>
                      <div className="bg-dark-950 rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(endpoint.responseExample, `${endpoint.id}-response`)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === `${endpoint.id}-response` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <pre className="text-orange-400 font-mono text-sm overflow-x-auto">
                          {endpoint.responseExample}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Authentication */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>
            <p className="text-gray-300 mb-4">
              ReconLab uses Firebase Authentication for user management. Most endpoints require user authentication 
              through Firebase tokens for accessing user-specific data.
            </p>
            <div className="bg-dark-950 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">User ID Parameter</h4>
              <p className="text-gray-400 text-sm">
                Include the Firebase user ID in requests that require user association (storing results, fetching reports).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default APIReferencePage;
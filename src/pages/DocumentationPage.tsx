import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Book, Code, Terminal, Shield, Globe, Search, Target,
  Eye, ExternalLink, Bot, FileText, CheckSquare, BarChart3, Play,
  Download, Save, Settings, ChevronRight, ChevronDown, Copy
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Welcome to ReconLab</h3>
            <p className="text-gray-300 mb-4">
              ReconLab is a comprehensive cybersecurity reconnaissance framework designed for bug hunters and security professionals. 
              This documentation will guide you through all features and capabilities.
            </p>
          </div>

          <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
            <h4 className="text-lg font-semibold text-white mb-3">Quick Start Steps</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="bg-primary text-dark-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <div>
                  <strong>Create Account:</strong> Register with your email and password
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-dark-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <div>
                  <strong>Choose Tool:</strong> Select from 11 integrated security tools
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-dark-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <div>
                  <strong>Run Scan:</strong> Enter target and execute reconnaissance
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-dark-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                <div>
                  <strong>Store Results:</strong> Save findings to your personal database
                </div>
              </li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'tools',
      title: 'Security Tools',
      icon: Shield,
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Integrated Security Tools</h3>
            <p className="text-gray-300 mb-6">
              ReconLab integrates 11 powerful security tools for comprehensive reconnaissance and vulnerability assessment.
            </p>
          </div>

          {/* Subfinder */}
          <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-blue-400 mr-3" />
              <h4 className="text-xl font-semibold text-white">Subfinder</h4>
              <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Reconnaissance</span>
            </div>
            <p className="text-gray-300 mb-4">
              Passive subdomain discovery using multiple sources to expand attack surface.
            </p>
            <div className="bg-dark-950 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Example Usage:</span>
                <button 
                  onClick={() => copyToClipboard('subfinder -d example.com --silent')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <code className="text-green-400 font-mono text-sm">subfinder -d example.com --silent</code>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>1000+ data sources</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>Passive reconnaissance</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>No rate limiting</li>
            </ul>
          </div>

          {/* Dirsearch */}
          <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 text-purple-400 mr-3" />
              <h4 className="text-xl font-semibold text-white">Dirsearch</h4>
              <span className="ml-auto text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Discovery</span>
            </div>
            <p className="text-gray-300 mb-4">
              Web path scanner for discovering hidden directories and files with real-time progress tracking.
            </p>
            <div className="bg-dark-950 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Example Usage:</span>
                <button 
                  onClick={() => copyToClipboard('python3 dirsearch.py -u https://example.com -w wordlist.txt')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <code className="text-green-400 font-mono text-sm">python3 dirsearch.py -u https://example.com -w wordlist.txt</code>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>Multi-threaded scanning</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>Custom wordlists</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>Progress tracking</li>
            </ul>
          </div>

          {/* Nmap */}
          <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center mb-4">
              <Terminal className="w-6 h-6 text-red-400 mr-3" />
              <h4 className="text-xl font-semibold text-white">Nmap</h4>
              <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Network Scanning</span>
            </div>
            <p className="text-gray-300 mb-4">
              Network discovery and security auditing with 8 different scan modes.
            </p>
            <div className="bg-dark-950 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Scan Types Available:</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-green-400 font-mono">• Top Ports Scan (-T4 --top-ports 1000)</div>
                <div className="text-green-400 font-mono">• Service Version Detection (-sV)</div>
                <div className="text-green-400 font-mono">• Aggressive Scan (-A)</div>
                <div className="text-green-400 font-mono">• Stealth SYN Scan (-sS -Pn -T4)</div>
                <div className="text-green-400 font-mono">• Vulnerability Scan (--script vuln)</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      icon: Bot,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Security Assistant</h3>
            <p className="text-gray-300 mb-6">
              Advanced AI-powered security analysis using DeepSeek R1 model via OpenRouter for expert cybersecurity guidance.
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-6 border border-red-500/20">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Bot className="w-5 h-5 text-red-400 mr-2" />
              Key Capabilities
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>Attack vector analysis and exploitation paths</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>Step-by-step penetration testing methodologies</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>Custom payload engineering and bypass techniques</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>Vulnerability chaining for complex attack scenarios</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>Context-aware analysis of scan results</li>
            </ul>
          </div>

          <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
            <h4 className="text-lg font-semibold text-white mb-3">How to Use</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <div>Navigate to the AI Assistant section in the dashboard</div>
              </li>
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <div>Optionally paste scan results in the Context field for analysis</div>
              </li>
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <div>Ask questions about attack vectors, methodologies, or specific vulnerabilities</div>
              </li>
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                <div>Receive expert-level guidance with actionable suggestions</div>
              </li>
            </ol>
          </div>

          <div className="bg-dark-950 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Example Query:</span>
            </div>
            <div className="text-green-400 font-mono text-sm mb-4">
              "Analyze these Nmap results and suggest attack vectors for the open ports found on 192.168.1.100"
            </div>
            <div className="text-gray-400 text-sm">
              The AI will provide detailed analysis, potential vulnerabilities, and specific exploitation techniques.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'workflow',
      title: 'Workflow Guide',
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Security Testing Workflow</h3>
            <p className="text-gray-300 mb-6">
              Follow this systematic 4-phase approach for comprehensive security assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                Reconnaissance
              </h4>
              <p className="text-gray-300 mb-4">Passive information gathering using OSINT techniques</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>Subfinder for subdomain discovery</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>Google Dorking for exposed information</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>Social media and public records</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                Enumeration
              </h4>
              <p className="text-gray-300 mb-4">Active discovery and service mapping</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>Nmap for port and service scanning</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>Dirsearch for directory discovery</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>wafw00f for WAF detection</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-6 border border-orange-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                Analysis
              </h4>
              <p className="text-gray-300 mb-4">Vulnerability identification and assessment</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>CMSeek for CMS vulnerabilities</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>Arjun for parameter discovery</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>AI Assistant for expert analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                Documentation
              </h4>
              <p className="text-gray-300 mb-4">Findings and reporting</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>Notes for detailed documentation</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>Checklist for progress tracking</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>Reports for professional output</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: Code,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">API Endpoints</h3>
            <p className="text-gray-300 mb-6">
              ReconLab provides a RESTful API for programmatic access to all security tools and features.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">Run Security Tool</h4>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-mono">POST</span>
              </div>
              <div className="bg-dark-950 rounded-lg p-4 mb-4">
                <code className="text-green-400 font-mono text-sm">POST /api/run-tool</code>
              </div>
              <p className="text-gray-300 mb-4">Execute any integrated security tool with specified parameters.</p>
              <div className="bg-dark-950 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Request Body:</div>
                <pre className="text-green-400 font-mono text-sm">{`{
  "tool": "subfinder",
  "target": "example.com",
  "command": "subfinder -d example.com --silent"
}`}</pre>
              </div>
            </div>

            <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">Get Scan Results</h4>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-mono">GET</span>
              </div>
              <div className="bg-dark-950 rounded-lg p-4 mb-4">
                <code className="text-green-400 font-mono text-sm">GET /api/result/{`{scan_id}`}</code>
              </div>
              <p className="text-gray-300 mb-4">Retrieve the results of a specific scan by its ID.</p>
              <div className="bg-dark-950 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Response:</div>
                <pre className="text-green-400 font-mono text-sm">{`{
  "scan_id": "uuid",
  "status": "completed",
  "output": "scan results...",
  "command": "subfinder -d example.com"
}`}</pre>
              </div>
            </div>

            <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">Store Scan Result</h4>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-mono">POST</span>
              </div>
              <div className="bg-dark-950 rounded-lg p-4 mb-4">
                <code className="text-green-400 font-mono text-sm">POST /api/store-result</code>
              </div>
              <p className="text-gray-300 mb-4">Store scan results to MongoDB with user association.</p>
              <div className="bg-dark-950 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Request Body:</div>
                <pre className="text-green-400 font-mono text-sm">{`{
  "scan_id": "uuid",
  "user_id": "firebase_user_id",
  "title": "Custom scan title"
}`}</pre>
              </div>
            </div>

            <div className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">AI Chat</h4>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-mono">POST</span>
              </div>
              <div className="bg-dark-950 rounded-lg p-4 mb-4">
                <code className="text-green-400 font-mono text-sm">POST /api/ai-chat</code>
              </div>
              <p className="text-gray-300 mb-4">Interact with the AI security assistant for analysis and guidance.</p>
              <div className="bg-dark-950 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Request Body:</div>
                <pre className="text-green-400 font-mono text-sm">{`{
  "message": "Analyze these scan results",
  "api_key": "your_api_key",
  "provider": "openrouter",
  "context": "scan results or report context"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-dark-900/50 backdrop-blur-lg border-r border-dark-700 min-h-screen p-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Book className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-white">Documentation</h1>
            </div>
            <p className="text-gray-400 text-sm">Complete guide to ReconLab features</p>
          </div>

          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const isExpanded = expandedSections.includes(section.id);
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      toggleSection(section.id);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'text-gray-300 hover:text-white hover:bg-dark-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeSection}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl"
          >
            {sections.find(s => s.id === activeSection)?.content}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
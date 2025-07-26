import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Globe, Search, Target, Eye, Terminal, ExternalLink, Bot,
  FileText, CheckSquare, BarChart3, ArrowLeft, Zap, Database,
  Network, Crosshair, Activity, Code, Cpu, Users, Award
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const FeaturesPage = () => {
  const coreTools = [
    {
      name: 'Subfinder',
      icon: Globe,
      description: 'Passive subdomain discovery using multiple sources',
      features: [
        'Over 1000+ data sources',
        'Passive reconnaissance',
        'Fast and reliable',
        'No rate limiting',
        'JSON output support'
      ],
      color: 'from-blue-500 to-cyan-500',
      category: 'Reconnaissance'
    },
    {
      name: 'Dirsearch',
      icon: Search,
      description: 'Web path scanner for discovering hidden directories',
      features: [
        'Multi-threaded scanning',
        'Custom wordlists',
        'HTTP status filtering',
        'Recursive scanning',
        'Progress tracking'
      ],
      color: 'from-purple-500 to-pink-500',
      category: 'Discovery'
    },
    {
      name: 'Arjun',
      icon: Target,
      description: 'HTTP parameter discovery tool',
      features: [
        'Advanced fuzzing techniques',
        'GET/POST parameter discovery',
        'Custom parameter lists',
        'Heuristic detection',
        'JSON output format'
      ],
      color: 'from-orange-500 to-red-500',
      category: 'Parameter Analysis'
    },
    {
      name: 'CMSeek',
      icon: Shield,
      description: 'CMS detection and vulnerability scanner',
      features: [
        '180+ CMS detection',
        'Version identification',
        'Vulnerability scanning',
        'Plugin detection',
        'Detailed reporting'
      ],
      color: 'from-green-500 to-emerald-500',
      category: 'CMS Analysis'
    },
    {
      name: 'wafw00f',
      icon: Eye,
      description: 'Web Application Firewall detection tool',
      features: [
        '70+ WAF signatures',
        'Evasion techniques',
        'Custom payloads',
        'Detailed fingerprinting',
        'Bypass recommendations'
      ],
      color: 'from-yellow-500 to-orange-500',
      category: 'Defense Detection'
    },
    {
      name: 'Nmap',
      icon: Terminal,
      description: 'Network discovery and security auditing',
      features: [
        '8 different scan modes',
        'Service version detection',
        'OS fingerprinting',
        'Script engine (NSE)',
        'Custom timing options'
      ],
      color: 'from-red-500 to-pink-500',
      category: 'Network Scanning'
    }
  ];

  const additionalFeatures = [
    {
      name: 'AI Security Assistant',
      icon: Bot,
      description: 'Advanced AI-powered security analysis and guidance',
      features: [
        'DeepSeek R1 integration',
        'Context-aware analysis',
        'Attack vector suggestions',
        'Methodology guidance',
        'Real-time chat support'
      ],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Google Dorking',
      icon: ExternalLink,
      description: 'Advanced search techniques for OSINT gathering',
      features: [
        'Pre-built dork templates',
        'Custom dork creation',
        'Multiple search engines',
        'Result categorization',
        'Export functionality'
      ],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      name: 'Note Management',
      icon: FileText,
      description: 'Organized documentation system',
      features: [
        'Rich text editing',
        'Session persistence',
        'Export capabilities',
        'Search functionality',
        'Categorization'
      ],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Vulnerability Checklist',
      icon: CheckSquare,
      description: 'Comprehensive testing workflow tracker',
      features: [
        '25+ testing phases',
        'Progress tracking',
        'Custom items',
        'Completion analytics',
        'Export reports'
      ],
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Professional Reports',
      icon: BarChart3,
      description: 'Generate comprehensive security assessment reports',
      features: [
        'MongoDB storage',
        'User isolation',
        'Export formats',
        'Template system',
        'Analytics dashboard'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { name: 'Security Tools', value: '11', icon: Shield, color: 'text-blue-400' },
    { name: 'Data Sources', value: '1000+', icon: Database, color: 'text-green-400' },
    { name: 'Scan Types', value: '15+', icon: Network, color: 'text-orange-400' },
    { name: 'AI Models', value: '3', icon: Cpu, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 lg:p-8"
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
              <Zap className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                ReconLab Features
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive cybersecurity reconnaissance tools and features designed for 
              <span className="text-primary font-semibold"> professional security testing</span>
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="px-6 lg:px-8 mb-16"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-700 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-dark-700 rounded-lg mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Security Tools */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="px-6 lg:px-8 mb-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Core <span className="text-primary">Security Tools</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Industry-standard tools integrated into a unified platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-lg rounded-2xl p-8 border border-dark-700 hover:border-primary/50 transition-all duration-500"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                      <span className="text-xs bg-dark-600 text-gray-400 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Additional Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="px-6 lg:px-8 mb-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Advanced <span className="text-secondary">Workflow Features</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Enhanced capabilities to maximize your security testing efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-lg rounded-2xl p-8 border border-dark-700 hover:border-secondary/50 transition-all duration-500"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 relative`}>
                      <Icon className="w-8 h-8 text-white" />
                      {(feature.name === 'AI Security Assistant' || feature.name === 'Professional Reports') && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">
                      {feature.name}
                      {(feature.name === 'AI Security Assistant' || feature.name === 'Professional Reports') && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-dark-900 bg-primary rounded-full">
                          NEW
                        </span>
                      )}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Capabilities:</h4>
                      {feature.features.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                          {capability}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="px-6 lg:px-8 pb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-8 animate-glow"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Start Your <span className="text-primary">Security Journey</span>?
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of security professionals using ReconLab for comprehensive reconnaissance and vulnerability assessment.
                </p>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-dark-900 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <Shield className="mr-3 w-6 h-6" />
                    Get Started Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FeaturesPage;
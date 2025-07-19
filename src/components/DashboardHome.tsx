import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Globe, 
  Search, 
  Target, 
  Eye, 
  Terminal, 
  Activity,
  TrendingUp,
  Clock,
  CheckSquare,
  Bot,
  FileText,
  ExternalLink,
  ArrowRight,
  Crosshair,
  Radar,
  Bug,
  Award,
  Users,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.5 }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const DashboardHome: React.FC = () => {
  const coreTools = [
    {
      name: 'Subfinder',
      href: '/dashboard/subdomain-enumeration',
      icon: Globe,
      description: 'Passive subdomain discovery using multiple sources',
      purpose: 'Expands attack surface by finding hidden subdomains',
      color: 'from-blue-500 to-cyan-500',
      category: 'Reconnaissance'
    },
    {
      name: 'Dirsearch',
      href: '/dashboard/endpoint-discovery',
      icon: Search,
      description: 'Web path scanner for discovering hidden directories',
      purpose: 'Finds sensitive files, admin panels, and backup directories',
      color: 'from-purple-500 to-pink-500',
      category: 'Discovery'
    },
    {
      name: 'Arjun',
      href: '/dashboard/parameter-discovery',
      icon: Target,
      description: 'HTTP parameter discovery tool',
      purpose: 'Identifies hidden parameters for injection testing',
      color: 'from-orange-500 to-red-500',
      category: 'Parameter Analysis'
    },
    {
      name: 'CMSeek',
      href: '/dashboard/cms-scanner',
      icon: Shield,
      description: 'CMS detection and vulnerability scanner',
      purpose: 'Identifies CMS versions and known vulnerabilities',
      color: 'from-green-500 to-emerald-500',
      category: 'CMS Analysis'
    },
    {
      name: 'wafw00f',
      href: '/dashboard/firewall-detection',
      icon: Eye,
      description: 'Web Application Firewall detection tool',
      purpose: 'Identifies WAF presence for evasion planning',
      color: 'from-yellow-500 to-orange-500',
      category: 'Defense Detection'
    },
    {
      name: 'Nmap',
      href: '/dashboard/nmap-scanning',
      icon: Terminal,
      description: 'Network discovery and security auditing',
      purpose: 'Port scanning, service detection, and OS fingerprinting',
      color: 'from-red-500 to-pink-500',
      category: 'Network Scanning'
    }
  ];

  const additionalFeatures = [
    {
      name: 'Google Dorking',
      href: '/dashboard/dorking',
      icon: ExternalLink,
      description: 'Advanced search techniques for OSINT gathering',
      purpose: 'Discovers exposed files, directories, and sensitive information',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'AI Assistant',
      href: '/dashboard/ai-chat',
      icon: Bot,
      description: 'AI-powered security analysis and guidance',
      purpose: 'Provides attack vectors, methodologies, and expert insights',
      color: 'from-red-500 to-pink-500',
      badge: true
    },
    {
      name: 'Note Keeping',
      href: '/dashboard/notes',
      icon: FileText,
      description: 'Organized documentation system',
      purpose: 'Track findings, methodologies, and progress systematically',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Vulnerability Checklist',
      href: '/dashboard/vulnerability-checklist',
      icon: CheckSquare,
      description: 'Comprehensive testing workflow tracker',
      purpose: 'Ensures complete coverage of security testing phases',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: TrendingUp,
      description: 'Professional security assessment reports',
      purpose: 'Generate comprehensive documentation for findings',
      color: 'from-purple-500 to-pink-500',
      badge: true
    }
  ];

  const methodology = [
    {
      phase: '1. Reconnaissance',
      description: 'Passive information gathering',
      tools: ['Subfinder', 'Google Dorking'],
      icon: Radar,
      color: 'text-blue-400'
    },
    {
      phase: '2. Enumeration',
      description: 'Active discovery and mapping',
      tools: ['Nmap', 'Dirsearch', 'wafw00f'],
      icon: Search,
      color: 'text-green-400'
    },
    {
      phase: '3. Analysis',
      description: 'Vulnerability identification',
      tools: ['CMSeek', 'Arjun', 'AI Assistant'],
      icon: Crosshair,
      color: 'text-orange-400'
    },
    {
      phase: '4. Documentation',
      description: 'Findings and reporting',
      tools: ['Notes', 'Checklist', 'Reports'],
      icon: FileText,
      color: 'text-purple-400'
    }
  ];

  const stats = [
    { name: 'Security Tools', value: '6', icon: Shield, color: 'text-blue-400' },
    { name: 'Testing Phases', value: '4', icon: Activity, color: 'text-green-400' },
    { name: 'Methodologies', value: '25+', icon: Bug, color: 'text-orange-400' },
    { name: 'Coverage Areas', value: '100%', icon: Award, color: 'text-purple-400' }
  ];

  return (
    <motion.div
      className="p-6 lg:p-8 max-w-7xl mx-auto space-y-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Hero Section */}
      <motion.div className="text-center space-y-6" variants={fadeInUp} custom={1}>
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-6"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="w-10 h-10 text-primary" />
        </motion.div>
        <motion.h1
          className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          ReconLab Dashboard
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Your comprehensive cybersecurity reconnaissance platform. Streamline bug hunting workflows 
          with integrated tools, AI-powered analysis, and systematic methodologies.
        </motion.p>
      </motion.div>

      {/* Methodology Overview */}
      <motion.div
        className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-2xl p-8 border border-dark-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="text-center mb-8">
          <motion.h2 className="text-3xl font-bold text-white mb-4" variants={fadeInUp} custom={1}>
            Bug Hunting Methodology
          </motion.h2>
          <motion.p className="text-gray-400 max-w-3xl mx-auto" variants={fadeInUp} custom={2}>
            Our systematic approach follows industry-standard penetration testing methodologies, 
            ensuring comprehensive coverage and maximum vulnerability discovery.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodology.map((phase, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={fadeInUp}
              custom={index + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-dark-700/50 rounded-xl p-6 border border-dark-600 hover:border-primary/50 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-dark-600 mb-4`}>
                  <phase.icon className={`w-6 h-6 ${phase.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{phase.phase}</h3>
                <p className="text-gray-400 text-sm mb-4">{phase.description}</p>
                <div className="space-y-1">
                  {phase.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="inline-block text-xs bg-dark-600 text-gray-300 px-2 py-1 rounded mr-1 mb-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {index < methodology.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-600" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Significance of Reconnaissance */}
      <motion.div
        className="grid lg:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <motion.div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20" variants={fadeInUp} custom={1}>
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold text-white">Why Reconnaissance Matters</h3>
          </div>
          <div className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              <strong className="text-primary">80% of successful attacks</strong> begin with thorough reconnaissance. 
              Information gathering is the foundation of effective penetration testing and bug hunting.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Expands attack surface through subdomain discovery</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Identifies technology stack and potential vulnerabilities</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Reveals hidden endpoints and sensitive information</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Enables targeted and efficient testing approaches</span>
              </li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="bg-gradient-to-br from-secondary/10 to-purple-500/10 rounded-xl p-8 border border-secondary/20" variants={fadeInUp} custom={2}>
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8 text-secondary" />
            <h3 className="text-2xl font-bold text-white">One-Stop Solution Benefits</h3>
          </div>
          <div className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              ReconLab integrates <strong className="text-secondary">6 essential tools</strong> with 
              AI-powered analysis, creating a seamless workflow for security professionals.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Unified interface eliminates tool switching overhead</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Automated workflow tracking and progress monitoring</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>AI-assisted analysis and methodology guidance</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Comprehensive reporting and documentation</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 text-center"
            variants={fadeInUp} custom={index + 1}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-dark-700 rounded-lg mb-4">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.name}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Core Security Tools */}
      <div>
        <div className="text-center mb-8">
          <motion.h2 className="text-3xl font-bold text-white mb-4" variants={fadeInUp} custom={1}>
            Core Security Tools
          </motion.h2>
          <motion.p className="text-gray-400 max-w-2xl mx-auto" variants={fadeInUp} custom={2}>
            Industry-standard tools integrated into a unified platform for comprehensive security testing
          </motion.p>
        </div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {coreTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div key={index} variants={fadeInUp} custom={index + 1}>
                <Link
                  to={tool.href}
                  className="group bg-dark-800/50 rounded-xl p-6 border border-dark-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-xs bg-dark-600 text-gray-400 px-2 py-1 rounded">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="bg-dark-700/50 rounded-lg p-3 border-l-2 border-primary/30">
                        <p className="text-xs text-gray-300">
                          <strong className="text-primary">Purpose:</strong> {tool.purpose}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Additional Features */}
      <div>
        <div className="text-center mb-8">
          <motion.h2 className="text-3xl font-bold text-white mb-4" variants={fadeInUp} custom={1}>
            Enhanced Workflow Features
          </motion.h2>
          <motion.p className="text-gray-400 max-w-2xl mx-auto" variants={fadeInUp} custom={2}>
            Advanced capabilities to streamline your security testing workflow and maximize efficiency
          </motion.p>
        </div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={fadeInUp} custom={index + 1}>
                <Link
                  to={feature.href}
                  className="group bg-dark-800/50 rounded-xl p-6 border border-dark-700 hover:border-secondary/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 relative`}>
                      <Icon className="w-6 h-6 text-white" />
                      {feature.badge && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white group-hover:text-secondary transition-colors mb-2">
                        {feature.name}
                        {feature.badge && (
                          <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-dark-900 bg-primary rounded-full">
                            NEW
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="bg-dark-700/50 rounded-lg p-3 border-l-2 border-secondary/30">
                        <p className="text-xs text-gray-300">
                          <strong className="text-secondary">Purpose:</strong> {feature.purpose}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Quick Start Guide */}
      <motion.div
        className="bg-gradient-to-r from-dark-800/50 to-dark-900/50 rounded-2xl p-8 border border-dark-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="text-center mb-8">
          <motion.h2 className="text-3xl font-bold text-white mb-4" variants={fadeInUp} custom={1}>
            Quick Start Guide
          </motion.h2>
          <motion.p className="text-gray-400" variants={fadeInUp} custom={2}>
            Follow this systematic approach for effective security testing
          </motion.p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: 1,
              color: 'blue-400',
              bg: 'bg-blue-500/20',
              title: 'Start with Subfinder',
              desc: 'Discover subdomains to expand attack surface'
            },
            {
              num: 2,
              color: 'green-400',
              bg: 'bg-green-500/20',
              title: 'Scan with Nmap',
              desc: 'Identify open ports and running services'
            },
            {
              num: 3,
              color: 'orange-400',
              bg: 'bg-orange-500/20',
              title: 'Directory Discovery',
              desc: 'Use Dirsearch to find hidden endpoints'
            },
            {
              num: 4,
              color: 'purple-400',
              bg: 'bg-purple-500/20',
              title: 'Analyze & Report',
              desc: 'Use AI assistance and generate reports'
            }
          ].map((step, idx) => (
            <motion.div key={idx} variants={fadeInUp} custom={idx + 1}>
              <div className={`text-center`}>
                <div className={`w-12 h-12 ${step.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-${step.color} font-bold`}>{step.num}</span>
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;

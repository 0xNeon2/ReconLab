import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Target, Eye, Search, Globe, FileText, BarChart3, Terminal, ChevronRight,
  Users, Rocket, Star, ArrowRight, Code, Database, Cpu, Network, Radar, Crosshair, Activity, Sparkles,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const LandingPage = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Subdomain Enumeration",
      description: "Discover hidden subdomains using advanced enumeration techniques with Subfinder",
      color: "from-blue-500 to-cyan-500",
      stats: "1000+ sources"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Endpoint Discovery",
      description: "Find hidden directories and endpoints with fuzzing capabilities using Dirsearch",
      color: "from-purple-500 to-pink-500",
      stats: "Real-time scanning"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Parameter Discovery",
      description: "Identify URL parameters for further security testing with Arjun",
      color: "from-orange-500 to-red-500",
      stats: "Advanced fuzzing"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "CMS Scanner",
      description: "Detect and analyze content management systems with CMSeek",
      color: "from-green-500 to-emerald-500",
      stats: "180+ CMS types"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Firewall Detection",
      description: "Identify web application firewalls and security measures with wafw00f",
      color: "from-yellow-500 to-orange-500",
      stats: "70+ WAF types"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Nmap Scanning",
      description: "Comprehensive network scanning with predefined scan types",
      color: "from-red-500 to-pink-500",
      stats: "8 scan modes"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI Assistant",
      description: "Advanced AI-powered security analysis and guidance with DeepSeek R1",
      color: "from-indigo-500 to-purple-500",
      stats: "Real-time analysis"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Comprehensive Reports",
      description: "Generate detailed reports for all reconnaissance activities",
      color: "from-teal-500 to-cyan-500",
      stats: "Export ready"
    }
  ];

  const stats = [
    { number: "6", label: "Security Tools", icon: Shield },
    { number: "1000+", label: "Data Sources", icon: Database },
    { number: "99%", label: "Accuracy Rate", icon: Target },
    { number: "24/7", label: "AI Support", icon: Cpu }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior Penetration Tester",
      company: "CyberSec Corp",
      content: "ReconLab has revolutionized our reconnaissance workflow. The AI assistant provides insights that would take hours to discover manually.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Bug Bounty Hunter",
      company: "Independent",
      content: "The integrated tools and real-time analysis have significantly improved my bug hunting efficiency. Found 3x more vulnerabilities!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Security Consultant",
      company: "SecureNet Solutions",
      content: "The comprehensive reporting feature saves us hours of documentation work. Professional reports ready in minutes.",
      rating: 5
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Reconnaissance",
      description: "Passive information gathering using OSINT techniques",
      tools: ["Subfinder", "Google Dorking"],
      icon: Radar,
      color: "text-blue-400"
    },
    {
      step: "02",
      title: "Enumeration",
      description: "Active discovery and service mapping",
      tools: ["Nmap", "Dirsearch", "wafw00f"],
      icon: Search,
      color: "text-green-400"
    },
    {
      step: "03",
      title: "Analysis",
      description: "Vulnerability identification and assessment",
      tools: ["CMSeek", "Arjun", "AI Assistant"],
      icon: Crosshair,
      color: "text-orange-400"
    },
    {
      step: "04",
      title: "Documentation",
      description: "Professional reporting and findings management",
      tools: ["Notes", "Checklist", "Reports"],
      icon: FileText,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/30 animate-glow">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ReconLab
              </span>
            </motion.div>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="relative mb-8 mt-5"
            variants={scaleIn}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 animate-glow relative">
              <Shield className="w-12 h-12 text-primary animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={fadeUp}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              ReconLab
            </span>
            <motion.div
              className="inline-block ml-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeUp}
          >
            The ultimate <span className="text-primary font-semibold">AI-powered</span> cybersecurity reconnaissance framework for
            <span className="text-secondary font-semibold"> bug hunters</span> and <span className="text-green-400 font-semibold">security professionals</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={fadeUp}
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 255, 136, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg transition-all duration-300">
                <Rocket className="mr-2 w-5 h-5" />
                Start Reconnaissance
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-700 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Methodology Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Professional <span className="text-primary">Bug Hunting</span> Methodology
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow our systematic 4-phase approach used by elite security professionals worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-lg rounded-2xl p-8 border border-dark-700 hover:border-primary/50 transition-all duration-500 h-full">
                  <div className="flex items-center mb-6">
                    <div className="text-6xl font-bold text-primary/20 mr-4">{phase.step}</div>
                    <div className={`p-3 rounded-xl bg-dark-600 group-hover:scale-110 transition-transform`}>
                      <phase.icon className={`w-8 h-8 ${phase.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{phase.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-300">Tools:</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.tools.map((tool, toolIndex) => (
                        <span key={toolIndex} className="text-xs bg-dark-600 text-gray-300 px-3 py-1 rounded-full border border-dark-500">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive <span className="text-secondary">Security Arsenal</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for thorough reconnaissance and vulnerability assessment
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                className="group relative overflow-hidden"
              >
                <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-lg rounded-2xl p-6 border border-dark-700 hover:border-primary/50 transition-all duration-500 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-dark-900/50 to-dark-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by <span className="text-green-400">Security Professionals</span>
            </h2>
            <p className="text-xl text-gray-400">See what experts are saying about ReconLab</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-dark-800/50 backdrop-blur-lg rounded-2xl p-8 border border-dark-700 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <span className="text-dark-900 font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Demo Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 md:p-12 border border-dark-700 relative overflow-hidden"
            variants={slideIn}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div variants={slideIn}>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Terminal-Style <span className="text-primary">Interface</span>
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Experience a powerful command-line inspired interface that security professionals love.
                  Real-time execution with professional output formatting.
                </p>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <motion.li className="flex items-center" whileHover={{ x: 5 }}>
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                    Real-time command execution with live output
                  </motion.li>
                  <motion.li className="flex items-center" whileHover={{ x: 5 }}>
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    Persistent output per tool with session management
                  </motion.li>
                  <motion.li className="flex items-center" whileHover={{ x: 5 }}>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    Automated report generation and export functionality
                  </motion.li>
                  <motion.li className="flex items-center" whileHover={{ x: 5 }}>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    AI-powered analysis and vulnerability insights
                  </motion.li>
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <Terminal className="mr-2 w-5 h-5" />
                    Try Interactive Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div className="relative" variants={scaleIn} whileHover={{ scale: 1.02 }}>
                <div className="bg-dark-950 rounded-2xl p-6 border border-dark-700 font-mono shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <span className="ml-4 text-gray-400 text-sm">ReconLab Terminal</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <motion.div className="text-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                      $ subfinder -d example.com
                    </motion.div>
                    <motion.div className="text-green-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                      [*] Starting subdomain enumeration...
                    </motion.div>
                    <motion.div className="text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                      www.example.com
                    </motion.div>
                    <motion.div className="text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                      api.example.com
                    </motion.div>
                    <motion.div className="text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
                      admin.example.com
                    </motion.div>
                    <motion.div className="text-secondary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
                      [+] Found 127 subdomains
                    </motion.div>
                    <motion.div className="text-primary animate-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
                      $ nmap -sV api.example.com
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-secondary/5"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-8 animate-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-primary">Dominate</span> Your Security Journey?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-dark-900 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                <Shield className="mr-3 w-6 h-6" />
                Get Started Now
                <ChevronRight className="ml-3 w-6 h-6" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/docs" className="inline-flex items-center px-10 py-5 border-2 border-primary text-primary font-bold text-lg rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300">
                <Activity className="mr-3 w-6 h-6" />
                View Documentation
              </a>
            </motion.div>
          </div>
          <motion.p
            className="text-sm text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            No credit card required • Free forever plan • Enterprise support available
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-14 px-4 sm:px-6 lg:px-8 bg-dark-900 border-t border-dark-700 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="flex-1 mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-7 h-7 text-primary" />
              <span className="text-2xl font-bold text-white">ReconLab</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The ultimate cybersecurity reconnaissance framework for bug hunters and security professionals.<br />
              Streamline your workflow with AI-powered analysis.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
            <div>
              <h4 className="font-semibold text-white mb-2">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/login" className="hover:text-primary transition-colors">Get Started</Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
                </li>
                <li>
                  <a href="/docs" className="hover:text-primary transition-colors">Documentation</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/api" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="/community" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="/support" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} ReconLab. Built for security professionals worldwide.
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms</a>
            <a href="/security" className="hover:text-primary transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

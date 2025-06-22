import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Zap, Target, Eye, Search, Lock, Globe,
  FileText, CheckSquare, BarChart3, Terminal, ChevronRight
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Subdomain Enumeration",
      description: "Discover hidden subdomains using advanced enumeration techniques"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Endpoint Discovery",
      description: "Find hidden directories and endpoints with fuzzing capabilities"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Parameter Discovery",
      description: "Identify URL parameters for further security testing"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "CMS Scanner",
      description: "Detect and analyze content management systems"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Firewall Detection",
      description: "Identify web application firewalls and security measures"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Nmap Scanning",
      description: "Comprehensive network scanning with predefined scan types"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Vulnerability Detection",
      description: "Automated detection of common security vulnerabilities"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Comprehensive Reports",
      description: "Generate detailed reports for all reconnaissance activities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ReconLab
              </span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div className="animate-float mb-8 mt-5" variants={fadeUp}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 animate-glow">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" variants={fadeUp}>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              ReconLab
            </span>
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" variants={fadeUp}>
            The ultimate cybersecurity reconnaissance framework for bug hunters and security professionals
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeUp}>
            <Link to="/login" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
              Start Reconnaissance
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900/50"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 className="text-4xl font-bold text-white mb-4" variants={fadeUp}>Comprehensive Security Arsenal</motion.h2>
          <motion.p className="text-xl text-gray-400 max-w-2xl mx-auto" variants={fadeUp}>
            Everything you need for thorough reconnaissance and vulnerability assessment
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group p-6 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
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
          <motion.div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-8 md:p-12 border border-dark-700" variants={fadeUp}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Terminal-Style Interface</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Experience a powerful command-line inspired interface that security professionals love.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Real-time command execution
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Persistent output per tool
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Automated report generation
                  </li>
                </ul>
              </div>
              <motion.div
                className="bg-dark-950 rounded-lg p-6 border border-dark-700 family-mono"
                variants={fadeUp}
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-sm">Terminal</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-primary">$ subfinder -d example.com</div>
                  <div className="text-gray-400">www.example.com</div>
                  <div className="text-gray-400">api.example.com</div>
                  <div className="text-gray-400">admin.example.com</div>
                  <div className="text-primary animate-pulse">Scanning...</div>
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Security Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of security professionals using ReconLab for comprehensive reconnaissance
          </p>
          <Link to="/login" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-dark-900 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
            Get Started Now
            <ChevronRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-900 border-t border-dark-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-white">ReconLab</span>
            </div>
            <p className="text-gray-400">© 2025 ReconLab. Built for security professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


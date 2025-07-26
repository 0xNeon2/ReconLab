import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Database, Lock, Users, AlertTriangle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account Information: Email address, password (encrypted), and display name when you register',
        'Scan Data: Security scan results, targets, and commands you execute through our platform',
        'Usage Data: Tool usage patterns, session duration, and feature interactions',
        'Technical Data: IP address, browser type, device information, and access logs',
        'User Content: Notes, custom checklists, and stored reports you create'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Provide and maintain ReconLab services and security tools',
        'Store and manage your scan results and reports in your personal database',
        'Authenticate your account and ensure secure access to your data',
        'Improve our services, fix bugs, and develop new features',
        'Communicate with you about service updates and security matters',
        'Analyze usage patterns to enhance user experience and platform performance'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security & Storage',
      content: [
        'All data is encrypted in transit using HTTPS/TLS protocols',
        'Passwords are hashed using industry-standard encryption methods',
        'Scan results are stored in MongoDB with user-specific isolation',
        'Firebase Authentication provides secure user management',
        'Regular security audits and vulnerability assessments',
        'Access controls and monitoring to prevent unauthorized access'
      ]
    },
    {
      icon: Users,
      title: 'Data Sharing & Disclosure',
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'Your scan results and security data remain private and isolated to your account',
        'We may share anonymized, aggregated data for research and improvement purposes',
        'Legal compliance: We may disclose information if required by law or legal process',
        'Service providers: Limited access for essential service operations (hosting, analytics)',
        'Business transfers: Data may be transferred in case of merger or acquisition'
      ]
    },
    {
      icon: Shield,
      title: 'Your Rights & Controls',
      content: [
        'Access: Request a copy of all personal data we have about you',
        'Correction: Update or correct inaccurate personal information',
        'Deletion: Request deletion of your account and associated data',
        'Portability: Export your scan results and reports in standard formats',
        'Restriction: Limit how we process your personal information',
        'Objection: Object to certain types of data processing'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Important Considerations',
      content: [
        'ReconLab is designed for authorized security testing only',
        'Users are responsible for ensuring they have permission to scan targets',
        'We log security tool usage for platform security and abuse prevention',
        'Scan results may contain sensitive information - handle responsibly',
        'AI Assistant conversations are processed by third-party AI providers',
        'Demo accounts may have limited data retention periods'
      ]
    }
  ];

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
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your privacy and security are our top priorities. Learn how we protect and handle your data.
            </p>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>Last updated: January 2025</p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              ReconLab is committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, store, and protect your data when you use our 
              cybersecurity reconnaissance platform. By using ReconLab, you agree to the practices described in this policy.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                  className="bg-dark-800/50 rounded-xl border border-dark-700 overflow-hidden"
                >
                  <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Data Retention */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-dark-800/50 rounded-xl p-8 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Data Retention</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">Account Data</h4>
                <p className="text-gray-300 text-sm">
                  We retain your account information for as long as your account is active. 
                  You can request account deletion at any time through our support channels.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">Scan Results</h4>
                <p className="text-gray-300 text-sm">
                  Stored scan results are kept indefinitely unless you delete them. 
                  Session-only results are cleared when you log out or after 24 hours of inactivity.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-8 bg-dark-800/50 rounded-xl p-8 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Third-Party Services</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-secondary">Firebase Authentication:</strong>
                  <span className="text-gray-300 ml-2">
                    Google's Firebase handles user authentication and account management
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-secondary">AI Providers:</strong>
                  <span className="text-gray-300 ml-2">
                    OpenRouter, DeepSeek, and OpenAI process AI Assistant conversations
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-secondary">MongoDB:</strong>
                  <span className="text-gray-300 ml-2">
                    Database service for storing your scan results and reports
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/support"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Contact Support
              </Link>
              <a
                href="mailto:ahmed22205341173@diu.edu.bd"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
              >
                Email Us Directly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
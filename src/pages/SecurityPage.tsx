import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Shield, Lock, Database, Eye, AlertTriangle, 
  CheckCircle, Key, Server, Globe, Users, FileText
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const SecurityPage = () => {
  const securityMeasures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data transmission is protected with TLS 1.3 encryption',
      features: [
        'HTTPS/TLS encryption for all communications',
        'Encrypted data storage in MongoDB',
        'Secure API endpoints with authentication',
        'Password hashing using industry standards'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Key,
      title: 'Authentication & Access Control',
      description: 'Multi-layered authentication system with Firebase',
      features: [
        'Firebase Authentication integration',
        'Secure session management',
        'User-specific data isolation',
        'Role-based access controls'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Database,
      title: 'Data Protection',
      description: 'Comprehensive data protection and privacy measures',
      features: [
        'User data isolation in MongoDB',
        'Regular automated backups',
        'Data retention policies',
        'GDPR compliance measures'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Eye,
      title: 'Monitoring & Auditing',
      description: 'Continuous monitoring and security auditing',
      features: [
        'Real-time security monitoring',
        'Access logging and audit trails',
        'Anomaly detection systems',
        'Regular security assessments'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const securityPractices = [
    {
      icon: Shield,
      title: 'Secure Development',
      practices: [
        'Security-first development approach',
        'Regular code security reviews',
        'Dependency vulnerability scanning',
        'Secure coding standards compliance'
      ]
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      practices: [
        'Secure cloud hosting environment',
        'Network segmentation and firewalls',
        'Regular security patches and updates',
        'DDoS protection and rate limiting'
      ]
    },
    {
      icon: Users,
      title: 'User Privacy',
      practices: [
        'Minimal data collection principles',
        'User consent and transparency',
        'Data anonymization where possible',
        'Right to data deletion and portability'
      ]
    },
    {
      icon: Globe,
      title: 'Compliance',
      practices: [
        'GDPR compliance for EU users',
        'SOC 2 Type II controls',
        'Regular compliance audits',
        'Industry best practices adherence'
      ]
    }
  ];

  const vulnerabilityProgram = {
    scope: [
      'ReconLab web application and API endpoints',
      'Authentication and authorization systems',
      'Data storage and transmission security',
      'Third-party integrations and dependencies'
    ],
    outOfScope: [
      'Social engineering attacks',
      'Physical security issues',
      'Denial of service attacks',
      'Issues in third-party services (Firebase, MongoDB)'
    ],
    rewards: [
      'Critical vulnerabilities: Recognition + Priority fix',
      'High severity: Public acknowledgment',
      'Medium/Low severity: Hall of fame listing',
      'All valid reports: Detailed response and timeline'
    ]
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
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Security
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn about our comprehensive security measures and how we protect your data and privacy.
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Security Overview */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20 mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Security Commitment</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              At ReconLab, security is not just a feature—it's the foundation of everything we do. As a platform 
              designed for cybersecurity professionals, we understand the critical importance of protecting your 
              data, maintaining privacy, and ensuring the integrity of our services.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Zero Trust Architecture</h3>
                <p className="text-gray-400 text-sm">Every request is verified and authenticated</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">End-to-End Encryption</h3>
                <p className="text-gray-400 text-sm">Data protected in transit and at rest</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Continuous Monitoring</h3>
                <p className="text-gray-400 text-sm">24/7 security monitoring and threat detection</p>
              </div>
            </div>
          </motion.div>

          {/* Security Measures */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Security <span className="text-primary">Measures</span>
              </h2>
              <p className="text-xl text-gray-400">
                Multi-layered security architecture protecting your data
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {securityMeasures.map((measure, index) => {
                const Icon = measure.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-dark-800/50 rounded-xl p-8 border border-dark-700 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${measure.color} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{measure.title}</h3>
                    <p className="text-gray-400 mb-6">{measure.description}</p>
                    
                    <ul className="space-y-3">
                      {measure.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Security Practices */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Security <span className="text-secondary">Practices</span>
              </h2>
              <p className="text-xl text-gray-400">
                Industry best practices implemented across our platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityPractices.map((practice, index) => {
                const Icon = practice.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 hover:border-secondary/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-4">{practice.title}</h3>
                    
                    <ul className="space-y-2">
                      {practice.practices.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Vulnerability Disclosure Program */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <div className="bg-dark-800/50 rounded-xl border border-dark-700 overflow-hidden">
              <div className="p-8 border-b border-dark-700">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Responsible Disclosure Program</h2>
                </div>
                <p className="text-gray-300">
                  We welcome security researchers to help us maintain the highest security standards. 
                  If you discover a security vulnerability, please report it responsibly.
                </p>
              </div>

              <div className="p-8 grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">In Scope</h3>
                  <ul className="space-y-2">
                    {vulnerabilityProgram.scope.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Out of Scope</h3>
                  <ul className="space-y-2">
                    {vulnerabilityProgram.outOfScope.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-400">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recognition</h3>
                  <ul className="space-y-2">
                    {vulnerabilityProgram.rewards.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-400">
                        <FileText className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact Security Team */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-8 animate-glow"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-white mb-6">
                  Report a <span className="text-primary">Security Issue</span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Found a security vulnerability? We appreciate responsible disclosure and will work 
                  with you to address any issues promptly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:ahmed22205341173@diu.edu.bd?subject=Security Vulnerability Report"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-dark-900 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <AlertTriangle className="mr-3 w-6 h-6" />
                    Report Vulnerability
                  </motion.a>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/support"
                      className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-bold text-lg rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
                    >
                      <Shield className="mr-3 w-6 h-6" />
                      Security Questions
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
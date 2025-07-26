import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertTriangle, Shield, Users, Gavel, CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const TermsOfServicePage = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using ReconLab, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, you may not use our services',
        'We reserve the right to modify these terms at any time with notice to users',
        'Continued use of the service after changes constitutes acceptance of new terms',
        'These terms apply to all users, including free and premium account holders'
      ]
    },
    {
      icon: Users,
      title: 'User Responsibilities',
      content: [
        'You must be at least 18 years old or have parental consent to use ReconLab',
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You must provide accurate and complete information when creating your account',
        'You agree to notify us immediately of any unauthorized use of your account',
        'You are solely responsible for all activities that occur under your account'
      ]
    },
    {
      icon: Shield,
      title: 'Authorized Use Only',
      content: [
        'ReconLab tools must only be used for authorized security testing and research',
        'You must have explicit permission to test any targets or systems',
        'Unauthorized scanning, hacking, or penetration testing is strictly prohibited',
        'You agree to comply with all applicable laws and regulations in your jurisdiction',
        'Bug bounty programs and authorized penetration testing are acceptable use cases',
        'Educational and research purposes in controlled environments are permitted'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Activities',
      content: [
        'Using ReconLab for illegal activities, including unauthorized system access',
        'Scanning or testing systems without proper authorization or consent',
        'Attempting to circumvent security measures or access controls',
        'Sharing account credentials or allowing unauthorized access to your account',
        'Using the service to harm, harass, or violate the rights of others',
        'Reverse engineering, decompiling, or attempting to extract source code',
        'Distributing malware, viruses, or other harmful code through our platform'
      ]
    },
    {
      icon: Gavel,
      title: 'Intellectual Property',
      content: [
        'ReconLab and its original content are protected by copyright and trademark laws',
        'You retain ownership of your scan results, notes, and user-generated content',
        'We grant you a limited, non-exclusive license to use our service',
        'You may not copy, modify, distribute, or create derivative works of our platform',
        'Third-party tools integrated into ReconLab remain property of their respective owners',
        'Any feedback or suggestions you provide may be used to improve our services'
      ]
    },
    {
      icon: FileText,
      title: 'Service Availability',
      content: [
        'We strive to maintain high availability but cannot guarantee uninterrupted service',
        'Scheduled maintenance and updates may temporarily affect service availability',
        'We reserve the right to modify, suspend, or discontinue features at any time',
        'Some security tools may have limitations based on the hosting environment',
        'AI Assistant features depend on third-party providers and may have usage limits',
        'We are not responsible for the availability or accuracy of external services'
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
              <FileText className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using ReconLab's cybersecurity tools and services.
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
            <h2 className="text-2xl font-bold text-white mb-4">Important Notice</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of ReconLab, a cybersecurity reconnaissance platform. 
              ReconLab provides powerful security testing tools that must be used responsibly and legally.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-2">Ethical Use Required</h3>
                  <p className="text-gray-300 text-sm">
                    ReconLab is designed for authorized security testing only. Users must ensure they have 
                    proper permission before testing any systems or networks. Unauthorized use may violate 
                    laws and regulations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
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

          {/* Liability and Disclaimers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-dark-800/50 rounded-xl p-8 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                ReconLab is provided "as is" without warranties of any kind. We do not guarantee the accuracy, 
                completeness, or reliability of security scan results.
              </p>
              <p>
                Users are solely responsible for their use of the platform and any consequences resulting from 
                security testing activities. We are not liable for any damages arising from unauthorized or 
                improper use of our tools.
              </p>
              <p>
                The integrated security tools are third-party software with their own terms and limitations. 
                We are not responsible for the functionality or results of these external tools.
              </p>
            </div>
          </motion.div>

          {/* Account Termination */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-8 bg-dark-800/50 rounded-xl p-8 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Account Termination</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">By You</h4>
                <p className="text-gray-300 text-sm">
                  You may terminate your account at any time by contacting our support team. 
                  Upon termination, your access to the service will be immediately revoked.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">By Us</h4>
                <p className="text-gray-300 text-sm">
                  We reserve the right to suspend or terminate accounts that violate these terms, 
                  engage in prohibited activities, or pose a security risk to our platform.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-8 bg-dark-800/50 rounded-xl p-8 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Governing Law</h3>
            <p className="text-gray-300 leading-relaxed">
              These Terms of Service are governed by and construed in accordance with applicable laws. 
              Any disputes arising from these terms or your use of ReconLab will be resolved through 
              appropriate legal channels. Users are responsible for complying with all local, state, 
              and federal laws in their jurisdiction.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms of Service or need clarification on any provisions, 
              please contact our legal team.
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
                Legal Inquiries
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
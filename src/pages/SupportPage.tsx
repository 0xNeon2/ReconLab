import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Mail, MessageCircle, Shield, Clock, Users,
  CheckCircle, AlertCircle, Info, HelpCircle, Send
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

const SupportPage = () => {
  const supportEmails = [
    {
      name: 'Ahmed',
      email: 'ahmed22205341173@diu.edu.bd',
      role: 'Lead Developer & Security Expert',
      specialties: ['API Development', 'Security Tools Integration', 'Backend Architecture']
    },
    {
      name: 'Mimma',
      email: 'mimma22205341226@diu.edu.bd',
      role: 'Frontend Developer & UI/UX Designer',
      specialties: ['React Development', 'User Interface Design', 'User Experience']
    }
  ];

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}?subject=ReconLab Support Request&body=Hello,%0D%0A%0D%0APlease describe your issue or question:%0D%0A%0D%0A`, '_blank');
  };

  const faqItems = [
    {
      question: 'How do I get started with ReconLab?',
      answer: 'Simply register for an account, log in to the dashboard, and start using any of our 11 integrated security tools. Each tool has a user-friendly interface with real-time output.',
      icon: HelpCircle,
      color: 'text-blue-400'
    },
    {
      question: 'Are the security tools real or simulated?',
      answer: 'ReconLab integrates real security tools like Subfinder, Nmap, Dirsearch, and others. In the WebContainer environment, some tools may show simulated output, but the interface and workflow are identical to production environments.',
      icon: Shield,
      color: 'text-green-400'
    },
    {
      question: 'How does the AI Assistant work?',
      answer: 'Our AI Assistant uses DeepSeek R1 model via OpenRouter to provide expert cybersecurity guidance. You can paste scan results for analysis or ask questions about attack vectors and methodologies.',
      icon: MessageCircle,
      color: 'text-purple-400'
    },
    {
      question: 'Can I store and export my scan results?',
      answer: 'Yes! You can store scan results to your personal MongoDB database and export them as text files. Each user has isolated data storage for privacy and security.',
      icon: CheckCircle,
      color: 'text-orange-400'
    },
    {
      question: 'Is ReconLab suitable for professional use?',
      answer: 'Absolutely! ReconLab follows industry-standard methodologies and integrates professional-grade tools. It\'s designed for bug bounty hunters, penetration testers, and security professionals.',
      icon: Users,
      color: 'text-red-400'
    },
    {
      question: 'What should I do if a tool is not working?',
      answer: 'First, check your internet connection and target accessibility. If issues persist, contact our support team with details about the tool, target, and error messages.',
      icon: AlertCircle,
      color: 'text-yellow-400'
    }
  ];

  const supportFeatures = [
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We aim to respond to all support requests within 24 hours',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Get help from experienced cybersecurity professionals',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Security Focus',
      description: 'Specialized support for security tools and methodologies',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Info,
      title: 'Comprehensive Help',
      description: 'From basic usage to advanced security techniques',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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
              <MessageCircle className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Support Center
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get expert help with ReconLab's security tools and features from our 
              <span className="text-primary font-semibold"> cybersecurity specialists</span>
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Support Features */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 border border-dark-700 text-center"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Contact Our <span className="text-primary">Expert Team</span>
              </h2>
              <p className="text-xl text-gray-400">
                Reach out to our cybersecurity specialists for personalized support
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {supportEmails.map((contact, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  custom={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-lg rounded-2xl p-8 border border-dark-700 hover:border-primary/50 transition-all duration-500"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                      <span className="text-dark-900 font-bold text-xl">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                      <p className="text-gray-400">{contact.role}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {contact.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleEmailClick(contact.email)}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Send Email
                  </button>
                  
                  <div className="mt-3 text-center">
                    <code className="text-xs text-gray-400 bg-dark-950 px-2 py-1 rounded">
                      {contact.email}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked <span className="text-secondary">Questions</span>
              </h2>
              <p className="text-xl text-gray-400">
                Quick answers to common questions about ReconLab
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 hover:border-secondary/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Icon className={`w-6 h-6 ${faq.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Additional Support */}
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
                  <Send className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-white mb-6">
                  Need More <span className="text-primary">Help</span>?
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our team is here to help you master ReconLab's security tools and methodologies. 
                  Don't hesitate to reach out with any questions or issues.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmailClick('ahmed22205341173@diu.edu.bd')}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-dark-900 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <Mail className="mr-3 w-6 h-6" />
                    Contact Ahmed
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmailClick('mimma22205341226@diu.edu.bd')}
                    className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-bold text-lg rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
                  >
                    <Mail className="mr-3 w-6 h-6" />
                    Contact Mimma
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
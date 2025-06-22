import React, { useState } from 'react';
import { ExternalLink, Search, Github, Globe } from 'lucide-react';

const Dorking: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('');

  const predefinedDorks = [
    {
      name: 'Admin Panel Finder',
      query: 'site:DOMAIN inurl:admin OR inurl:administrator OR inurl:wp-admin',
      description: 'Find admin panels and login pages'
    },
    {
      name: 'Database Files',
      query: 'site:DOMAIN filetype:sql OR filetype:db OR filetype:dbf',
      description: 'Search for database files'
    },
    {
      name: 'Configuration Files',
      query: 'site:DOMAIN filetype:conf OR filetype:config OR filetype:cfg',
      description: 'Find configuration files'
    },
    {
      name: 'Log Files',
      query: 'site:DOMAIN filetype:log OR filetype:txt inurl:log',
      description: 'Search for log files'
    },
    {
      name: 'Backup Files',
      query: 'site:DOMAIN filetype:bak OR filetype:backup OR filetype:old',
      description: 'Find backup files'
    },
    {
      name: 'Directory Listings',
      query: 'site:DOMAIN intitle:"Index of" OR intitle:"Directory Listing"',
      description: 'Find open directory listings'
    },
    {
      name: 'Sensitive Documents',
      query: 'site:DOMAIN filetype:pdf OR filetype:doc OR filetype:xls intitle:confidential',
      description: 'Search for sensitive documents'
    },
    {
      name: 'Error Messages',
      query: 'site:DOMAIN "error" OR "warning" OR "fatal" OR "exception"',
      description: 'Find error messages that might reveal information'
    }
  ];

  const dorkDatabases = [
    {
      name: 'Google Hacking Database (GHDB)',
      url: 'https://www.exploit-db.com/google-hacking-database',
      description: 'Comprehensive database of Google dorks',
      icon: <Search className="w-5 h-5" />
    },
    {
      name: 'Dorksearch',
      url: 'https://dorksearch.com/',
      description: 'Search engine for Google dorks',
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: 'GitHub Dorks',
      url: 'https://github.com/techgaun/github-dorks',
      description: 'Collection of GitHub dorks for bug bounty',
      icon: <Github className="w-5 h-5" />
    },
    {
      name: 'Pentest Tools Dorks',
      url: 'https://pentest-tools.com/information-gathering/google-hacking',
      description: 'Automated Google dorking tool',
      icon: <ExternalLink className="w-5 h-5" />
    }
  ];

  const handleDorkClick = (dork: any) => {
    if (!targetUrl.trim()) {
      alert('Please enter a target URL first');
      return;
    }

    const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const query = dork.query.replace('DOMAIN', domain);
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, '_blank');
  };

  const handleDatabaseClick = (database: any) => {
    window.open(database.url, '_blank');
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <ExternalLink className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Google Dorking</h1>
          <p className="text-gray-400">Advanced search techniques for information gathering</p>
        </div>
      </div>

      {/* Target Input */}
      <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-2">
              Target URL/Domain
            </label>
            <input
              type="text"
              id="target"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="example.com or https://example.com"
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Predefined Dorks */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Predefined Dorks</h2>
          <div className="space-y-4">
            {predefinedDorks.map((dork, index) => (
              <div
                key={index}
                onClick={() => handleDorkClick(dork)}
                className="group bg-dark-800/50 rounded-lg p-4 border border-dark-700 hover:border-primary/50 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {dork.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{dork.description}</p>
                    <code className="text-xs bg-dark-700 text-primary px-2 py-1 rounded font-mono">
                      {dork.query}
                    </code>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors ml-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dork Databases */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Dork Databases</h2>
          <div className="space-y-4">
            {dorkDatabases.map((database, index) => (
              <div
                key={index}
                onClick={() => handleDatabaseClick(database)}
                className="group bg-dark-800/50 rounded-lg p-4 border border-dark-700 hover:border-secondary/50 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    {database.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-secondary transition-colors">
                      {database.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{database.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-secondary transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-6 border border-indigo-500/20">
            <h3 className="font-semibold text-white mb-3">Dorking Tips</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use specific file types and operators for better results
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Combine multiple operators for more targeted searches
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Always respect the target's terms of service and legal boundaries
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Consider using different search engines for varied results
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dorking;
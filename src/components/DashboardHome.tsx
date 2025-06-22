import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Globe, 
  Search, 
  Target, 
  Eye, 
  Terminal, 
  Zap, 
  Lock, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const quickActions = [
    {
      name: 'Subdomain Enumeration',
      href: '/dashboard/subdomain-enumeration',
      icon: Globe,
      description: 'Discover subdomains',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Nmap Scanning',
      href: '/dashboard/nmap-scanning',
      icon: Terminal,
      description: 'Network reconnaissance',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Endpoint Discovery',
      href: '/dashboard/endpoint-discovery',
      icon: Search,
      description: 'Find hidden endpoints',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Vulnerability Scan',
      href: '/dashboard/subdomain-takeover',
      icon: Zap,
      description: 'Detect vulnerabilities',
      color: 'from-red-500 to-orange-500'
    }
  ];

  const recentActivity = [
    { action: 'Subdomain scan completed', target: 'example.com', time: '2 minutes ago', status: 'success' },
    { action: 'Nmap scan started', target: '192.168.1.1', time: '5 minutes ago', status: 'running' },
    { action: 'Report generated', target: 'security-audit.pdf', time: '10 minutes ago', status: 'success' },
    { action: 'CMS scan completed', target: 'wordpress.com', time: '15 minutes ago', status: 'success' }
  ];

  const stats = [
    { name: 'Total Scans', value: '24', change: '+4.75%', icon: Activity },
    { name: 'Vulnerabilities Found', value: '8', change: '+2.02%', icon: Zap },
    { name: 'Reports Generated', value: '12', change: '+3.14%', icon: TrendingUp },
    { name: 'Active Scans', value: '3', change: '0%', icon: Clock }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back to ReconLab. Here's what's happening with your security scans.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-dark-800/50 rounded-xl p-6 border border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-sm text-green-400 mt-2">
                {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className="group p-4 bg-dark-700/50 rounded-lg border border-dark-600 hover:border-primary/50 transition-all duration-200 hover:transform hover:scale-105"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{action.name}</h3>
                  <p className="text-gray-400 text-xs">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'running' ? 'bg-yellow-500 animate-pulse' : 
                  'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.target}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Security Tip</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Always verify your scan results manually and ensure you have proper authorization before conducting 
              security assessments on any target systems. Remember to follow responsible disclosure practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
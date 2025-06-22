// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Shield, 
//   Globe, 
//   Search, 
//   Target, 
//   Eye, 
//   Terminal, 
//   Zap, 
//   Lock, 
//   ExternalLink,
//   FileText,
//   CheckSquare,
//   BarChart3,
//   Menu,
//   X,
//   Home,
//   LogOut,
//   ChevronDown,
//   ChevronRight
// } from 'lucide-react';

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [vulnerabilityDropdownOpen, setVulnerabilityDropdownOpen] = useState(false);

//   const menuItems = [
//     { 
//       name: 'Dashboard', 
//       href: '/dashboard', 
//       icon: Home,
//       exact: true
//     },
//     { 
//       name: 'Subdomain Enumeration', 
//       href: '/dashboard/subdomain-enumeration', 
//       icon: Globe 
//     },
//     { 
//       name: 'Endpoint Discovery', 
//       href: '/dashboard/endpoint-discovery', 
//       icon: Search 
//     },
//     { 
//       name: 'Parameter Discovery', 
//       href: '/dashboard/parameter-discovery', 
//       icon: Target 
//     },
//     { 
//       name: 'CMS Scanner', 
//       href: '/dashboard/cms-scanner', 
//       icon: Shield 
//     },
//     { 
//       name: 'Firewall Detection', 
//       href: '/dashboard/firewall-detection', 
//       icon: Eye 
//     },
//     { 
//       name: 'Nmap Scanning', 
//       href: '/dashboard/nmap-scanning', 
//       icon: Terminal 
//     },
//     { 
//       name: 'Dorking', 
//       href: '/dashboard/dorking', 
//       icon: ExternalLink 
//     },
//     { 
//       name: 'Notes', 
//       href: '/dashboard/notes', 
//       icon: FileText 
//     },
//     { 
//       name: 'Vulnerability Checklist', 
//       href: '/dashboard/vulnerability-checklist', 
//       icon: CheckSquare 
//     },
//     { 
//       name: 'Reports', 
//       href: '/dashboard/reports', 
//       icon: BarChart3,
//       badge: true
//     },
//   ];

//   const vulnerabilityItems = [
//     {
//       name: 'Subdomain Takeover',
//       href: '/dashboard/subdomain-takeover',
//       icon: Zap
//     },
//     {
//       name: 'Open Redirect',
//       href: '/dashboard/open-redirect',
//       icon: Lock
//     }
//   ];

//   const isActive = (href: string, exact = false) => {
//     if (exact) {
//       return location.pathname === href;
//     }
//     return location.pathname.startsWith(href);
//   };

//   const isVulnerabilityActive = () => {
//     return vulnerabilityItems.some(item => isActive(item.href));
//   };

//   const handleLogout = () => {
//     // Clear any stored user data (if any)
//     localStorage.removeItem('reconlab_user');
//     localStorage.removeItem('reconlab_token');
    
//     // Navigate to login page
//     navigate('/login');
    
//     // Close sidebar on mobile
//     setSidebarOpen(false);
//   };

//   const toggleVulnerabilityDropdown = () => {
//     setVulnerabilityDropdownOpen(!vulnerabilityDropdownOpen);
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="p-2 bg-dark-800 text-gray-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
//         >
//           {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       {/* Sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="lg:hidden fixed inset-0 z-40 bg-black/50"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-700 transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center space-x-2 p-6 border-b border-dark-700">
//             <Shield className="w-8 h-8 text-primary" />
//             <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               ReconLab
//             </span>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.href, item.exact);
              
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={() => setSidebarOpen(false)}
//                   className={`
//                     group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
//                     ${active
//                       ? 'bg-primary/10 text-primary border-r-2 border-primary'
//                       : 'text-gray-300 hover:text-white hover:bg-dark-800'
//                     }
//                   `}
//                 >
//                   <Icon className={`
//                     mr-3 h-5 w-5 transition-colors
//                     ${active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'}
//                   `} />
//                   <span className="flex-1">{item.name}</span>
//                   {item.badge && (
//                     <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-dark-900 bg-primary rounded-full">
//                       •
//                     </span>
//                   )}
//                 </Link>
//               );
//             })}

//             {/* Vulnerability Detection Dropdown */}
//             <div>
//               <button
//                 onClick={toggleVulnerabilityDropdown}
//                 className={`
//                   group w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
//                   ${isVulnerabilityActive()
//                     ? 'bg-primary/10 text-primary border-r-2 border-primary'
//                     : 'text-gray-300 hover:text-white hover:bg-dark-800'
//                   }
//                 `}
//               >
//                 <Zap className={`
//                   mr-3 h-5 w-5 transition-colors
//                   ${isVulnerabilityActive() ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'}
//                 `} />
//                 <span className="flex-1">Vulnerability Detection</span>
//                 {vulnerabilityDropdownOpen ? (
//                   <ChevronDown className="w-4 h-4" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4" />
//                 )}
//               </button>

//               {/* Dropdown Items */}
//               {vulnerabilityDropdownOpen && (
//                 <div className="ml-6 mt-2 space-y-1">
//                   {vulnerabilityItems.map((item) => {
//                     const Icon = item.icon;
//                     const active = isActive(item.href);
                    
//                     return (
//                       <Link
//                         key={item.name}
//                         to={item.href}
//                         onClick={() => setSidebarOpen(false)}
//                         className={`
//                           group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
//                           ${active
//                             ? 'bg-primary/10 text-primary'
//                             : 'text-gray-400 hover:text-white hover:bg-dark-800'
//                           }
//                         `}
//                       >
//                         <Icon className={`
//                           mr-3 h-4 w-4 transition-colors
//                           ${active ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}
//                         `} />
//                         <span>{item.name}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </nav>

//           {/* User Info and Logout */}
//           <div className="p-4 border-t border-dark-700 space-y-3">
//             {/* User Info */}
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
//                 <span className="text-dark-900 font-bold text-sm">D</span>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-white">Demo User</p>
//                 <p className="text-xs text-gray-400">demo@reconlab.com</p>
//               </div>
//             </div>
            
//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200 group"
//             >
//               <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Globe,
  Search,
  Target,
  Eye,
  Terminal,
  Zap,
  Lock,
  ExternalLink,
  FileText,
  CheckSquare,
  BarChart3,
  Menu,
  X,
  Home,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [vulnerabilityDropdownOpen, setVulnerabilityDropdownOpen] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      exact: true
    },
    {
      name: 'Subdomain Enumeration',
      href: '/dashboard/subdomain-enumeration',
      icon: Globe
    },
    {
      name: 'Endpoint Discovery',
      href: '/dashboard/endpoint-discovery',
      icon: Search
    },
    {
      name: 'Parameter Discovery',
      href: '/dashboard/parameter-discovery',
      icon: Target
    },
    {
      name: 'CMS Scanner',
      href: '/dashboard/cms-scanner',
      icon: Shield
    },
    {
      name: 'Firewall Detection',
      href: '/dashboard/firewall-detection',
      icon: Eye
    },
    {
      name: 'Nmap Scanning',
      href: '/dashboard/nmap-scanning',
      icon: Terminal
    },
    {
      name: 'Dorking',
      href: '/dashboard/dorking',
      icon: ExternalLink
    },
    {
      name: 'Notes',
      href: '/dashboard/notes',
      icon: FileText
    },
    {
      name: 'Vulnerability Checklist',
      href: '/dashboard/vulnerability-checklist',
      icon: CheckSquare
    }
  ];

  const vulnerabilityItems = [
    {
      name: 'Subdomain Takeover',
      href: '/dashboard/subdomain-takeover',
      icon: Zap
    },
    {
      name: 'Open Redirect',
      href: '/dashboard/open-redirect',
      icon: Lock
    }
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  const isVulnerabilityActive = () => {
    return vulnerabilityItems.some(item => isActive(item.href));
  };

  const handleLogout = () => {
    localStorage.removeItem('reconlab_user');
    localStorage.removeItem('reconlab_token');
    navigate('/login');
    setSidebarOpen(false);
  };

  const toggleVulnerabilityDropdown = () => {
    setVulnerabilityDropdownOpen(!vulnerabilityDropdownOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-dark-800 text-gray-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-700 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-6 border-b border-dark-700">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ReconLab
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${active
                      ? 'bg-primary/10 text-primary border-r-2 border-primary'
                      : 'text-gray-300 hover:text-white hover:bg-dark-800'
                    }
                  `}
                >
                  <Icon className={`
                    mr-3 h-5 w-5 transition-colors
                    ${active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'}
                  `} />
                  <span className="flex-1">{item.name}</span>
                </Link>
              );
            })}

            {/* Vulnerability Detection Dropdown */}
            <div>
              <button
                onClick={toggleVulnerabilityDropdown}
                className={`
                  group w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isVulnerabilityActive()
                    ? 'bg-primary/10 text-primary border-r-2 border-primary'
                    : 'text-gray-300 hover:text-white hover:bg-dark-800'
                  }
                `}
              >
                <Zap className={`
                  mr-3 h-5 w-5 transition-colors
                  ${isVulnerabilityActive() ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'}
                `} />
                <span className="flex-1">Vulnerability Detection</span>
                {vulnerabilityDropdownOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {vulnerabilityDropdownOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  {vulnerabilityItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${active
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-400 hover:text-white hover:bg-dark-800'
                          }
                        `}
                      >
                        <Icon className={`
                          mr-3 h-4 w-4 transition-colors
                          ${active ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}
                        `} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Reports Moved Below Vulnerability */}
            <Link
              to="/dashboard/reports"
              onClick={() => setSidebarOpen(false)}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive('/dashboard/reports')
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-gray-300 hover:text-white hover:bg-dark-800'
                }
              `}
            >
              <BarChart3 className={`
                mr-3 h-5 w-5 transition-colors
                ${isActive('/dashboard/reports') ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'}
              `} />
              <span className="flex-1">Reports</span>
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-dark-900 bg-primary rounded-full">
                •
              </span>
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-dark-700 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-dark-900 font-bold text-sm">D</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Demo User</p>
                <p className="text-xs text-gray-400">demo@reconlab.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200 group"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

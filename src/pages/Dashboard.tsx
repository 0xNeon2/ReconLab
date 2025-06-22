import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SubdomainEnumeration from '../components/modules/SubdomainEnumeration';
import EndpointDiscovery from '../components/modules/EndpointDiscovery';
import ParameterDiscovery from '../components/modules/ParameterDiscovery';
import CMSScanner from '../components/modules/CMSScanner';
import FirewallDetection from '../components/modules/FirewallDetection';
import NmapScanning from '../components/modules/NmapScanning';
import Dorking from '../components/modules/Dorking';
import SubdomainTakeover from '../components/modules/SubdomainTakeover';
import OpenRedirect from '../components/modules/OpenRedirect';
import Notes from '../components/modules/Notes';
import VulnerabilityChecklist from '../components/modules/VulnerabilityChecklist';
import Reports from '../components/modules/Reports';
import DashboardHome from '../components/DashboardHome';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/subdomain-enumeration" element={<SubdomainEnumeration />} />
            <Route path="/endpoint-discovery" element={<EndpointDiscovery />} />
            <Route path="/parameter-discovery" element={<ParameterDiscovery />} />
            <Route path="/cms-scanner" element={<CMSScanner />} />
            <Route path="/firewall-detection" element={<FirewallDetection />} />
            <Route path="/nmap-scanning" element={<NmapScanning />} />
            <Route path="/dorking" element={<Dorking />} />
            <Route path="/subdomain-takeover" element={<SubdomainTakeover />} />
            <Route path="/open-redirect" element={<OpenRedirect />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/vulnerability-checklist" element={<VulnerabilityChecklist />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
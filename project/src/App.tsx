import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import HomePage from './components/Pages/HomePage';
import ProjectsPage from './components/Pages/ProjectsPage';
import KYCPage from './components/Pages/KYCPage';
import ACVAPage from './components/Pages/ACVAPage';
import ValidationPage from './components/Pages/ValidationPage';
import VerificationPage from './components/Pages/VerificationPage';
import XAIPage from './components/Pages/XAIPage';
import { 
  mockStats, 
  mockNotifications, 
  mockProjects, 
  mockAccounts, 
  mockACVAs, 
  mockValidations, 
  mockVerifications 
} from './data/mockData';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage stats={mockStats} onNavigateToProjects={() => setActiveSection('projects')} />;
      case 'projects':
        return <ProjectsPage projects={mockProjects} />;
      case 'kyc':
        return <KYCPage accounts={mockAccounts} />;
      case 'acva':
        return <ACVAPage acvas={mockACVAs} />;
      case 'validation':
        return <ValidationPage validations={mockValidations} />;
      case 'verification':
        return <VerificationPage verifications={mockVerifications} />;
      case 'xai':
        return <XAIPage />;
      default:
        return <HomePage stats={mockStats} onNavigateToProjects={() => setActiveSection('projects')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="ml-64">
        {activeSection !== 'home' && <Header notifications={mockNotifications} />}
        <main className={activeSection === 'home' ? '' : 'pt-0'}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { 
  Home, 
  FolderOpen, 
  UserCheck, 
  Shield, 
  CheckCircle, 
  Verified,
  Brain,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'kyc', label: 'Account KYC', icon: UserCheck },
  { id: 'acva', label: 'ACVA', icon: Shield },
  { id: 'validation', label: 'Validation', icon: CheckCircle },
  { id: 'verification', label: 'Verification', icon: Verified },
  { id: 'xai', label: 'XAI', icon: Brain }
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-emerald-900 to-emerald-800 text-white h-screen fixed left-0 top-0 shadow-2xl">
      <div className="p-6 border-b border-emerald-700">
        <h1 className="text-2xl font-bold text-emerald-100">Neel Ledger</h1>
        <p className="text-emerald-300 text-sm mt-1">NCCR Admin Dashboard</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-6 py-4 text-left transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-700 border-r-4 border-emerald-400 text-white' 
                  : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-emerald-300" />
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-emerald-800 rounded-lg p-4 border border-emerald-700">
          <p className="text-emerald-300 text-xs">Carbon Credit Management</p>
          <p className="text-white text-sm font-semibold mt-1">Admin Portal v2.0</p>
        </div>
      </div>
    </div>
  );
}
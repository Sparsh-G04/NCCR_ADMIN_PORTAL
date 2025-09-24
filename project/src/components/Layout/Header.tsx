import React from 'react';
import { Bell, User, Settings } from 'lucide-react';
import { Notification } from '../../types';

interface HeaderProps {
  notifications: Notification[];
}

export default function Header({ notifications }: HeaderProps) {
  const totalNotifications = notifications.reduce((sum, notif) => sum + (notif.count || 1), 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 ml-64">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600 text-sm">Manage carbon credit projects and verification processes</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notification Panel */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center space-x-6">
              {notifications.map((notif) => (
                <div key={notif.id} className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">{notif.count}</div>
                  <div className="text-xs text-gray-600 capitalize">{notif.message}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {totalNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalNotifications > 99 ? '99+' : totalNotifications}
                </span>
              )}
            </button>
            
            <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2 bg-emerald-100 rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-emerald-700" />
              <span className="text-emerald-800 font-medium text-sm">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
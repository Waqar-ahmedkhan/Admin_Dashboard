import React from 'react';
import AppSettings from '../../components/DashboardSetting/AppSetting';
import NotificationSettings from '../../components/DashboardSetting/NotificationSetting';
import PaymentSettings from '../../components/DashboardSetting/PaymentSetting';
import DashboardLayout from '@/app/components/DashboardLayout';


const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <AppSettings />
        </div>
        <div>
          <NotificationSettings />
        </div>
        <div>
          <PaymentSettings />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;

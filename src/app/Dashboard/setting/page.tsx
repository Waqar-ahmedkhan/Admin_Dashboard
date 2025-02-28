"use client";
import React, { useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import PaymentSettings from "../../components/DashboardSetting/PaymentSetting";
import NotificationSettings from "../../components/DashboardSetting/NotificationSetting";
import AppUpdatePopupSettings from "../../components/DashboardSetting/AppUpdatePopupSetting";
import PrivacyPolicySettings from "../../components/DashboardSetting/PrivacyPolicy";
import TermsAndConditionsSettings from "../../components/DashboardSetting/TermsAndCondition";
import UserAgreementSettings from "../../components/DashboardSetting/UserAggrementSetting";
import ContactEmailSettings from "../../components/DashboardSetting/ContachEmailSetting";
import {
  CreditCard,
  Bell,
  RefreshCw,
  Lock,
  FileText,
  Users,
  Mail,
} from "lucide-react";

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("payment");

  // Define sections with names and corresponding lucide-react icons
  const sections = [
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "notification", name: "Notification", icon: Bell },
    { id: "app-update-popup", name: "App Update Popup", icon: RefreshCw },
    { id: "privacy-policy", name: "Privacy Policy", icon: Lock },
    { id: "terms-and-conditions", name: "Terms & Conditions", icon: FileText },
    { id: "user-agreement", name: "User Agreement", icon: Users },
    { id: "contact-email", name: "Contact Email", icon: Mail },
  ];

  // Function to render the active section component
  const renderSection = () => {
    switch (activeSection) {
      case "payment":
        return <PaymentSettings />;
      case "notification":
        return <NotificationSettings />;
      case "app-update-popup":
        return <AppUpdatePopupSettings />;
      case "privacy-policy":
        return <PrivacyPolicySettings />;
      case "terms-and-conditions":
        return <TermsAndConditionsSettings />;
      case "user-agreement":
        return <UserAgreementSettings />;
      case "contact-email":
        return <ContactEmailSettings />;
      default:
        return <PaymentSettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <nav
          className="w-full md:w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          aria-label="Settings navigation"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
          <ul className="space-y-2">
            {sections.map(({ id, name, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActiveSection(id)}
                  className={`w-full text-left p-2 rounded-lg flex items-center ${
                    activeSection === id
                      ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {name}
                  {activeSection === id && (
                    <span className="sr-only"> (current section)</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {sections.find((s) => s.id === activeSection)?.name}
            </h2>
            {renderSection()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
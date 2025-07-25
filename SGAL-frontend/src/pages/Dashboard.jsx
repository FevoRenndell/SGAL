// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import UserSidebar from '../components/UserSidebar';
import TabHome from '../components/tabs/TabHome';
import TabQuotations from '../components/tabs/TabQuotations';
import TabRequests from '../components/tabs/TabRequests';
import TabSettings from '../components/tabs/TabSettings';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSubTab, setActiveSubTab] = useState(null);

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <TabHome />;
      case 'quotes':
        // Manejar las subpestañas de cotizaciones
        switch (activeSubTab) {
          case 'quotations':
            return <TabQuotations />;
          case 'requests':
            return <TabRequests />;
          default:
            return <TabQuotations />;
        }
      case 'settings':
        return <TabSettings />;
      default:
        return <TabHome />;
    }
  };

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden">
      <UserSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />
      <div className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (activeSubTab || '')}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
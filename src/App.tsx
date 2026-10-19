import React, { useState } from 'react';
import { ActiveTab, Product, SubmittedApplication } from './types';
import { INITIAL_PRODUCTS, INITIAL_LEGAL_DOCS, INITIAL_SUBMITTED_APPS } from './data/mockData';
import { Header } from './components/Header';
import { StatBanner } from './components/StatBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { GisMap } from './components/GisMap';
import { LegalDocs } from './components/LegalDocs';
import { DossierSubmission } from './components/DossierSubmission';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AIChatbot } from './components/AIChatbot';
import { Footer } from './components/Footer';
import { Boxes, MapPin, Scale, FileCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [legalDocs] = useState(INITIAL_LEGAL_DOCS);
  const [applications, setApplications] = useState<SubmittedApplication[]>(INITIAL_SUBMITTED_APPS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddApplication = (newApp: SubmittedApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  return (
    <div className="text-gray-800 flex flex-col min-h-screen relative pb-16 lg:pb-0">
      {/* 1. Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onToggleAiChat={() => setIsAiChatOpen((prev) => !prev)}
      />

      {/* 2. Banner & Statistics */}
      <StatBanner products={products} />

      {/* 3. Main Views */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">
        {activeTab === 'products' && (
          <ProductCatalog
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'map' && (
          <GisMap
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'docs' && <LegalDocs docs={legalDocs} />}

        {activeTab === 'guide' && (
          <DossierSubmission
            applications={applications}
            onAddApplication={handleAddApplication}
          />
        )}
      </main>

      {/* 4. Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex items-center justify-around py-2 shadow-lg">
        <button
          onClick={() => handleTabChange('products')}
          className={`flex flex-col items-center text-xs cursor-pointer ${
            activeTab === 'products' ? 'text-green-700 font-bold' : 'text-gray-500'
          }`}
        >
          <Boxes className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Sản phẩm</span>
        </button>

        <button
          onClick={() => handleTabChange('map')}
          className={`flex flex-col items-center text-xs cursor-pointer ${
            activeTab === 'map' ? 'text-green-700 font-bold' : 'text-gray-500'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Bản đồ GIS</span>
        </button>

        <button
          onClick={() => handleTabChange('docs')}
          className={`flex flex-col items-center text-xs cursor-pointer ${
            activeTab === 'docs' ? 'text-green-700 font-bold' : 'text-gray-500'
          }`}
        >
          <Scale className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Văn bản</span>
        </button>

        <button
          onClick={() => handleTabChange('guide')}
          className={`flex flex-col items-center text-xs cursor-pointer ${
            activeTab === 'guide' ? 'text-green-700 font-bold' : 'text-gray-500'
          }`}
        >
          <FileCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Nộp hồ sơ</span>
        </button>
      </div>

      {/* 5. Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 6. Trợ lý AI Chatbot */}
      <AIChatbot
        isOpen={isAiChatOpen}
        onToggle={() => setIsAiChatOpen((prev) => !prev)}
      />

      {/* 7. Footer */}
      <Footer onTabChange={handleTabChange} />
    </div>
  );
};

export default App;

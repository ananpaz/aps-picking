import { useState } from "react";
import CollectorLogin from "@/components/collector/CollectorLogin";
import CollectorMenu from "@/components/collector/CollectorMenu";
import StartCollection from "@/components/collector/StartCollection";
import PickingScreen from "@/components/collector/PickingScreen";
import FinishCollection from "@/components/collector/FinishCollection";
import GestorDashboard from "@/components/gestor/GestorDashboard";
import AdminPanel from "@/components/admin/AdminPanel";

type View = 
  | "role-select" 
  | "collector-login" 
  | "collector-menu" 
  | "start-collection" 
  | "picking" 
  | "finish-collection"
  | "gestor-dashboard"
  | "admin-panel";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("role-select");
  const [collectorName, setCollectorName] = useState("");
  const [currentBox, setCurrentBox] = useState("");

  const handleSelectRole = (role: string) => {
    if (role === "collector") {
      setCurrentView("collector-login");
    } else if (role === "gestor") {
      setCurrentView("gestor-dashboard");
    } else if (role === "admin") {
      setCurrentView("admin-panel");
    }
  };

  const handleLoginSuccess = (name: string) => {
    setCollectorName(name);
    setCurrentView("collector-menu");
  };

  const handleStartCollection = () => {
    setCurrentView("start-collection");
  };

  const handleBoxScanned = (boxId: string) => {
    setCurrentBox(boxId);
    setCurrentView("picking");
  };

  const handleFinishCollection = () => {
    setCurrentView("finish-collection");
  };

  const handleBackToMenu = () => {
    setCurrentView("collector-menu");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "role-select" && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">APS-Picking</h1>
              <p className="text-gray-600">Sistema de Picking e Expedição</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleSelectRole("collector")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                👷 Coletor
              </button>
              <button
                onClick={() => handleSelectRole("gestor")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                📊 Gestor
              </button>
              <button
                onClick={() => handleSelectRole("admin")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                ⚙️ Administrador
              </button>
            </div>
          </div>
        </div>
      )}

      {currentView === "collector-login" && (
        <CollectorLogin 
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setCurrentView("role-select")}
        />
      )}

      {currentView === "collector-menu" && (
        <CollectorMenu 
          collectorName={collectorName}
          onStartCollection={handleStartCollection}
          onBack={() => setCurrentView("role-select")}
        />
      )}

      {currentView === "start-collection" && (
        <StartCollection 
          onBoxScanned={handleBoxScanned}
          onBack={handleBackToMenu}
        />
      )}

      {currentView === "picking" && (
        <PickingScreen 
          boxId={currentBox}
          onFinish={handleFinishCollection}
          onBack={handleBackToMenu}
        />
      )}

      {currentView === "finish-collection" && (
        <FinishCollection 
          boxId={currentBox}
          onContinue={() => setCurrentView("start-collection")}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {currentView === "gestor-dashboard" && (
        <GestorDashboard 
          onBack={() => setCurrentView("role-select")}
        />
      )}

      {currentView === "admin-panel" && (
        <AdminPanel 
          onBack={() => setCurrentView("role-select")}
        />
      )}
    </div>
  );
}

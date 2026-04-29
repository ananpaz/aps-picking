import { useState } from "react";

interface CollectorLoginProps {
  onLoginSuccess: (name: string) => void;
  onBack: () => void;
}

export default function CollectorLogin({ onLoginSuccess, onBack }: CollectorLoginProps) {
  const [supervisorCode, setSupervisorCode] = useState("");
  const [collectorCode, setCollectorCode] = useState("");
  const [step, setStep] = useState<"supervisor" | "collector">("supervisor");

  const handleSupervisorSubmit = () => {
    if (supervisorCode.trim()) {
      setStep("collector");
    }
  };

  const handleCollectorSubmit = () => {
    if (collectorCode.trim()) {
      onLoginSuccess(collectorCode);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📱</div>
          <h1 className="text-2xl font-bold text-gray-900">Coletor de Dados</h1>
          <p className="text-gray-600 text-sm mt-2">Sistema de Picking</p>
        </div>

        {step === "supervisor" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Código do Supervisor
              </label>
              <input
                type="text"
                value={supervisorCode}
                onChange={(e) => setSupervisorCode(e.target.value)}
                placeholder="Bipe o código do supervisor"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-mono"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">💡 Ou digite e pressione Enter</p>
            </div>

            <button
              onClick={handleSupervisorSubmit}
              disabled={!supervisorCode.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Próximo
            </button>

            <button
              onClick={onBack}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Voltar
            </button>
          </div>
        )}

        {step === "collector" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Supervisor:</span> {supervisorCode}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Código do Colaborador
              </label>
              <input
                type="text"
                value={collectorCode}
                onChange={(e) => setCollectorCode(e.target.value)}
                placeholder="Bipe seu código"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-mono"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">💡 Ou digite e pressione Enter</p>
            </div>

            <button
              onClick={handleCollectorSubmit}
              disabled={!collectorCode.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Acessar Sistema
            </button>

            <button
              onClick={() => {
                setStep("supervisor");
                setSupervisorCode("");
              }}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

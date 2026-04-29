import { useState } from "react";

interface StartCollectionProps {
  onBoxScanned: (boxId: string) => void;
  onBack: () => void;
}

export default function StartCollection({ onBoxScanned, onBack }: StartCollectionProps) {
  const [boxCode, setBoxCode] = useState("");
  const [boxCount, setBoxCount] = useState(1);

  const handleScan = () => {
    if (boxCode.trim()) {
      onBoxScanned(boxCode);
      setBoxCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Nova Coleta</h1>
          <p className="text-blue-100">Módulo: Montar Pedido</p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
          <p className="text-sm font-semibold text-gray-800">📍 Instruções:</p>
          <p className="text-xs text-gray-700 mt-2">
            Pegue a caixa conforme a <strong>SEQUÊNCIA DE PICKING</strong> e bipe a papeleta.
          </p>
        </div>

        {/* Box Counter */}
        <div className="bg-blue-100 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-gray-700 mb-2">Caixas no Carrinho</p>
          <div className="text-4xl font-bold text-blue-600">{boxCount}/2</div>
          <p className="text-xs text-gray-600 mt-2">Limite máximo: 2 caixas</p>
        </div>

        {/* Barcode Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Código da Papeleta
            </label>
            <input
              type="text"
              value={boxCode}
              onChange={(e) => setBoxCode(e.target.value)}
              placeholder="Bipe o código da caixa"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-mono font-bold"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">💡 Laser ativado - Bipe a papeleta</p>
          </div>

          <button
            onClick={handleScan}
            disabled={!boxCode.trim() || boxCount >= 2}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-4 rounded-lg transition-colors text-lg"
          >
            ✓ Confirmar Caixa
          </button>

          {boxCount >= 2 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-sm text-red-700 font-semibold">⚠️ Limite de caixas atingido!</p>
              <p className="text-xs text-red-600 mt-1">Finalize a coleta antes de pegar mais caixas.</p>
            </div>
          )}
        </div>

        {/* Sequence Example */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-700 mb-3">📋 Sequência de Picking:</p>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs font-bold">1</span>
              <span>Caixa 06772401 - TAG VERDE</span>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs font-bold">2</span>
              <span>Caixa 06772402 - TAG AZUL</span>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs font-bold">3</span>
              <span>Caixa 06772403 - TAG ROSA</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onBack}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

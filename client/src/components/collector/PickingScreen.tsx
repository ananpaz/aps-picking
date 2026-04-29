import { useState } from "react";

interface PickingScreenProps {
  boxId: string;
  onFinish: () => void;
  onBack: () => void;
}

interface PickingItem {
  id: string;
  reference: string;
  color: string;
  size: string;
  quantity: number;
  location: string;
  collected: number;
}

export default function PickingScreen({ boxId, onFinish, onBack }: PickingScreenProps) {
  const [itemIndex, setItemIndex] = useState(0);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const items: PickingItem[] = [
    {
      id: "1",
      reference: "A02.01.4A",
      color: "Azul",
      size: "18",
      quantity: 2,
      location: "C37.09.6B",
      collected: 0,
    },
    {
      id: "2",
      reference: "B05.03.2C",
      color: "Vermelho",
      size: "16",
      quantity: 1,
      location: "C38.12.4A",
      collected: 0,
    },
    {
      id: "3",
      reference: "C12.07.5D",
      color: "Verde",
      size: "20",
      quantity: 3,
      location: "C39.05.2B",
      collected: 0,
    },
  ];

  const currentItem = items[itemIndex];
  const progress = ((itemIndex + 1) / items.length) * 100;

  const handleScan = () => {
    if (!barcodeInput.trim()) return;

    // Simular validação
    if (barcodeInput === "VALID") {
      setError(null);
      if (itemIndex < items.length - 1) {
        setItemIndex(itemIndex + 1);
      } else {
        onFinish();
      }
    } else if (barcodeInput === "ERROR1") {
      setError("SKU não pertence à caixa");
    } else if (barcodeInput === "ERROR2") {
      setError("Peça sem saldo");
    } else {
      setError("Código inválido");
    }

    setBarcodeInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Progress */}
        <div className="bg-blue-600 text-white rounded-lg p-4 mb-4 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold">Picking</h1>
            <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
              {itemIndex + 1}/{items.length}
            </span>
          </div>
          <div className="bg-blue-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-400 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-100 mt-2">Caixa: {boxId}</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg mb-4 animate-pulse">
            <p className="text-red-800 font-bold text-lg">⚠️ ERRO</p>
            <p className="text-red-700 font-semibold">{error}</p>
            <p className="text-xs text-red-600 mt-2">Confirme para continuar</p>
          </div>
        )}

        {/* Product Information */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4 shadow-md">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">📦</div>
            <p className="text-xs text-gray-500">Próximo item</p>
          </div>

          {/* Location - Large and Bold */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4 text-center">
            <p className="text-xs text-gray-600 mb-1">Localização</p>
            <p className="text-4xl font-bold text-yellow-700 font-mono">
              {currentItem.location.split(".").join(" . ")}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Corredor . Seção . Posição/Nível
            </p>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-xs text-gray-600">Referência</p>
              <p className="font-bold text-sm text-blue-700">{currentItem.reference}</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-xs text-gray-600">Cor</p>
              <p className="font-bold text-sm text-green-700">{currentItem.color}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-xs text-gray-600">Tamanho</p>
              <p className="font-bold text-sm text-purple-700">{currentItem.size}</p>
            </div>
            <div className="bg-red-50 p-3 rounded">
              <p className="text-xs text-gray-600">Quantidade</p>
              <p className="font-bold text-sm text-red-700">{currentItem.quantity} un.</p>
            </div>
          </div>
        </div>

        {/* Barcode Input */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bipe a Peça
            </label>
            <input
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleScan()}
              placeholder="Aguardando leitura..."
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-mono font-bold bg-yellow-50"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">💡 Laser ativado</p>
          </div>

          <button
            onClick={handleScan}
            disabled={!barcodeInput.trim()}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-4 rounded-lg transition-colors"
          >
            ✓ Confirmar Leitura
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-3 rounded-lg transition-colors text-sm">
            Item em Falta
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-3 rounded-lg transition-colors text-sm">
            Divergência
          </button>
        </div>

        {/* Test Buttons (for demo) */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 font-semibold mb-2">🧪 Teste (demo):</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setBarcodeInput("VALID");
                setTimeout(() => handleScan(), 100);
              }}
              className="bg-green-500 text-white text-xs py-2 rounded font-bold"
            >
              ✓ OK
            </button>
            <button
              onClick={() => {
                setBarcodeInput("ERROR1");
                setTimeout(() => handleScan(), 100);
              }}
              className="bg-red-500 text-white text-xs py-2 rounded font-bold"
            >
              ✗ Erro 1
            </button>
            <button
              onClick={() => {
                setBarcodeInput("ERROR2");
                setTimeout(() => handleScan(), 100);
              }}
              className="bg-red-500 text-white text-xs py-2 rounded font-bold"
            >
              ✗ Erro 2
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

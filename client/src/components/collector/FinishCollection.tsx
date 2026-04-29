import { useState } from "react";

interface FinishCollectionProps {
  boxId: string;
  onContinue: () => void;
  onBackToMenu: () => void;
}

export default function FinishCollection({ boxId, onContinue, onBackToMenu }: FinishCollectionProps) {
  const [confirmCode, setConfirmCode] = useState("");
  const [status, setStatus] = useState<"success" | "partial" | null>(null);

  const handleConfirm = () => {
    if (confirmCode.trim()) {
      setStatus("success");
      setTimeout(() => {
        onContinue();
      }, 2000);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-bounce">✓</div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Caixa Finalizada!</h1>
          <p className="text-green-600 mb-6">Operação concluída com sucesso</p>
          <p className="text-sm text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold">Finalizar Coleta</h1>
          <p className="text-blue-100 mt-2">Caixa: {boxId}</p>
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-lg p-6 mb-6 text-center">
          <div className="text-5xl mb-3">✓</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">CAIXA FINALIZADA</h2>
          <p className="text-green-600 font-semibold">Todas as peças foram coletadas!</p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-2">📍 Próximos Passos:</p>
          <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
            <li>Bipe a papeleta para confirmar o fechamento</li>
            <li>Coloque a caixa no local demarcado</li>
            <li>Respeite o limite de altura (4 caixas 12)</li>
          </ol>
        </div>

        {/* Destination Info */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-xs text-gray-600 mb-1">Tipo de Tarja</p>
            <p className="text-lg font-bold text-blue-700">🟢 TAG VERDE</p>
            <p className="text-xs text-gray-600 mt-1">Destino: Setor de Expedição</p>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirme com a Papeleta
            </label>
            <input
              type="text"
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleConfirm()}
              placeholder="Bipe a papeleta"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg font-mono font-bold"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">💡 Laser ativado</p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!confirmCode.trim()}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-4 rounded-lg transition-colors text-lg"
          >
            ✓ Confirmar Fechamento
          </button>

          <button
            onClick={() => setStatus("partial")}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            💾 Salvar como Parcial
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={onBackToMenu}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}

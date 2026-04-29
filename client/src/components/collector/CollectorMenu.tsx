interface CollectorMenuProps {
  collectorName: string;
  onStartCollection: () => void;
  onBack: () => void;
}

export default function CollectorMenu({ collectorName, onStartCollection, onBack }: CollectorMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">Bem-vindo!</h1>
          <p className="text-blue-100">{collectorName}</p>
          <p className="text-xs text-blue-200 mt-2">Turno: 1º Turno</p>
        </div>

        {/* Menu Options */}
        <div className="space-y-4">
          <button
            onClick={onStartCollection}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 text-lg"
          >
            <div className="text-3xl mb-2">📦</div>
            <div>1. Montar Pedido</div>
            <div className="text-xs text-green-100 mt-1">Iniciar nova coleta</div>
          </button>

          <button
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 text-lg"
          >
            <div className="text-3xl mb-2">🔄</div>
            <div>2. Reabrir Caixa</div>
            <div className="text-xs text-yellow-100 mt-1">Retomar coleta parcial</div>
          </button>

          <button
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 text-lg"
          >
            <div className="text-3xl mb-2">🔍</div>
            <div>3. Consultar Estoque</div>
            <div className="text-xs text-purple-100 mt-1">Localizar SKU</div>
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={onBack}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

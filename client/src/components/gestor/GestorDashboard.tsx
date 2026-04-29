interface GestorDashboardProps {
  onBack: () => void;
}

export default function GestorDashboard({ onBack }: GestorDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Operacional</h1>
            <p className="text-gray-600 mt-1">Monitoramento em Tempo Real - Picking</p>
          </div>
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            ← Voltar
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Caixas Finalizadas</p>
            <p className="text-4xl font-bold text-green-600">42</p>
            <p className="text-xs text-gray-500 mt-2">↑ 12% vs. ontem</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Caixas em Andamento</p>
            <p className="text-4xl font-bold text-blue-600">18</p>
            <p className="text-xs text-gray-500 mt-2">Coletores ativos: 8</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Caixas Parciais</p>
            <p className="text-4xl font-bold text-yellow-600">5</p>
            <p className="text-xs text-gray-500 mt-2">Aguardando restoque</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">Taxa de Erro</p>
            <p className="text-4xl font-bold text-red-600">2.3%</p>
            <p className="text-xs text-gray-500 mt-2">Divergências detectadas</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Productivity Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Produtividade por Coletor</h2>
            <div className="space-y-3">
              {[
                { name: "João Silva", boxes: 12, color: "bg-blue-500" },
                { name: "Maria Santos", boxes: 10, color: "bg-green-500" },
                { name: "Pedro Costa", boxes: 8, color: "bg-yellow-500" },
                { name: "Ana Oliveira", boxes: 7, color: "bg-purple-500" },
              ].map((collector, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="w-32 text-sm font-semibold text-gray-700">{collector.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className={`${collector.color} h-full flex items-center justify-end pr-2`}
                      style={{ width: `${(collector.boxes / 12) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{collector.boxes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divergence Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Divergências Detectadas</h2>
            <div className="space-y-3">
              {[
                { type: "SKU não encontrado", count: 8, color: "bg-red-500" },
                { type: "Peça avariada", count: 5, color: "bg-orange-500" },
                { type: "Erro de bipagem", count: 3, color: "bg-yellow-500" },
                { type: "Peça sem saldo", count: 2, color: "bg-purple-500" },
              ].map((div, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="w-40 text-sm font-semibold text-gray-700">{div.type}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className={`${div.color} h-full flex items-center justify-end pr-2`}
                      style={{ width: `${(div.count / 8) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{div.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Collections Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Coletas em Andamento</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Caixa</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Coletor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Progresso</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { box: "06772401", collector: "João Silva", status: "Em andamento", progress: 75, time: "12 min" },
                  { box: "06772402", collector: "Maria Santos", status: "Em andamento", progress: 50, time: "8 min" },
                  { box: "06772403", collector: "Pedro Costa", status: "Parcial", progress: 60, time: "15 min" },
                  { box: "06772404", collector: "Ana Oliveira", status: "Em andamento", progress: 90, time: "18 min" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{row.box}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.collector}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === "Em andamento" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${row.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"users" | "locations" | "config" | "logs">("users");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
            <p className="text-gray-600 mt-1">Configuração e Gerenciamento do Sistema</p>
          </div>
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            ← Voltar
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-300">
          {[
            { id: "users", label: "👥 Usuários", icon: "👥" },
            { id: "locations", label: "📍 Endereçamentos", icon: "📍" },
            { id: "config", label: "⚙️ Configurações", icon: "⚙️" },
            { id: "logs", label: "📋 Auditoria", icon: "📋" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Gerenciamento de Usuários</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                  + Novo Usuário
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Perfil</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: "João Silva", profile: "Coletor", status: "Ativo" },
                      { name: "Maria Santos", profile: "Coletor", status: "Ativo" },
                      { name: "Pedro Costa", profile: "Supervisor", status: "Ativo" },
                      { name: "Ana Oliveira", profile: "Gestor", status: "Ativo" },
                      { name: "Carlos Admin", profile: "Administrador", status: "Ativo" },
                    ].map((user, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{user.profile}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                          <button className="text-red-600 hover:text-red-800">Desativar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === "locations" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mapa do Armazém</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                  + Novo Endereço
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { corredor: "C37", secoes: 15, posicoes: 120, nivel: 6 },
                  { corredor: "C38", secoes: 12, posicoes: 96, nivel: 6 },
                  { corredor: "C39", secoes: 18, posicoes: 144, nivel: 8 },
                  { corredor: "C40", secoes: 10, posicoes: 80, nivel: 5 },
                ].map((loc, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Corredor {loc.corredor}</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Seções</p>
                        <p className="text-xl font-bold text-blue-600">{loc.secoes}</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Posições</p>
                        <p className="text-xl font-bold text-green-600">{loc.posicoes}</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Níveis</p>
                        <p className="text-xl font-bold text-purple-600">{loc.nivel}</p>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Total SKUs</p>
                        <p className="text-xl font-bold text-yellow-600">342</p>
                      </div>
                    </div>
                    <button className="w-full text-blue-600 hover:text-blue-800 text-sm font-semibold">
                      Editar Corredor →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Config Tab */}
          {activeTab === "config" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Configurações do Sistema</h2>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Operacional</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-700">Máximo de caixas no carrinho:</label>
                      <input type="number" defaultValue="2" className="w-20 px-2 py-1 border border-gray-300 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-700">Altura máxima de empilhamento:</label>
                      <input type="number" defaultValue="4" className="w-20 px-2 py-1 border border-gray-300 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-700">Timeout de sessão (minutos):</label>
                      <input type="number" defaultValue="30" className="w-20 px-2 py-1 border border-gray-300 rounded" />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Integração ERP</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-700">URL do ERP:</label>
                      <input
                        type="text"
                        defaultValue="https://erp.empresa.com.br"
                        className="flex-1 ml-4 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-700">API Key:</label>
                      <input
                        type="password"
                        defaultValue="••••••••••••"
                        className="flex-1 ml-4 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                  Salvar Configurações
                </button>
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === "logs" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Logs de Auditoria</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Data/Hora</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Usuário</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Ação</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { time: "2026-04-29 14:05:32", user: "João Silva", action: "Login", details: "Coletor - Turno 1" },
                      { time: "2026-04-29 14:03:15", user: "Maria Santos", action: "Coleta Finalizada", details: "Caixa 06772401" },
                      { time: "2026-04-29 13:58:42", user: "Pedro Costa", action: "Erro de Bipagem", details: "SKU não encontrado" },
                      { time: "2026-04-29 13:45:20", user: "Admin", action: "Configuração Alterada", details: "Timeout de sessão" },
                    ].map((log, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-mono text-xs">{log.time}</td>
                        <td className="px-6 py-4 text-gray-700">{log.user}</td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">{log.action}</td>
                        <td className="px-6 py-4 text-gray-600">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Efectos de fondo para mantener la estética del portfolio */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />

      <div className="text-center relative z-10">
        {/* Número 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent animate-bounce">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        </div>

        {/* Mensaje en Español */}
        <div className="mb-8 px-4">
          <h2 className="text-3xl font-semibold text-white mb-4">
            ¡Oops! Página no encontrada
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            La página que buscas puede haber sido movida, eliminada o nunca existió.
          </p>
        </div>

        {/* Ilustración / Icono */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 backdrop-blur-xl shadow-xl">
            <div className="text-6xl animate-pulse">🔍</div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-md"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Volver
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            <Home size={20} />
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
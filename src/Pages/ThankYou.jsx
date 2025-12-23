import React, { useEffect } from "react";
import { CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ThankYouPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Efectos de fondo para consistencia visual */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />

      <div className="text-center relative z-10" data-aos="zoom-in">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#6366f1] blur-2xl opacity-30 animate-pulse" />
            <CheckCircle className="w-20 h-20 text-[#6366f1] relative z-10" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          ¡Muchas Gracias!
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md mx-auto leading-relaxed">
          Tu mensaje ha sido recibido con éxito. Me pondré en contacto contigo lo antes posible.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-2xl font-bold transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
        >
          <Home className="w-5 h-5" />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
import React, { useState, useEffect } from "react";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Enviando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const formSubmitUrl = 'https://formsubmit.co/gonzaloast8@gmail.com'; 
      await axios.post(formSubmitUrl, formData);

      Swal.fire({
        title: '¡Enviado!',
        text: 'Tu mensaje ha sido recibido con éxito.',
        icon: 'success',
        confirmButtonColor: '#10b981',
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'No se pudo enviar. Intenta de nuevo.', icon: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" id="Contact">
      <div className="text-center mb-16" data-aos="fade-down">
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Contacto
        </h2>
        <p className="text-gray-400 mt-4 text-lg">¿Hablamos? Estoy listo para nuevos proyectos.</p>
      </div>

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl" data-aos="zoom-in">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nombre */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              type="text" name="name" placeholder="Tu Nombre"
              value={formData.name} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              type="email" name="email" placeholder="Tu Correo"
              value={formData.email} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          {/* Mensaje */}
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
            <textarea
              name="message" placeholder="¿En qué puedo ayudarte?"
              value={formData.message} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 h-40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
              required
            />
          </div>

          <button
            type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-6">Encuéntrame también en</p>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("El enlace de la demo no está disponible actualmente.");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Los detalles de este proyecto no están disponibles.");
    }
  };
  

  return (
    <div className="group relative w-full h-full"> {/* h-full para que todas midan lo mismo en el grid */}
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/20 flex flex-col">
        
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10 flex flex-col h-full">
          {/* CONTENEDOR DE IMAGEN: Altura fija y object-cover */}
          <div className="relative overflow-hidden rounded-lg h-48 w-full flex-shrink-0"> 
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* CONTENEDOR DE TEXTO: flex-grow para empujar los botones siempre al fondo */}
          <div className="mt-4 space-y-3 flex-grow flex flex-col">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 bg-clip-text text-transparent line-clamp-1">
              {Title}
            </h3>
            
            {/* line-clamp-3 asegura que la descripción siempre ocupe el mismo espacio visual */}
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3 flex-grow">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between mt-auto">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo no disponible</span>
              )}

              <Link
                to={`/project/${id}`}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 border border-white/5 hover:border-emerald-500/30"
              >
                <span className="text-sm font-medium">Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
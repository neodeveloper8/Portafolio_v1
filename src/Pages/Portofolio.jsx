import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// ==========================================
// 1. TUS PROYECTOS (Edita aquí)
// ==========================================
const myProjects = [
  {
    id: 1,
    Title: "E-commerce App",
    Description: "Frontend de e-commerce desarrollado con React + TypeScript, enfocado en buenas prácticas, arquitectura modular y experiencia de usuario moderna.",
    Img: "/ShopSphere.png",
    Link: "https://shop-sphere-seven-rho.vercel.app/",
    Github: "https://github.com/neodeveloper8/shop-sphere.git",

    TechStack: ["React", "Tailwind", "JavaScript"], 
    Features: ["Tienda online completa", "Listado de productos y detalles", "Carrito de compras", "Proceso de checkout"]
    },
  {
    id: 2,
    Title: "Invitación Digital Interactiva para Fiesta de Cumpleaños",
    Description: "Invitación digital personalizada con animaciones y música de fondo para una fiesta de cumpleaños especial. Incluye efectos visuales avanzados. Formulario con persistencia en base de datos.Integracion con Google Maps y controles de audio. Desarrollada con enfoque responsivo y experiencia de usuario inmersiva ideal para eventos sociales modernos",

    Img: "/Invi_fondo.png",
    Link: "https://invitacion-fiesta-gonzalo.vercel.app/",
    Github: "https://github.com/neodeveloper8/invitacion-fiesta-gonzalo.git",
    TechStack: ["HTML5", "CSS3", "JavaScript","Web Audio API" ],
    Features: ["Efectos estroboscópicos sincronizados simulando ambiente de discoteca", " Fondos animados con transiciones suaves", "Reproductor de audio integrado con controles personalizados", "Redirección directa a ubicación exacta del evento"]
  },
  {
    id: 3,
    Title: "FoodScrap – API de Comparación Gastronómica",
    Description: "FoodScrap es una API RESTful desarrollada con .NET 8 que permite comparar platos similares ofrecidos por distintos restaurantes dentro de una zona geográfica específica. El sistema está diseñado para centralizar información gastronómica, facilitar la toma de decisiones del usuario y ofrecer transparencia en precios, categorías y valoraciones.",
    Img: "/FS.png",
    Link: "https://github.com/neodeveloper8/FoodScrapAPI.git",
    Github: "https://github.com/neodeveloper8/FoodScrapAPI.git",
    TechStack: [".NET 8", "SQL", "Swagger","Git","ClosedXML" ],
    Features: ["Registro e inicio de sesión de usuarios", "Protección de endpoints mediante JWT", "CRUD de platos asociados a restaurantes", "Visualizacion detallada con precios y descripcion","Asociacion por categorias","Filtro de categorias","Comparacion de platos","Visualizacion de precios y restaurantes"]
  },

  {
    id: 4,
    Title: "Full Stack ERP System",
    Description: "Sistema de planificación de recursos empresariales (ERP) diseñado para centralizar la gestión de inventarios y usuarios. Implementa una arquitectura moderna Monorepo que integra el CMS directamente en la aplicación para eliminar latencia.",
    Img: "/payload.png", // 📸 
    Link: "https://erp-gonzalo-sierra.vercel.app/", // l
    Github: "https://github.com/neodeveloper8/PayloadCMS1.git", // 
    TechStack: ["Next.js 14", "Payload CMS 3.0", "TypeScript", "MongoDB", "Tailwind CSS"],
    Features: [
      "Arquitectura Monorepo (Frontend + Backend unificados)",
      "Autenticación segura via HttpOnly Cookies",
      "Control de Acceso Basado en Roles (RBAC: Admin vs User)",
      "Panel administrativo autogenerado y API RESTful",
      "Persistencia de datos en la nube con MongoDB Atlas"
    ]
}
];

// ==========================================
// 2. CERTIFICADOS
// ==========================================
const myCertificates = [
  { id: 1, Img: "/CERTIFICADO_excel.png" },
  { id: 2, Img: "/certicado_ingles_B1.png" },
  { id: 3, Img: "/Leansixsigma.png" },
  { id: 4, Img: "/Cultural.png" },
];

// ==========================================
// 3. TUS TECNOLOGÍAS
// ==========================================
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button onClick={onClick} className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden">
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "Ver Menos" : "Ver Más"}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}>
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return { id: `full-width-tab-${index}`, "aria-controls": `full-width-tabpanel-${index}` };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
    // Guardamos tus datos en el storage para que los contadores funcionen
    localStorage.setItem("projects", JSON.stringify(myProjects));
    localStorage.setItem("certificates", JSON.stringify(myCertificates));
  }, []);

  const handleChange = (event, newValue) => setValue(newValue);

  const displayedProjects = showAllProjects ? myProjects : myProjects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? myCertificates : myCertificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          Mi Portafolio
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explora mi trayectoria a través de proyectos, certificaciones y experiencia técnica. Cada sección representa un hito en mi camino de aprendizaje continuo.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", position: "relative", overflow: "hidden", "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)", backdropFilter: "blur(10px)", zIndex: 0 } }} className="md:px-4">
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" variant="fullWidth" sx={{ minHeight: "70px", "& .MuiTab-root": { fontSize: { xs: "0.8rem", md: "1rem" }, fontWeight: "600", color: "#94a3b8", textTransform: "none", transition: "all 0.4s", borderRadius: "12px", margin: "8px", "&.Mui-selected": { color: "#fff", background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))" } }, "& .MuiTabs-indicator": { height: 0 } }}>
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Proyectos" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificados" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Habilidades" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <CardProject Img={project.Img} Title={project.Title} Description={project.Description} Link={project.Link} id={project.id} />
                </div>
              ))}
            </div>
            {myProjects.length > initialItems && (
              <div className="mt-6 flex justify-center">
                <ToggleButton onClick={() => setShowAllProjects(!showAllProjects)} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((cert, index) => (
                <div key={cert.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <Certificate ImgSertif={cert.Img} />
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pb-10">
              {techStacks.map((stack, index) => (
                <div key={index} data-aos="zoom-in" data-aos-delay={index * 50}>
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
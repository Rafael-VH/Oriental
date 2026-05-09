// ============================================
// DATA LAYER - Default Data / Factory Preset
// ============================================

import type { GeneralSettings, Section, AppState } from '@/domain/types';

export const defaultGeneral: GeneralSettings = {
  studioName: 'Estudio Fotográfico Oriental',
  logo: '',
  phone: '+573001234567',
  whatsappNumber: '573001234567',
  email: 'info@estudiooriental.com',
  address: 'Calle 123 #45-67, Centro Comercial El Oriental, Local 12, Bogotá',
  socialMedia: {
    instagram: 'https://instagram.com/estudiooriental',
    facebook: 'https://facebook.com/estudiooriental',
  },
  primaryColor: '#D4A056',
  autoScrollInterval: 7,
  pin: '1234',
};

export const defaultSections: Section[] = [
  {
    id: 1,
    title: 'ESTUDIO FOTOGRÁFICO ORIENTAL',
    subtitle: 'Capturando momentos con elegancia y tradición desde 1985',
    backgroundImage: '/hero-bg.jpg',
    content: {
      ctaText: 'Contáctanos por WhatsApp',
      whatsappMessage: 'Hola, me interesa conocer más sobre sus servicios fotográficos',
      showLogo: true,
    },
    isVisible: true,
    lastModified: Date.now(),
  },
  {
    id: 2,
    title: 'Nuestros Servicios',
    subtitle: 'Soluciones fotográficas para cada momento de su vida',
    backgroundImage: '/services-bg.jpg',
    content: {
      services: [
        {
          id: 'svc-1',
          name: 'Retratos Profesionales',
          description: 'Sesiones individuales para ejecutivos, modelos y profesionales. Iluminación de estudio y edición profesional incluida.',
          icon: 'Camera',
        },
        {
          id: 'svc-2',
          name: 'Eventos Sociales',
          description: 'Cobertura completa de bodas, quinceañeras, bautizos y celebraciones. Fotografía y video profesional.',
          icon: 'Users',
        },
        {
          id: 'svc-3',
          name: 'Fotografía Corporativa',
          description: 'Imágenes para empresas: productos, instalaciones, equipo y eventos corporativos.',
          icon: 'Building2',
        },
        {
          id: 'svc-4',
          name: 'Sesiones Familiares',
          description: 'Capturamos la esencia de su familia en sesiones íntimas y memorables en estudio o exterior.',
          icon: 'Heart',
        },
      ],
    },
    isVisible: true,
    lastModified: Date.now(),
  },
  {
    id: 3,
    title: 'Tamaños de Impresión',
    subtitle: 'Despegue su foto favorita en el formato perfecto',
    backgroundImage: '/prints-bg.jpg',
    content: {
      printSizes: [
        { id: 'ps-1', name: '3.5 x 5 cm', width: 3.5, height: 5, unit: 'cm', price: 2500 },
        { id: 'ps-2', name: '5 x 7 cm', width: 5, height: 7, unit: 'cm', price: 3500 },
        { id: 'ps-3', name: '10 x 15 cm', width: 10, height: 15, unit: 'cm', price: 5000 },
        { id: 'ps-4', name: '15 x 20 cm', width: 15, height: 20, unit: 'cm', price: 8000 },
        { id: 'ps-5', name: '20 x 30 cm', width: 20, height: 30, unit: 'cm', price: 15000 },
        { id: 'ps-6', name: '30 x 40 cm', width: 30, height: 40, unit: 'cm', price: 28000 },
        { id: 'ps-7', name: '50 x 70 cm', width: 50, height: 70, unit: 'cm', price: 55000 },
      ],
    },
    isVisible: true,
    lastModified: Date.now(),
  },
  {
    id: 4,
    title: 'Fotos para Trámites',
    subtitle: 'Documentos oficiales con especificaciones precisas',
    backgroundImage: '/documents-bg.jpg',
    content: {
      documents: [
        {
          id: 'doc-1',
          name: 'Visa Americana',
          requirements: 'Fondo blanco, 5x5cm, sin sonrisa, vista frontal',
          price: 18000,
          processingTime: '10 minutos',
          icon: 'FileText',
        },
        {
          id: 'doc-2',
          name: 'Pasaporte',
          requirements: 'Fondo blanco, 4x5cm, expresión neutra',
          price: 15000,
          processingTime: '10 minutos',
          icon: 'FileText',
        },
        {
          id: 'doc-3',
          name: 'Cédula de Ciudadanía',
          requirements: 'Fondo blanco, 3x4cm, sin accesorios',
          price: 12000,
          processingTime: '15 minutos',
          icon: 'FileText',
        },
        {
          id: 'doc-4',
          name: 'Licencia de Conducción',
          requirements: 'Fondo blanco, 3x4cm, vista frontal',
          price: 12000,
          processingTime: '15 minutos',
          icon: 'FileText',
        },
        {
          id: 'doc-5',
          name: 'Visa Schengen',
          requirements: 'Fondo claro, 3.5x4.5cm, sin gafas',
          price: 20000,
          processingTime: '10 minutos',
          icon: 'FileText',
        },
      ],
    },
    isVisible: true,
    lastModified: Date.now(),
  },
  {
    id: 5,
    title: 'Nuestro Portafolio',
    subtitle: 'Un vistazo a nuestra pasión por la fotografía',
    backgroundImage: '/portfolio-bg.jpg',
    content: {
      portfolioImages: [
        { id: 'pf-1', src: '/portfolio-1.jpg', category: 'Retratos', featured: true },
        { id: 'pf-2', src: '/portfolio-2.jpg', category: 'Bodas', featured: false },
        { id: 'pf-3', src: '/portfolio-3.jpg', category: 'Newborn', featured: true },
        { id: 'pf-4', src: '/portfolio-4.jpg', category: 'Corporativo', featured: false },
        { id: 'pf-5', src: '/portfolio-5.jpg', category: 'Arquitectura', featured: false },
        { id: 'pf-6', src: '/portfolio-6.jpg', category: 'Producto', featured: true },
      ],
    },
    isVisible: true,
    lastModified: Date.now(),
  },
  {
    id: 6,
    title: 'Ofertas Especiales',
    subtitle: 'Promociones exclusivas por tiempo limitado',
    backgroundImage: '/offers-bg.jpg',
    content: {
      offers: [
        {
          id: 'off-1',
          title: 'Paquete Familiar Completo',
          description: 'Sesión familiar de 1 hora + 20 fotos digitales editadas + 5 impresiones 10x15cm. Incluye cambio de vestuario.',
          badge: 'POPULAR',
          badgeColor: 'golden',
          originalPrice: 280000,
          promotionalPrice: 199000,
          validityType: 'always',
          conditions: 'Válido de lunes a jueves. Agendamiento previo requerido.',
          whatsappMessage: 'Hola, me interesa el Paquete Familiar Completo por $199.000',
          active: true,
        },
        {
          id: 'off-2',
          title: 'Descuento Estudiantil',
          description: '20% de descuento en fotos para trámites presentando carnet estudiantil vigente.',
          badge: 'ESTUDIANTES',
          badgeColor: 'green',
          originalPrice: 18000,
          promotionalPrice: 14400,
          validityType: 'always',
          conditions: 'Aplica solo para visas y documentos. Carnet vigente requerido.',
          whatsappMessage: 'Hola, quiero usar el descuento estudiantil para fotos de trámites',
          active: true,
        },
        {
          id: 'off-3',
          title: 'Sesión + Impresiones',
          description: 'Sesión profesional individual + 3 impresiones tamaño 20x30cm enmarcadas.',
          badge: 'LIMITADO',
          badgeColor: 'red',
          originalPrice: 350000,
          promotionalPrice: 249000,
          validityType: 'always',
          conditions: 'Promoción válida hasta agotar existencias de marcos.',
          whatsappMessage: 'Hola, me interesa la promoción de Sesión + Impresiones enmarcadas',
          active: true,
        },
      ],
    },
    isVisible: true,
    lastModified: Date.now(),
  },
  {
    id: 7,
    title: 'Visítenos',
    subtitle: 'Estamos aquí para servirle',
    backgroundImage: '/location-bg.jpg',
    content: {
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-74.072!3d4.711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDInMzkuNiJOIDc0wrAwNCcxOS4yIlc!5e0!3m2!1ses!2sco!4v1',
      landmark: 'Centro Comercial El Oriental, Local 12, segundo piso cerca de la entrada principal.',
      schedule: [
        { day: 'Lunes', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'Martes', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'Miércoles', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'Jueves', openTime: '08:00', closeTime: '18:00', closed: false },
        { day: 'Viernes', openTime: '08:00', closeTime: '19:00', closed: false },
        { day: 'Sábado', openTime: '09:00', closeTime: '14:00', closed: false },
        { day: 'Domingo', openTime: '', closeTime: '', closed: true },
      ],
    },
    isVisible: true,
    lastModified: Date.now(),
  },
];

export const defaultAppState: AppState = {
  general: defaultGeneral,
  sections: defaultSections,
  ui: {
    activeDashboardTab: 'general',
    sidebarCollapsed: false,
    unsavedChanges: [],
    previewMode: false,
  },
  auth: {
    isAuthenticated: false,
    loginTimestamp: null,
  },
};

const STORAGE_KEY = 'estudio_oriental_cms';

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultAppState,
        ...parsed,
        general: { ...defaultGeneral, ...parsed.general },
        sections: parsed.sections || defaultSections,
        ui: { ...defaultAppState.ui, ...parsed.ui },
        auth: { ...defaultAppState.auth, ...parsed.auth },
      };
    }
  } catch {
    // ignore parse errors
  }
  return defaultAppState;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

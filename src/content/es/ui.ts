import type { UiContentShape } from '../en/ui'

// Spanish (es_US) interface strings. Same shape as ../en/ui.ts, enforced by
// `satisfies`. Wording follows docs/es-style-guide.md section 5 ("Fixed UI
// strings"); change it there first, then here.
export const uiContent = {
    header: {
        navWork: 'Proyectos',
        navAbout: 'Sobre mí',
        navContact: 'Contacto',
        discussProject: 'Hablemos de tu proyecto',
        ariaPrimaryNav: 'Principal',
        menuOpen: 'Menú',
        menuClose: 'Cerrar'
    },
    footer: {
        ariaEmail: (email: string) => `Escribir a ${email}`,
        ariaLinkedin: 'LinkedIn',
        ariaBehance: 'Behance',
        ariaGithub: 'GitHub',
        ariaFigma: 'Figma Community',
        ariaResume: 'CV',
        ariaFooterLinks: 'Enlaces del pie de página'
    },
    shell: {
        skipToMain: 'Saltar al contenido principal'
    },
    languageSwitch: {
        ariaLabel: 'Idioma',
        switchTo: {
            en: 'Cambiar a inglés',
            es: 'Cambiar a español'
        }
    },
    links: {
        visitLiveSite: 'Ver sitio en vivo',
        opensInNewTab: ' (se abre en una pestaña nueva)'
    },
    trustStrip: {
        ariaLabel: 'Resumen de experiencia'
    },
    notFound: {
        heading: 'Página no encontrada',
        body: 'La página que buscas no existe o fue movida. Usa el botón para volver a un lugar seguro.',
        returnHome: 'Volver al inicio'
    },
    error: {
        heading: 'Algo salió mal',
        body: 'Ocurrió un error inesperado al cargar esta página. Puedes intentarlo de nuevo o volver al inicio.',
        tryAgain: 'Intentar de nuevo',
        returnHome: 'Volver al inicio'
    },
    work: {
        viewCaseStudy: 'Ver caso de estudio',
        backToWork: 'Volver a proyectos',
        theProblem: 'El problema',
        theSolution: 'La solución',
        timeline: 'Duración',
        myRole: 'Mi rol',
        askHeading: '¿Tienes una pregunta?',
        // Anchors match the canonical Spanish H2 headings (Desafío, Mis
        // contribuciones, Resultado, Solución) as slugged by rehype-slug.
        askChips: [
            { label: '¿Qué problema resolvía?', href: '#desafío' },
            { label: '¿Cuál fue tu rol?', href: '#mis-contribuciones' },
            { label: '¿Cómo definiste el éxito?', href: '#resultado' },
            { label: '¿Cuál fue el enfoque?', href: '#solución' }
        ],
        gallery: 'Galería'
    },
    contactPage: {
        recruiterPrefix: '¿Eres reclutador o responsable de contratación? Mira mi ',
        recruiterLink: 'CV',
        recruiterSuffix: '.',
        linkedinLabel: 'LinkedIn'
    },
    resumePage: {
        reachOutCta: 'Escríbeme sobre una vacante',
        downloadCta: 'Descargar CV',
        // PR 14: Spanish PDF, same one-page layout as /resume.pdf.
        pdfHref: '/resume-es.pdf',
        downloadFilename: 'Jose-Leon-CV.pdf'
    },
    contactForm: {
        nameLabel: 'Nombre',
        namePlaceholder: 'Tu nombre',
        emailLabel: 'Email',
        emailPlaceholder: 'email@ejemplo.com',
        supportTypeLabel: 'Tipo de apoyo',
        timelineLabel: 'Plazo',
        selectOne: 'Selecciona una opción',
        budgetLabel: 'Presupuesto o modelo de colaboración',
        optional: '(opcional)',
        budgetPlaceholder: 'p. ej. por proyecto, retainer mensual, rango de $X a $Y',
        messageLabel: 'Mensaje',
        messagePlaceholder: '¿En qué puedo ayudarte?',
        submit: 'Enviar mensaje',
        submitting: 'Enviando...',
        successHeading: '¡Mensaje enviado!',
        successBody: 'Gracias por escribir. Te responderé pronto.',
        sendAnother: 'Enviar otro mensaje',
        errors: {
            generic: 'Algo salió mal. Inténtalo de nuevo.',
            network: 'Algo salió mal. Revisa tu conexión e inténtalo de nuevo.',
            rate_limited: 'Demasiados intentos. Inténtalo de nuevo más tarde.',
            not_configured: 'El formulario de contacto no está configurado.',
            invalid_body: 'La solicitud no es válida.',
            validation: 'Completa todos los campos obligatorios con valores válidos.',
            send_failed: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.'
        }
    }
} as const satisfies UiContentShape

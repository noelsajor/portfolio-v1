import { siteConfig } from '@/lib/site-config'
import type { ContentShape } from '../en/ui'
import type { homeContent as homeContentEn } from '../en/home'

// Spanish (es_US) home page copy. Same shape as ../en/home.ts, enforced by
// `satisfies`. Written for Spanish search intent (desarrollador Shopify
// freelance, diseño UI/UX, desarrollo front-end), not translated line by
// line — see docs/es-style-guide.md. Claims, numbers and hrefs match the
// English source exactly.
export const homeContent = {
    metadata: {
        // Branded <title> pattern mirrors the English one (name — tagline);
        // this is the only home-page string where the em dash is kept.
        title: 'Jose Leon — Diseño de producto e implementación front-end',
        description:
            'Diseñador de producto y desarrollador front-end freelance: ayudo a agencias y equipos a convertir ideas en sitios web y productos listos para producción.'
    },
    hero: {
        eyebrow: 'DISEÑO DE PRODUCTO + IMPLEMENTACIÓN FRONT-END',
        headline: ['De la idea', 'a producción.'],
        supportingText:
            'Ayudo a agencias y equipos digitales a convertir ideas en sitios web y experiencias de producto pulidas y listas para producción, sin tener que coordinar diseñadores y desarrolladores front-end por separado.',
        primaryCta: { label: 'Trabaja conmigo', href: '/contact' },
        secondaryCta: { label: 'Ver mi trabajo', href: '/work' },
        availability: 'Disponible para colaboraciones remotas, white-label y por proyecto.',
        recruiterNote: { label: '¿Eres reclutador o responsable de contratación? Mira mi CV', href: '/resume' }
    },
    trustStrip: {
        points: [
            'Más de 10 años en diseño y producción digital',
            'Shopify, UI/UX y ejecución front-end',
            'Experiencia remota con equipos internacionales',
            'Flujo de trabajo asistido por IA, con revisión humana'
        ]
    },
    services: {
        label: 'EN QUÉ PUEDO AYUDAR',
        heading: 'Un solo aliado para diseño e implementación.',
        intro: 'Trabajo en las partes de un proyecto digital que normalmente se reparten entre varios especialistas, para que los equipos reduzcan la fricción en las entregas y avancen más rápido.',
        items: [
            {
                title: 'Diseño de producto y UX',
                description:
                    'Flujos de usuario, wireframes, estructura de interfaz y experiencias de producto responsive, diseñadas para ser claras y fáciles de implementar.'
            },
            {
                title: 'Sistemas de UI',
                description:
                    'Componentes reutilizables, sistemas de diseño e interfaces pulidas que mantienen la consistencia entre productos y sitios web de marketing.'
            },
            {
                title: 'Implementación front-end',
                description:
                    'Desarrollo front-end responsive y accesible con tecnologías web modernas, cuidando el rendimiento y que el código sea fácil de mantener.'
            },
            {
                title: 'Desarrollo e-commerce',
                description:
                    'Tiendas Shopify y WooCommerce a medida, mejoras de tema, flujos cercanos al checkout y optimización front-end para marcas de e-commerce y agencias aliadas.'
            }
        ]
    },
    featuredWork: {
        heading: 'Proyectos destacados',
        viewAllLabel: 'Ver todo',
        viewAllHref: '/work',
        projectCtaLabel: 'Ver proyecto',
        emptyStateMessage: 'Todavía no hay proyectos destacados. Vuelve pronto.'
    },
    process: {
        label: 'CÓMO TRABAJO',
        heading: 'Un camino directo del concepto al lanzamiento.',
        steps: [
            {
                number: '01',
                title: 'Entender',
                description: 'Aclarar el problema de negocio, las necesidades del usuario, las restricciones técnicas y qué significa terminado.'
            },
            {
                number: '02',
                title: 'Diseñar',
                description:
                    'Construir la estructura, el flujo de usuario y el sistema visual necesarios para que la experiencia sea clara e implementable.'
            },
            {
                number: '03',
                title: 'Implementar',
                description:
                    'Traducir la dirección aprobada en una producción front-end responsive, accesible y fácil de mantener.'
            },
            {
                number: '04',
                title: 'Refinar',
                description:
                    'Probar en distintos dispositivos, resolver inconsistencias, mejorar el rendimiento y preparar la entrega final o el lanzamiento.'
            }
        ]
    },
    whyMe: {
        heading: 'Menos traspasos. Menos gestión. Más responsabilidad.',
        reasons: [
            {
                title: 'Diseño y código en un solo flujo',
                description:
                    'Entiendo tanto la intención visual como las restricciones de implementación, lo que reduce la distancia entre los mockups y la producción.'
            },
            {
                title: 'Hecho para colaborar',
                description:
                    'Puedo trabajar directamente con fundadores, equipos de marketing, diseñadores o equipos de desarrollo sin imponer un proceso rígido.'
            },
            {
                title: 'La agilidad de un equipo pequeño',
                description:
                    'Trabajas directamente con la persona que hace el trabajo, sin capas de gestión de cuentas ni reuniones innecesarias.'
            }
        ]
    },
    // Bloque GEO: respuestas cortas y autocontenidas a lo que una persona (o
    // un buscador con IA) pregunta sobre un freelance antes de escribir.
    // Cada respuesta debe sostenerse sola si se cita fuera de contexto y
    // solo repite hechos que ya están en el sitio. También se emite como
    // FAQPage en JSON-LD en la home.
    faq: {
        heading: 'Preguntas frecuentes',
        items: [
            {
                question: '¿Qué hace Jose Leon?',
                answer: 'Soy diseñador de producto y desarrollador front-end freelance. Diseño flujos de usuario, interfaces y sistemas de diseño, y luego los implemento como front-ends responsive y accesibles, incluyendo tiendas Shopify y WooCommerce a medida.'
            },
            {
                question: '¿Con quién trabajas?',
                answer: 'Con agencias que necesitan soporte de producción white-label, y con equipos digitales, fundadores y equipos de marketing que prefieren que una sola persona se haga cargo del diseño y de la implementación, en lugar de coordinar especialistas por separado.'
            },
            {
                question: '¿Trabajas de forma remota y en qué idiomas?',
                answer: 'Sí. Trabajo de forma remota con equipos internacionales, en inglés y en español, por proyecto o como soporte continuo.'
            },
            {
                question: '¿Cuál es tu stack técnico?',
                answer: 'Figma para diseño; HTML, CSS, TypeScript, React, Next.js, Astro y Tailwind CSS para el front-end; Shopify Online Store 2.0 y Liquid para e-commerce.'
            },
            {
                question: '¿Cómo empiezo un proyecto contigo?',
                answer: 'Envíame un brief corto desde la página de contacto: qué estás construyendo, dónde está atascado y el plazo. Te respondo con el siguiente paso más útil.'
            }
        ]
    },
    finalCTA: {
        heading: '¿Necesitas un par de manos extra que se haga cargo del diseño y de la implementación?',
        body: 'Cuéntame qué estás construyendo, dónde está atascado el proyecto y qué necesita entregar tu equipo.',
        primaryCta: { label: 'Hablemos de tu proyecto', href: '/contact' },
        secondaryLink: { label: 'Escríbeme directamente', href: `mailto:${siteConfig.email}` }
    }
} as const satisfies ContentShape<typeof homeContentEn>

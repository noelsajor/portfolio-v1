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
        title: 'Noelsajor — Diseño de producto e implementación front-end',
        description:
            'Diseñador de producto y desarrollador front-end freelance: ayudo a agencias y equipos a convertir ideas en sitios web y productos listos para producción.'
    },
    hero: {
        // Empty on purpose: the hero drops the eyebrow line (HeroSection skips it when empty).
        eyebrow: '',
        headline: ['De la idea', 'a producción.'],
        supportingText:
            'Diseño y desarrollo sitios web y productos digitales. Una sola persona, de la idea a producción.',
        primaryCta: { label: 'Trabaja conmigo', href: '/contact' },
        secondaryCta: { label: 'Mis proyectos', href: '/work' },
        // Empty on purpose: the Spanish hero drops the availability line (HeroSection skips it when empty).
        availability: '',
        recruiterNote: { label: '¿Eres reclutador? Mira mi CV', href: '/resume' }
    },
    services: {
        // Empty on purpose: the section drops the label and intro (ServicesSection skips them when empty).
        label: '',
        heading: 'Qué hago.',
        intro: '',
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
        emptyStateMessage: 'Todavía no hay proyectos destacados. Vuelve pronto.'
    },
    process: {
        // Empty on purpose: the section drops the label (ProcessSection skips it when empty).
        label: '',
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
        heading: 'Hablas con quien hace el trabajo.',
        comparison: {
            criterionLabel: 'Qué cambia',
            options: ['Conmigo', 'Con varios freelancers', 'Con una agencia'],
            rows: [
                {
                    label: 'Hablas con',
                    cells: ['La persona que diseña y programa', 'Cada especialista por separado', 'Un gestor de cuenta']
                },
                {
                    label: 'Del diseño al código',
                    cells: [
                        'No se pierde nada: lo hace la misma persona',
                        'Tú conectas al diseñador con el developer',
                        'Se traduce internamente y pagas esas horas'
                    ]
                },
                {
                    label: 'Empiezas y validas',
                    cells: [
                        'Empiezas hoy y tienes algo que probar al día siguiente',
                        'Empiezas en semanas y pruebas cuando todo se integra',
                        'Empiezas en semanas y pruebas al cierre de la primera fase'
                    ]
                },
                {
                    label: 'Quién lo coordina',
                    cells: ['Yo', 'Tú', 'La agencia']
                },
                {
                    label: 'Pagas',
                    cells: [
                        'Una sola tarifa, pensada para validar sin una gran inversión',
                        'Varias tarifas que suman rápido',
                        'Tarifa de equipo, más gestión y margen'
                    ]
                },
                {
                    label: 'Inviertes tu tiempo en',
                    cells: ['Revisar y decidir', 'Perseguir entregas y conectar piezas', 'Reuniones de seguimiento y aprobaciones']
                },
                {
                    label: 'Ideal para',
                    cells: [
                        'Pasar de una idea a un producto que se pueda probar, rápido',
                        'Proyectos con especialidades muy definidas',
                        'Proyectos grandes con muchos frentes'
                    ]
                }
            ],
            scrollHint: 'Desliza para ver las otras columnas →',
            note: 'Si lo que necesitas es un producto final extremadamente pulido en su primera versión, o un equipo de cinco personas desde el día uno, hay mejores opciones. Si necesitas pasar de una idea a algo que se pueda probar, probablemente soy la más rápida.'
        }
    },
    // Recomendaciones reales de LinkedIn; las citas originales están en
    // inglés en el perfil, aquí traducidas (el enlace lleva al original).
    testimonials: {
        heading: 'Lo que dicen mis clientes',
        items: [
            {
                quote: 'Jose fue un activo increíble para el equipo. Era puntual y siempre estaba al tanto de sus proyectos. Dedicado, comunicativo y cercano. También nos ayudó a incorporar IA en nuestros proyectos y a simplificar procesos. Un candidato de primer nivel.',
                receivedAt: '2026-10-19',
                name: 'Ethan Barak',
                role: 'CEO, NUUD Pleasures'
            },
            {
                quote: 'Recomiendo mucho a Jose por sus habilidades excepcionales en packaging, branding y otras tareas de diseño gráfico. Durante nuestra colaboración mostró de forma constante un nivel impresionante de creatividad e innovación, aportando ideas frescas a cada proyecto. Su comunicación fue excelente e hizo que todo el proceso fuera fluido y eficiente.',
                receivedAt: '2023-08-04',
                name: 'Bibi Nucci',
                role: 'Cofundadora, Creative Home and Kitchen'
            },
            {
                quote: 'Mejoró muchísimo mi presentación con su creatividad, su atención al detalle y su capacidad para traducir ideas. Jose es un diseñador profesional, puntual y dedicado que entrega trabajo de alta calidad de forma consistente. Espero volver a trabajar con él en el futuro.',
                receivedAt: '2023-06-02',
                name: 'Alex Wanderley',
                role: 'GTM | IoT y visibilidad de activos | OT | Ciberseguridad | Ventas Enterprise'
            },
            {
                quote: 'El trabajo de Jose es excelente. Tiene estilo y elegancia, con gráficos que enganchan. Es muy fácil trabajar con él. En general, fue una experiencia súper positiva.',
                receivedAt: '2021-03-26',
                name: 'Lena Zaritsky',
                role: 'Estratega de Empoderamiento Creativo y emprendedora'
            }
        ]
    },
    faq: {
        heading: 'Preguntas frecuentes',
        items: [
            {
                question: '¿Qué hace Noelsajor?',
                answer: 'Soy un generalista del diseño que crea productos y soluciones digitales. Diseño flujos de usuario, interfaces y sistemas de diseño, y luego los implemento como front-ends responsive y accesibles, incluyendo tiendas Shopify y WooCommerce a medida.'
            },
            {
                question: '¿Con quién trabajas?',
                answer: 'Con fundadores y equipos de marketing que prefieren que una sola persona se haga cargo del diseño y de la implementación en lugar de coordinar especialistas por separado. También trabajo con agencias que necesitan soporte de producción white-label, y con equipos digitales remotos.'
            },
            {
                question: '¿Trabajas de forma remota y en qué idiomas?',
                answer: 'Sí. Trabajo de forma remota con equipos internacionales, en inglés y en español, por proyecto o como soporte continuo.'
            },
            {
                question: '¿Cómo empiezo un proyecto contigo?',
                answer: 'Envíame un brief corto desde la página de contacto: qué estás construyendo o qué quieres construir y el plazo. Te respondo con el siguiente paso más útil.'
            }
        ]
    },
    finalCTA: {
        heading: '¿Tienes un proyecto entre diseño y desarrollo?',
        body: 'Cuéntame qué estás construyendo y te respondo con una propuesta concreta, no con un formulario de descubrimiento.',
        primaryCta: { label: 'Hablemos de tu proyecto', href: '/contact' },
        // Empty label on purpose: the Spanish final CTA drops the email link (FinalCTASection skips it when empty).
        secondaryLink: { label: '', href: `mailto:${siteConfig.email}` }
    }
} as const satisfies ContentShape<typeof homeContentEn>

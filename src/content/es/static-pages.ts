import type { ContentShape } from '../en/ui'
import type {
    aboutContent as aboutContentEn,
    contactContent as contactContentEn,
    resumeContent as resumeContentEn,
    workContent as workContentEn
} from '../en/static-pages'

// Spanish (es_US) copy for the About, Contact, Resume and Work-index pages.
// Shapes enforced against the English modules. Names, roles, seniority,
// timeframes and tool names are identical to the English source; see
// docs/es-style-guide.md section 4.

export const aboutContent = {
    metadata: {
        title: 'Sobre mí',
        description:
            'Diseñador multidisciplinario y especialista en producción front-end: diseño de producto, UI/UX, Shopify e implementación front-end para agencias y equipos digitales.'
    },
    heading: 'Sobre mí',
    paragraphs: [
        'Soy Jose Leon, diseñador multidisciplinario y desarrollador front-end con más de una década de experiencia en branding, UI/UX, e-commerce, productos digitales e implementación web.',
        'Lo que empezó como diseño visual y de marca creció hacia UI/UX e implementación front-end. Trabajo en estrategia, diseño y producción en lugar de pasar el proyecto de un especialista a otro. Eso incluye Shopify: construyo tiendas, temas y secciones Liquid reutilizables para marcas de e-commerce, además de trabajo de UI/UX y front-end fuera del e-commerce.',
        'Uso IA para acelerar la investigación, la documentación y el trabajo de implementación repetitivo. Reviso y adapto cada resultado a los objetivos reales del proyecto, a la marca y a sus restricciones técnicas: el criterio creativo y técnico sigue siendo mío.',
        'Colaboro de forma remota con equipos internacionales (fundadores, equipos de marketing, diseñadores y otros desarrolladores) sin procesos innecesarios de por medio.'
    ]
} as const satisfies ContentShape<typeof aboutContentEn>

export const contactContent = {
    metadata: {
        title: 'Contacto',
        description:
            'Cuéntame qué está construyendo tu equipo. Escríbeme por proyectos freelance, soporte de producción para agencias, trabajo en Shopify o implementación front-end.'
    },
    heading: 'Cuéntame qué está construyendo tu equipo.',
    intro: 'Comparte el proyecto, el cuello de botella o el backlog con el que necesitas ayuda. Te respondo con el siguiente paso más útil.',
    otherChannelsHeading: 'Otros canales'
} as const satisfies ContentShape<typeof contactContentEn>

export const resumeContent = {
    metadata: {
        title: 'CV',
        description:
            'Jose Leon, diseñador multidisciplinario y especialista en producción front-end. Habilidades, experiencia y proyectos seleccionados para reclutadores y responsables de contratación.'
    },
    eyebrow: 'CV',
    name: 'Jose Leon',
    // Also used as Person.jobTitle in JSON-LD (StructuredData.tsx).
    title: 'Diseñador multidisciplinario y especialista en producción front-end',
    intro: 'Para reclutadores y responsables de contratación que evalúan roles por contrato, de corto plazo o permanentes.',
    skillsHeading: 'Habilidades',
    skillGroups: [
        {
            title: 'Diseño',
            skills: ['Figma', 'Diseño UI/UX', 'Diseño responsive', 'Sistemas de diseño', 'Diseño visual']
        },
        {
            title: 'Front-end',
            skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'React', 'Next.js', 'Astro']
        },
        {
            title: 'Commerce',
            skills: [
                'Shopify Online Store 2.0',
                'Liquid',
                'Personalización de temas',
                'Plantillas de producto y colección',
                'Metafields y schema'
            ]
        },
        {
            title: 'Flujo de trabajo',
            skills: [
                'Git y GitHub',
                'Implementación con enfoque en accesibilidad',
                'QA responsive',
                'Producción asistida por IA con revisión manual',
                'Inglés y español'
            ]
        }
    ],
    experienceHeading: 'Experiencia',
    experience: [
        {
            title: 'Marca y sitio web (empresa B2B de IoT)',
            role: 'Diseño UI/UX e implementación front-end (cargo oficial: Graphic Designer)',
            period: '2026, 5 a 6 meses aprox.',
            detail: 'Tiempo completo, remoto. Sistema de identidad de marca y sitio web de producción bilingüe para una empresa de IoT con varias divisiones.'
        },
        {
            title: 'Diseño y construcción de tienda de intimidad (vía agencia de marketing)',
            role: 'Desarrollador Shopify y diseñador UI/UX',
            period: '2025, 6 a 7 meses aprox.',
            detail: 'Rediseño de una tienda Shopify para el relanzamiento de una marca D2C en una categoría de producto con fuertes restricciones publicitarias.'
        }
    ],
    selectedWorkHeading: 'Proyectos destacados',
    seeAllWorkLabel: 'Ver todos los proyectos →',
    githubLabel: 'GitHub →',
    getInTouchHeading: 'Contacto',
    getInTouchIntro: 'Escríbeme directamente sobre una vacante:'
} as const satisfies ContentShape<typeof resumeContentEn>

export const workContent = {
    metadata: {
        title: 'Proyectos',
        description:
            'Proyectos seleccionados de diseño de producto, implementación front-end y desarrollo Shopify: sistemas de marca, sitios web de marketing y tiendas de e-commerce.'
    },
    heading: 'Proyectos',
    intro: 'Una selección de proyectos de diseño de producto, Shopify e implementación front-end: desde sistemas de marca y sitios web de marketing hasta tiendas de e-commerce.',
    emptyStateMessage: 'Todavía no hay proyectos publicados.'
} as const satisfies ContentShape<typeof workContentEn>

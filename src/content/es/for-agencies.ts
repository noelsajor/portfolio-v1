import type { ContentShape } from '../en/ui'
import type { forAgenciesContent as forAgenciesContentEn } from '../en/for-agencies'

// Spanish (es_US) copy for /for-agencies. Highest commercial-intent page:
// written around "soporte white-label para agencias", "producción web para
// agencias" and "desarrollador Shopify" rather than translated line by
// line. See docs/es-style-guide.md. Shape enforced against the English
// module; hrefs unchanged.
export const forAgenciesContent = {
    metadata: {
        title: 'Para agencias',
        description:
            'Soporte white-label en diseño UI/UX, Shopify y front-end para agencias con más trabajo que capacidad de producción, sin capas de gestión.'
    },
    hero: {
        eyebrow: 'PARA AGENCIAS',
        headline: 'Diseño, Shopify y front-end white-label para agencias con más trabajo que capacidad de producción.',
        body: 'Me integro a tu equipo como un par de manos extra para el trabajo de producción (UI/UX, tiendas Shopify e implementación front-end), en modalidad white-label (marca blanca) y sin sumar gestión ni capas de cuentas.',
        primaryCta: { label: 'Hablemos de tu proyecto', href: '/contact' }
    },
    problems: {
        label: 'CUELLOS DE BOTELLA FRECUENTES',
        heading: 'Dónde se les suele acabar la capacidad a las agencias.',
        items: [
            {
                title: 'Traspaso entre diseño y desarrollo',
                description:
                    'Los diseños aprobados se quedan esperando a un desarrollador que los interprete con precisión sin idas y vueltas interminables.'
            },
            {
                title: 'Backlog de proyectos Shopify',
                description:
                    'Construcción de tiendas, personalización de temas y trabajo en secciones se acumulan más rápido de lo que el equipo interno puede absorber.'
            },
            {
                title: 'Entrega white-label',
                description:
                    'El trabajo de cara al cliente tiene que salir con el nombre de tu agencia, sin que se note la costura de un subcontratista.'
            },
            {
                title: 'Soporte de producción con poca antelación',
                description: 'Un proyecto necesita manos adicionales por un período definido, no una contratación de tiempo completo.'
            }
        ]
    },
    services: {
        label: 'EN QUÉ PUEDO AYUDAR',
        heading: 'Soporte de producción en diseño e implementación.',
        items: [
            {
                title: 'Diseño de producto y UX',
                description: 'Wireframes, flujos de usuario y diseño de interfaz para proyectos de tus clientes, listos para que los implemente tu equipo o yo.'
            },
            {
                title: 'Sistemas de UI',
                description: 'Componentes reutilizables y sistemas de diseño para que el trabajo del cliente se mantenga consistente a medida que tu equipo lo escala.'
            },
            {
                title: 'Implementación front-end',
                description: 'Desarrollo front-end responsive y accesible para trabajo de clientes que tiene que salir en tus plazos.'
            },
            {
                title: 'Desarrollo Shopify',
                description: 'Secciones a medida, construcción de temas y rediseños de tiendas, entregados white-label con el nombre de tu agencia.'
            }
        ]
    },
    process: {
        label: 'CÓMO FUNCIONA LA COLABORACIÓN',
        heading: 'Un proceso que encaja dentro del tuyo.',
        steps: [
            { number: '01', title: 'Alcance', description: 'Confirmamos el brief, los plazos y en qué punto de tu flujo de trabajo me integro.' },
            {
                number: '02',
                title: 'Producción',
                description: 'Diseño o implemento el trabajo dentro de tu proceso, tus herramientas y tu estructura de archivos.'
            },
            {
                number: '03',
                title: 'Revisión',
                description: 'Entrego para la revisión de tu equipo; las correcciones se manejan igual que con cualquier otro colaborador.'
            },
            {
                number: '04',
                title: 'Entrega',
                description: 'Sale con el nombre de tu agencia, con trabajo limpio y documentado que tu equipo puede mantener.'
            }
        ]
    },
    proof: {
        heading: 'Proyectos de referencia'
    },
    assurance: {
        heading: 'White-label y confidencial, por defecto.',
        body: 'Es trabajo de producción que hago yo mismo, una sola persona, no un equipo subcontratado. Los nombres de clientes, los detalles de los proyectos y los entregables se mantienen confidenciales salvo que indiques lo contrario, y todo sale con la marca de tu agencia, no con la mía.'
    },
    faq: {
        heading: 'Preguntas frecuentes',
        items: [
            {
                question: '¿Trabajas white-label?',
                answer: 'Sí. El trabajo sale con el nombre de tu agencia. No pido crédito ni atribución de cara al cliente.'
            },
            {
                question: '¿Cómo manejas la confidencialidad?',
                answer: 'No publico nombres de clientes ni detalles de proyectos sin permiso explícito, y no tengo problema en trabajar bajo un NDA.'
            },
            {
                question: '¿Es un equipo o solo tú?',
                answer: 'Soy yo: un diseñador multidisciplinario y desarrollador front-end trabajando solo. Eso significa comunicación directa con la persona que hace el trabajo, no con una capa de gestión de cuentas.'
            },
            {
                question: '¿Cuál es el modelo de colaboración?',
                answer: 'Por proyecto o como soporte de producción continuo, ajustado a lo que necesite tu equipo. Escríbeme con los detalles y te respondo con el siguiente paso más útil.'
            }
        ]
    },
    cta: {
        heading: '¿Tienes un proyecto o un backlog que necesita un par de manos extra?',
        body: 'Cuéntame el alcance, los plazos y dónde necesitas apoyo. Te respondo con el siguiente paso más útil.',
        primaryCta: { label: 'Hablemos de tu proyecto', href: '/contact' }
    }
} as const satisfies ContentShape<typeof forAgenciesContentEn>

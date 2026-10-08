import type { Locale } from '@/lib/i18n'
import { PROJECT_CAPABILITIES, PROJECT_TYPES } from '@/lib/project-schema'

type Capability = (typeof PROJECT_CAPABILITIES)[number]
type ProjectType = (typeof PROJECT_TYPES)[number]

// PR 11: display labels for the project enums. The enum VALUES stay English
// in every locale's frontmatter (they are validated by project-schema.ts,
// drive the /work grouping, and build the `capability-*` section ids); only
// what the visitor reads is localized here. Same pattern as
// SUPPORT_TYPE_LABELS in contact-form-options.ts. Spanish wording:
// docs/es-style-guide.md section 5.
export const CAPABILITY_LABELS: Record<Locale, Record<Capability, string>> = {
    en: {
        'Ecommerce Systems': 'Ecommerce Systems',
        'Brand & Identity': 'Brand & Identity',
        'Custom Websites': 'Custom Websites',
        'Product Experiments': 'Product Experiments'
    },
    es: {
        'Ecommerce Systems': 'Sistemas e-commerce',
        'Brand & Identity': 'Marca e identidad',
        'Custom Websites': 'Sitios web a medida',
        'Product Experiments': 'Experimentos de producto'
    }
}

export const PROJECT_TYPE_LABELS: Record<Locale, Record<ProjectType, string>> = {
    en: {
        'E-commerce': 'E-commerce',
        'Product Design': 'Product Design',
        'Marketing Website': 'Marketing Website',
        'Design System': 'Design System'
    },
    es: {
        'E-commerce': 'E-commerce',
        'Product Design': 'Diseño de producto',
        'Marketing Website': 'Sitio web de marketing',
        'Design System': 'Sistema de diseño'
    }
}

export function capabilityLabel(lang: Locale, capability: Capability): string {
    return CAPABILITY_LABELS[lang][capability]
}

export function projectTypeLabel(lang: Locale, type: ProjectType): string {
    return PROJECT_TYPE_LABELS[lang][type]
}

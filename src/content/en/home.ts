import { siteConfig } from '@/lib/site-config'

export const homeContent = {
    hero: {
        eyebrow: 'PRODUCT DESIGN + FRONT-END IMPLEMENTATION',
        headline: ['From idea', 'to production.'],
        supportingText:
            "I help agencies and digital teams turn ideas into polished, production-ready websites and product experiences—without coordinating separate designers and front-end developers.",
        primaryCta: { label: 'Work With Me', href: '/contact' },
        secondaryCta: { label: 'View My Work', href: '/work' },
        availability: 'Available for remote, white-label and project-based collaborations.',
        recruiterNote: { label: 'Recruiter or hiring manager? See my resume', href: '/resume' }
    },
    trustStrip: {
        points: [
            '10+ years across design and digital production',
            'Shopify, UI/UX and front-end execution',
            'Remote experience with international teams',
            'AI-assisted workflow, human-reviewed output'
        ]
    },
    services: {
        label: 'WHAT I HELP WITH',
        heading: 'One partner across design and implementation.',
        intro: 'I work across the parts of a digital project that are normally divided between several specialists, helping teams reduce handoff friction and move faster.',
        items: [
            {
                title: 'Product & UX Design',
                description:
                    'User flows, wireframes, interface structure and responsive product experiences designed for clarity and practical implementation.'
            },
            {
                title: 'UI Systems',
                description:
                    'Reusable components, design systems and polished interfaces that create consistency across products and marketing websites.'
            },
            {
                title: 'Front-End Implementation',
                description:
                    'Responsive, accessible front-end development using modern web technologies, with attention to maintainability and performance.'
            },
            {
                title: 'E-commerce Development',
                description:
                    'Custom Shopify and WooCommerce storefronts, theme improvements, checkout-adjacent flows, and front-end optimization for e-commerce brands and agency partners.'
            }
        ]
    },
    featuredWork: {
        heading: 'Selected work',
        viewAllLabel: 'See all',
        viewAllHref: '/work',
        projectCtaLabel: 'View Project',
        emptyStateMessage: 'No featured projects yet — check back soon.'
    },
    process: {
        label: 'HOW I WORK',
        heading: 'A direct path from concept to launch.',
        steps: [
            {
                number: '01',
                title: 'Understand',
                description: 'Clarify the business problem, user needs, technical constraints and definition of done.'
            },
            {
                number: '02',
                title: 'Design',
                description:
                    'Build the structure, user flow and visual system needed to make the experience clear and implementable.'
            },
            {
                number: '03',
                title: 'Implement',
                description:
                    'Translate the approved direction into responsive, accessible and maintainable front-end production.'
            },
            {
                number: '04',
                title: 'Refine',
                description:
                    'Test across devices, resolve inconsistencies, improve performance and prepare the final handoff or launch.'
            }
        ]
    },
    whyMe: {
        heading: 'Less handoff. Less management. More ownership.',
        reasons: [
            {
                title: 'Design and code in one workflow',
                description:
                    'I understand both visual intent and implementation constraints, reducing the disconnect between mockups and production.'
            },
            {
                title: 'Built for collaboration',
                description:
                    'I can work directly with founders, marketers, designers or development teams without forcing a rigid process.'
            },
            {
                title: 'Small-team responsiveness',
                description:
                    'You work directly with the person doing the work, without account-management layers or unnecessary meetings.'
            }
        ]
    },
    finalCTA: {
        heading: 'Need an extra pair of hands that can own both design and implementation?',
        body: 'Tell me what you are building, where the project is blocked and what your team needs help delivering.',
        primaryCta: { label: 'Discuss Your Project', href: '/contact' },
        secondaryLink: { label: 'Email me directly', href: `mailto:${siteConfig.email}` }
    }
} as const

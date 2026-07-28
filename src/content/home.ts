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
                title: 'Shopify Development',
                description:
                    'Custom sections, theme improvements, storefront redesigns and front-end optimization for e-commerce brands and agency partners.'
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
    aiWorkflow: {
        label: 'HOW I MOVE FASTER',
        heading: 'AI-assisted execution, without AI-level quality.',
        paragraphs: [
            'I use AI to accelerate research, exploration, documentation, component creation and repetitive implementation work.',
            "Every output is reviewed, refined and adapted to the project's actual goals, brand and technical requirements. The result is a faster workflow without handing creative or technical judgment over to a tool."
        ],
        supportingItems: ['Faster exploration', 'Cleaner documentation', 'Quicker implementation', 'Human-reviewed decisions']
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
    aboutPreview: {
        heading: 'Designer by background. Builder by practice.',
        paragraphs: [
            "I'm Jose Leon, a multidisciplinary designer and front-end developer with more than a decade of experience across branding, UI/UX, e-commerce, digital products and web implementation.",
            'That background allows me to see a project as more than a collection of screens or components. I can help shape the visual direction, understand the user experience and carry the approved idea into production.'
        ],
        cta: { label: 'More About Me', href: '/about' }
    },
    finalCTA: {
        heading: 'Need an extra pair of hands that can own both design and implementation?',
        body: 'Tell me what you are building, where the project is blocked and what your team needs help delivering.',
        primaryCta: { label: 'Discuss Your Project', href: '/contact' },
        secondaryLink: { label: 'Email me directly', href: `mailto:${siteConfig.email}` }
    }
} as const

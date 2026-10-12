import { siteConfig } from '@/lib/site-config'

export const homeContent = {
    // PR 11: page metadata lives with the page copy so a locale can author
    // its own <title>/description. `title` is the full branded title (it
    // bypasses the layout's `%s | Jose Leon` template via title.absolute);
    // it also feeds WebSite.description in StructuredData.
    metadata: {
        title: siteConfig.title,
        description: siteConfig.description
    },
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
        // Comparison table: one column per way of getting the work done.
        // `options[0]` is the highlighted column. `note` renders under the
        // table as the honest "when I'm not the right fit" line.
        comparison: {
            criterionLabel: 'What changes',
            options: ['Working with me', 'Several freelancers', 'An agency'],
            rows: [
                {
                    label: 'Who you talk to',
                    cells: ['The person who designs and codes', 'Each specialist, separately', 'An account manager']
                },
                {
                    label: 'Design-to-dev handoff',
                    cells: ["There isn't one: the same person does both", 'You coordinate it', 'Internal; you pay for it but never see it']
                },
                {
                    label: 'Time to start',
                    cells: ['Days', 'Weeks: finding, hiring and aligning people', 'Weeks: onboarding and process']
                },
                {
                    label: 'Who coordinates',
                    cells: ['Me', 'You', 'The agency, through its management layer']
                },
                {
                    label: 'Cost',
                    cells: [
                        'One rate; no coordination or duplicated hours',
                        'The sum of every rate, plus the time you spend coordinating',
                        'Team rate plus account management and margin'
                    ]
                },
                {
                    label: 'Best for',
                    cells: [
                        'Getting from an idea to a prototype or product you can test and iterate on, fast and with a small upfront investment',
                        'Projects with very well-defined specialties',
                        'Large projects with many fronts at once'
                    ]
                }
            ],
            note: "If you need a flawlessly polished final product in its first version, or a five-person team from day one, there are better options. If you need to get from an idea to something you can put in front of people, I'm probably the fastest way there."
        }
    },
    faq: {
        heading: 'Frequently asked',
        items: [
            {
                question: 'What does Jose Leon do?',
                answer: 'I am a freelance product designer and front-end developer. I design user flows, interfaces and design systems, then implement them as responsive, accessible front-ends, including custom Shopify and WooCommerce storefronts.'
            },
            {
                question: 'Who do you work with?',
                answer: 'Agencies that need white-label production support, and digital teams, founders and marketers who want one person to own both design and implementation instead of coordinating separate specialists.'
            },
            {
                question: 'Do you work remotely, and in which languages?',
                answer: 'Yes. I work remotely with international teams, in English and Spanish, on project-based or ongoing engagements.'
            },
            {
                question: 'What is your technical stack?',
                answer: 'Figma for design; HTML, CSS, TypeScript, React, Next.js, Astro and Tailwind CSS for front-end work; Shopify Online Store 2.0 and Liquid for e-commerce.'
            },
            {
                question: 'How do I start a project with you?',
                answer: 'Send a short brief through the contact page: what you are building, where it is blocked and the timeline. I reply with the most useful next step.'
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

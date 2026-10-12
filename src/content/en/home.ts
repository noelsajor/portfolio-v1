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
        eyebrow: 'PRODUCT DESIGN + IMPLEMENTATION',
        headline: ['From idea', 'to production.'],
        supportingText: 'I design and build websites and digital products. One person, from idea to production.',
        primaryCta: { label: 'Work With Me', href: '/contact' },
        secondaryCta: { label: 'My work', href: '/work' },
        // Empty on purpose: the hero drops the availability line (HeroSection skips it when empty).
        availability: '',
        recruiterNote: { label: 'Recruiter? See my resume', href: '/resume' }
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
        label: 'SERVICES',
        heading: 'What I do.',
        intro: 'I cover everything from the concept to the interface design and the code. Fewer meetings, fewer things lost between the mockup and what ships to production.',
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
        heading: 'Featured projects',
        viewAllLabel: 'View all',
        viewAllHref: '/work',
        projectCtaLabel: 'View project',
        emptyStateMessage: 'No featured projects yet. Check back soon.'
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
        heading: 'You talk to the person doing the work.',
        // Comparison table: one column per way of getting the work done.
        // `options[0]` is the highlighted column. `note` renders under the
        // table as the honest "when I'm not the right fit" line.
        comparison: {
            criterionLabel: 'What changes',
            options: ['Working with me', 'Several freelancers', 'An agency'],
            // Subtitle shown inside the highlighted (first) column.
            highlightTagline: 'One person, from idea to production',
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
            // Shown under the table below md, where the option columns scroll horizontally.
            scrollHint: 'Swipe to see the other columns →',
            note: "If you need a flawlessly polished final product in its first version, or a five-person team from day one, there are better options. If you need to get from an idea to something you can put in front of people, I'm probably the fastest way there."
        }
    },
    faq: {
        heading: 'Frequently asked',
        items: [
            {
                question: 'What does Jose Leon do?',
                answer: 'I am a design generalist who builds digital products and solutions. I design user flows, interfaces and design systems, then implement them as responsive, accessible front-ends, including custom Shopify and WooCommerce storefronts.'
            },
            {
                question: 'Who do you work with?',
                answer: 'Founders and marketing teams who would rather have one person own both design and implementation than coordinate separate specialists. I also work with agencies that need white-label production support, and with remote digital teams.'
            },
            {
                question: 'Do you work remotely, and in which languages?',
                answer: 'Yes. I work remotely with international teams, in English and Spanish, on project-based or ongoing engagements.'
            },
            {
                question: 'How do I start a project with you?',
                answer: 'Send a short brief through the contact page: what you are building or want to build, and the timeline. I reply with the most useful next step.'
            }
        ]
    },
    finalCTA: {
        heading: 'Have a project somewhere between design and development?',
        body: 'Tell me what you are building and I reply with a concrete proposal, not a discovery form.',
        primaryCta: { label: 'Discuss Your Project', href: '/contact' },
        // Empty label on purpose: the final CTA drops the email link (FinalCTASection skips it when empty).
        secondaryLink: { label: '', href: `mailto:${siteConfig.email}` }
    }
} as const

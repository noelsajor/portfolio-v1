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
    // GEO block: short, self-contained answers to the questions people (and
    // AI search engines) ask about a freelancer before they reach out. Each
    // answer must stand alone when quoted out of context and must only
    // restate facts already on the site (resume skills, about paragraphs,
    // trust strip). Also emitted as FAQPage JSON-LD on the home page.
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

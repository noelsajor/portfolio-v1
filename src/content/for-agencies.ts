export const forAgenciesContent = {
    hero: {
        eyebrow: 'FOR AGENCIES',
        headline: 'White-label design, Shopify, and front-end support for agencies with more work than available production capacity.',
        body: 'I plug into your team as an extra pair of hands for production work — UI/UX, Shopify builds, and front-end implementation — without adding management overhead or account layers.',
        primaryCta: { label: 'Discuss a Project', href: '/contact' }
    },
    problems: {
        label: 'COMMON PRODUCTION GAPS',
        heading: 'Where agencies usually run out of capacity.',
        items: [
            {
                title: 'Design-to-dev handoff',
                description:
                    'Approved designs stall waiting for a developer who can interpret them accurately without a long back-and-forth.'
            },
            {
                title: 'Shopify build backlog',
                description:
                    'Storefront builds, theme customization, and section work pile up faster than an in-house team can absorb.'
            },
            {
                title: 'White-label delivery',
                description:
                    "Client-facing work needs to ship under your agency's name, without the client seeing a subcontractor seam."
            },
            {
                title: 'Short-notice production support',
                description: 'A project needs an extra set of hands for a defined stretch, not a new full-time hire.'
            }
        ]
    },
    services: {
        label: 'HOW I CAN HELP',
        heading: 'Production support across design and implementation.',
        items: [
            {
                title: 'Product & UX Design',
                description: 'Wireframes, user flows, and interface design for client projects — ready for your team or mine to implement.'
            },
            {
                title: 'UI Systems',
                description: "Reusable components and design systems so client work stays consistent as your team scales it."
            },
            {
                title: 'Front-End Implementation',
                description: 'Responsive, accessible front-end development for client work that needs to ship on your timeline.'
            },
            {
                title: 'Shopify Development',
                description: "Custom sections, theme builds, and storefront redesigns delivered white-label under your agency's name."
            }
        ]
    },
    process: {
        label: 'HOW COLLABORATION WORKS',
        heading: 'A process that fits inside yours.',
        steps: [
            { number: '01', title: 'Scope', description: 'Confirm the brief, timeline, and where I plug into your existing workflow.' },
            {
                number: '02',
                title: 'Build',
                description: 'Design and/or implement the work inside your process, tools, and file structure.'
            },
            {
                number: '03',
                title: 'Review',
                description: "Deliver for your team's review — revisions handled the same way as any other collaborator."
            },
            {
                number: '04',
                title: 'Handoff',
                description: "Ship under your agency's name, with clean, documented work your team can maintain."
            }
        ]
    },
    assurance: {
        heading: 'White-label and confidential, by default.',
        body: "This is founder-led, solo production work — not a subcontracted team. Client names, project details, and deliverables stay confidential unless you say otherwise, and everything ships under your agency's brand, not mine."
    },
    faq: {
        heading: 'Frequently asked',
        items: [
            {
                question: 'Do you work white-label?',
                answer: "Yes — work ships under your agency's name. I don't require credit or client-facing attribution."
            },
            {
                question: 'How do you handle confidentiality?',
                answer: "I don't publish client names or project details without explicit permission, and I'm comfortable working under an NDA."
            },
            {
                question: 'Is this a team or just you?',
                answer: 'It\'s me — a solo multidisciplinary designer and front-end developer. That means direct communication with the person doing the work, not an account-management layer.'
            },
            {
                question: "What's the engagement model?",
                answer: "Project-based or ongoing production support, scoped to what your team needs. Reach out with the details and I'll respond with the most useful next step."
            }
        ]
    },
    cta: {
        heading: 'Have a project or backlog that needs an extra pair of hands?',
        body: "Tell me the scope, timeline, and where you need support — I'll respond with the most useful next step.",
        primaryCta: { label: 'Discuss a Project', href: '/contact' }
    }
} as const

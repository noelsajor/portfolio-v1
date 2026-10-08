// Plain-text leaves extracted from the about/contact/resume pages — headings,
// standalone paragraphs, section labels, and list/array data. Deliberately
// does NOT include any JSX that contains an interactive element (a <Link>,
// mailto: href, embedded anchor) inline within a sentence, or CTA buttons
// with href/download/data-tracking attributes — those stay in the page
// components as-is; see the "PR 5: contains inline interactive elements"
// comments at each call site.

export const aboutContent = {
    heading: 'About',
    paragraphs: [
        "I’m Jose Leon, a multidisciplinary designer and front-end developer with more than a decade of experience across branding, UI/UX, e-commerce, digital products, and web implementation.",
        'What started as visual and brand design work grew into UI/UX and front-end implementation — I work across strategy, design, and production instead of handing a project between separate specialists. That includes Shopify: I build custom storefronts, themes, and reusable Liquid sections for e-commerce brands, alongside UI/UX and front-end work outside of e-commerce entirely.',
        "I use AI to speed up research, documentation, and repetitive implementation work. Every output is reviewed and adapted to the project’s actual goals, brand, and technical constraints — the creative and technical judgment stays mine.",
        'I collaborate remotely with international teams — founders, marketers, designers, and other developers — without unnecessary process overhead.'
    ]
} as const

export const contactContent = {
    heading: 'Tell me what your team is building.',
    intro: "Share the project, production gap, or backlog you need help with. I'll respond with the most useful next step.",
    otherChannelsHeading: 'Other channels'
} as const

export const resumeContent = {
    eyebrow: 'Resume',
    name: 'Jose Leon',
    title: 'Multidisciplinary Designer & Front-End Production Specialist',
    intro: 'For recruiters and hiring managers evaluating contract, short-term, or permanent roles.',
    skillsHeading: 'Skills',
    skillGroups: [
        {
            title: 'Design',
            skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Design Systems', 'Visual Design']
        },
        {
            title: 'Front End',
            skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'React', 'Next.js', 'Astro']
        },
        {
            title: 'Commerce',
            skills: [
                'Shopify Online Store 2.0',
                'Liquid',
                'Theme Customization',
                'Product & Collection Templates',
                'Metafields & Schema'
            ]
        },
        {
            title: 'Workflow',
            skills: [
                'Git & GitHub',
                'Accessibility-Aware Implementation',
                'Responsive QA',
                'AI-Assisted Production with Manual Review',
                'English and Spanish'
            ]
        }
    ],
    experienceHeading: 'Experience',
    experience: [
        {
            title: 'Brand & Website Build (B2B IoT company)',
            role: 'UI/UX Design & Front-End Implementation (official title: Graphic Designer)',
            period: '2026, ~5–6 months',
            detail: 'Full-time remote. Brand identity system and bilingual production website for a multi-division IoT company.'
        },
        {
            title: 'Intimacy Storefront Design & Build (via marketing agency)',
            role: 'Shopify Developer & UI/UX Designer',
            period: '2025, ~6–7 months',
            detail: 'Shopify storefront redesign for a direct-to-consumer brand relaunch in a heavily ad-restricted product category.'
        }
    ],
    selectedWorkHeading: 'Selected work',
    seeAllWorkLabel: 'See all work →',
    githubLabel: 'GitHub →',
    getInTouchHeading: 'Get in touch',
    getInTouchIntro: 'Reach out directly about a role:'
} as const

// UI chrome copy shared across every page: header nav, footer aria-labels,
// the global 404, the locale error boundary, and (PR 11) every other
// interface string that used to live inline in a component or page —
// skip link, link affordances, case-study page labels, contact-page and
// resume-page CTAs, and the contact form. Page copy (hero, services, about
// paragraphs...) stays in home.ts / static-pages.ts / for-agencies.ts; this
// file is only for strings that are interface, not content.
//
// Every key here must have a Spanish counterpart in ../es/ui.ts with the
// exact same shape — see docs/es-style-guide.md section 5 for the agreed
// Spanish strings.
export const uiContent = {
    header: {
        navWork: 'Work',
        navAbout: 'About',
        navContact: 'Contact',
        discussProject: 'Discuss a Project',
        ariaPrimaryNav: 'Primary'
    },
    footer: {
        ariaEmail: (email: string) => `Email ${email}`,
        ariaLinkedin: 'LinkedIn',
        ariaBehance: 'Behance',
        ariaGithub: 'GitHub',
        ariaFigma: 'Figma Community',
        ariaResume: 'Resume',
        ariaFooterLinks: 'Footer links'
    },
    shell: {
        skipToMain: 'Skip to main content'
    },
    languageSwitch: {
        ariaLabel: 'Language',
        // Keyed by the locale the link switches TO, written in the language
        // of the page the visitor is currently on.
        switchTo: {
            en: 'Switch to English',
            es: 'Switch to Spanish'
        }
    },
    links: {
        visitLiveSite: 'Visit live site',
        // Leading space on purpose: rendered inside an sr-only span directly
        // after the visible link text.
        opensInNewTab: ' (opens in a new tab)'
    },
    trustStrip: {
        ariaLabel: 'Experience summary'
    },
    notFound: {
        heading: 'Page not found',
        body: "The requested page doesn't exist or has been moved. Use the button below to head back to safety.",
        returnHome: 'Return Home'
    },
    error: {
        heading: 'Something went wrong',
        body: 'An unexpected error occurred while loading this page. You can try again, or head back to safety.',
        tryAgain: 'Try again',
        returnHome: 'Return Home'
    },
    // Case-study cards (home, /work, for-agencies proof) and the case-study
    // page itself. Section labels only — the MDX body supplies the content.
    work: {
        viewCaseStudy: 'View case study',
        backToWork: 'Back to work',
        theProblem: 'The Problem',
        theSolution: 'The Solution',
        timeline: 'Timeline',
        myRole: 'My Role',
        askHeading: 'Want to ask me a question?',
        // `href` values are same-page anchors to the rehype-slug ids of the
        // canonical H2 headings every case study in this locale uses (see
        // docs/es-style-guide.md section 7). scripts/validate-content.ts
        // checks that each locale's MDX files contain headings that
        // produce these ids.
        askChips: [
            { label: 'What problem was this solving?', href: '#challenge' },
            { label: 'What was your role here?', href: '#my-contributions' },
            { label: 'How did you define success?', href: '#outcome' },
            { label: 'What was your approach?', href: '#solution' }
        ],
        gallery: 'Gallery'
    },
    contactPage: {
        // Rendered as: {recruiterPrefix}<Link>{recruiterLink}</Link>{recruiterSuffix}
        recruiterPrefix: 'Recruiter or hiring manager? See my ',
        recruiterLink: 'resume',
        recruiterSuffix: ' instead.',
        linkedinLabel: 'LinkedIn'
    },
    resumePage: {
        reachOutCta: 'Reach out about a role',
        downloadCta: 'Download CV',
        pdfHref: '/resume.pdf',
        downloadFilename: 'Jose-Leon-Resume.pdf'
    },
    contactForm: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'email@example.com',
        supportTypeLabel: 'Type of support',
        timelineLabel: 'Timeline',
        selectOne: 'Select one',
        budgetLabel: 'Budget or engagement model',
        optional: '(optional)',
        budgetPlaceholder: 'e.g. project-based, ongoing retainer, $X–Y range',
        messageLabel: 'Message',
        messagePlaceholder: 'How can I help?',
        submit: 'Send Message',
        submitting: 'Sending...',
        successHeading: 'Message sent!',
        successBody: "Thank you for reaching out. I'll get back to you soon.",
        sendAnother: 'Send another message',
        // Keyed by the `code` the contact API returns (src/app/api/contact/
        // route.ts). `generic` and `network` are client-side only.
        errors: {
            generic: 'Something went wrong. Please try again.',
            network: 'Something went wrong. Please check your connection and try again.',
            rate_limited: 'Too many requests. Please try again later.',
            not_configured: 'Contact form is not configured.',
            invalid_body: 'Invalid request body.',
            validation: 'Please fill in all required fields with valid values.',
            send_failed: 'Message could not be sent. Please try again later.'
        }
    }
} as const

export type UiContent = typeof uiContent
export type ContactErrorCode = keyof UiContent['contactForm']['errors']

// Widens every literal string in a content object to `string` (and every
// tuple to an array) so a locale file can `satisfies` the English shape
// without having to repeat the English strings. Used by ../es/ui.ts; the
// same helper works for any other content module.
export type ContentShape<T> = T extends string
    ? string
    : T extends (...args: infer A) => string
      ? (...args: A) => string
      : T extends readonly (infer U)[]
        ? readonly ContentShape<U>[]
        : { [K in keyof T]: ContentShape<T[K]> }

export type UiContentShape = ContentShape<UiContent>

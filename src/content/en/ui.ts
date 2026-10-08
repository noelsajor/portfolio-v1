// UI chrome copy shared across every page: header nav, footer aria-labels,
// the global 404, and the locale error boundary. See the SiteHeader/
// SiteFooter/not-found.tsx/error.tsx comments at each call site for how
// `lang` is resolved there.
export const uiContent = {
    header: {
        navWork: 'Work',
        navAbout: 'About',
        navContact: 'Contact',
        discussProject: 'Discuss a Project'
    },
    footer: {
        ariaEmail: (email: string) => `Email ${email}`,
        ariaLinkedin: 'LinkedIn',
        ariaBehance: 'Behance',
        ariaGithub: 'GitHub',
        ariaFigma: 'Figma Community',
        ariaResume: 'Resume'
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
    }
} as const

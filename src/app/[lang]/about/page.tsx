import { buildPageMetadata } from '@/lib/site-config'

export const metadata = buildPageMetadata({
    title: 'About',
    description:
        'Multidisciplinary designer and front-end production specialist — product design, UI/UX, Shopify, and front-end implementation.',
    path: '/about'
})

export default function AboutPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">About</h1>
            <p className="max-w-2xl text-white/70">
                I’m Jose Leon, a multidisciplinary designer and front-end developer with more than a decade of experience
                across branding, UI/UX, e-commerce, digital products, and web implementation.
            </p>
            <p className="max-w-2xl text-white/70">
                What started as visual and brand design work grew into UI/UX and front-end implementation — I work across
                strategy, design, and production instead of handing a project between separate specialists. That includes
                Shopify: I build custom storefronts, themes, and reusable Liquid sections for e-commerce brands, alongside
                UI/UX and front-end work outside of e-commerce entirely.
            </p>
            <p className="max-w-2xl text-white/70">
                I use AI to speed up research, documentation, and repetitive implementation work. Every output is reviewed
                and adapted to the project’s actual goals, brand, and technical constraints — the creative and technical
                judgment stays mine.
            </p>
            <p className="max-w-2xl text-white/70">
                I collaborate remotely with international teams — founders, marketers, designers, and other developers —
                without unnecessary process overhead.
            </p>
        </div>
    )
}

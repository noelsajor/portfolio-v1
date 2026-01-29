export const metadata = {
    title: 'About — Jose Leon',
    description: 'Senior UI/UX Designer & Shopify Front-end Developer.'
}

export default function AboutPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">About</h1>
            <p className="max-w-2xl text-white/70">
                I’m Jose Leon, a Senior UI/UX Designer and Shopify-focused front-end developer. I help e-commerce teams ship
                fast, accessible, conversion-driven experiences—bridging design systems, CRO thinking, and Liquid implementation.
            </p>
            <p className="max-w-2xl text-white/70">
                I’m strongest when I can own the flow end-to-end: discovery, UX strategy, UI execution, and theme-ready components
                that merchants can actually maintain.
            </p>
        </div>
    )
}

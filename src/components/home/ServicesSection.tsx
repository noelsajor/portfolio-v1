import { Layers, Component, Braces, ShoppingBag, type LucideIcon } from 'lucide-react'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

const SERVICE_ICONS: Record<string, LucideIcon> = {
    'Product & UX Design': Layers,
    'UI Systems': Component,
    'Front-End Implementation': Braces,
    'E-commerce Development': ShoppingBag
}

export function ServicesSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { services } = homeContent

    return (
        <section id="services" className="scroll-mt-24 space-y-8">
            <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white/70">{services.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{services.heading}</h2>
                <p className="max-w-2xl text-white/70">{services.intro}</p>
            </div>

            <ul role="list" className="grid gap-x-8 gap-y-10 md:grid-cols-2">
                {services.items.map((service) => {
                    const Icon = SERVICE_ICONS[service.title]

                    return (
                        <li key={service.title} className="space-y-3">
                            {Icon ? <Icon aria-hidden="true" className="h-5 w-5 text-white/70" /> : null}
                            <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                            <p className="text-sm leading-relaxed text-white/70">{service.description}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

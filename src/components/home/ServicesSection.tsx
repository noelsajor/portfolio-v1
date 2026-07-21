import { homeContent } from '@/content/home'

export function ServicesSection() {
    const { services } = homeContent

    return (
        <section id="services" className="scroll-mt-24 space-y-8">
            <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white/70">{services.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{services.heading}</h2>
                <p className="max-w-2xl text-white/70">{services.intro}</p>
            </div>

            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {services.items.map((service) => (
                    <div key={service.title} className="space-y-2 border-t border-white/10 pt-6">
                        <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-white/70">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

import { testimonials } from '@/content/testimonials'

// Renders nothing until a real, approved testimonial exists — see the
// BLOCKED comment in src/content/testimonials.ts. No placeholder content.
export function TestimonialsSection() {
    if (testimonials.length === 0) return null

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What people say</h2>
            <ul role="list" className="grid gap-4 md:grid-cols-2">
                {testimonials.map((testimonial) => (
                    <li
                        key={testimonial.name}
                        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                        <p className="text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
                        <p className="text-sm text-white/60">
                            <span className="font-semibold text-white/80">{testimonial.name}</span>
                            {' — '}
                            {testimonial.role}, {testimonial.company}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

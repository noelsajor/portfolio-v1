import { homeContent } from '@/content/home'

export function AIWorkflowSection() {
    const { aiWorkflow } = homeContent

    return (
        <section className="space-y-6">
            <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white/70">{aiWorkflow.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{aiWorkflow.heading}</h2>
                <div className="max-w-2xl space-y-4 text-white/70">
                    {aiWorkflow.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
                {aiWorkflow.supportingItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </section>
    )
}

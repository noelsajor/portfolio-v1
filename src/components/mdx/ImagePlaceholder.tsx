export function ImagePlaceholder({ id, label }: { id: string; label?: string }) {
    return (
        <figure
            role="img"
            aria-label={`Image pending: ${label ?? id}`}
            className="my-8 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5"
        >
            <figcaption className="px-4 text-center text-sm text-white/50">
                Image pending — <code className="text-white/70">{id}</code>
            </figcaption>
        </figure>
    )
}

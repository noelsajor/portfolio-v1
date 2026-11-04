import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

// Every element an MDX body can render has to be mapped here. There is no
// Tailwind typography plugin in this project (`prose`/`prose-invert` in the
// page wrappers are inert class names), so an unmapped element falls back to
// the browser default stylesheet, which on a black background means black
// borders, serif tables and unreadable code blocks.
//
// The six original mappings (h1, h2, p, ul, li, a) covered everything the
// seven case studies use. Blog posts use more: tables, blockquotes, ordered
// lists, fenced code, images and rules. Those are added below. None of them
// appear in any case study, so case-study rendering is unchanged, with one
// exception noted on `code`.

/** Fenced code blocks arrive as <pre><code class="language-x">. Only INLINE
 *  code should get the chip treatment, so the className is the discriminator:
 *  highlighted blocks pass through untouched and let <pre> do the styling. */
function Code({ className, ...props }: { className?: string; children?: ReactNode }) {
    if (className) return <code className={className} {...props} />
    return (
        <code
            className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white/90"
            {...props}
        />
    )
}

/** Image plus caption as a real <figure>/<figcaption>. Used instead of bare
 *  markdown images so the caption is associated with the image for assistive
 *  technology rather than being a loose italic paragraph underneath it. */
function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
    return (
        <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-white/10"
            />
            {caption ? (
                <figcaption className="mt-3 text-sm leading-relaxed text-white/60">{caption}</figcaption>
            ) : null}
        </figure>
    )
}

export const mdxComponents: MDXComponents = {
    // `[&>a]:no-underline` is for rehype-autolink-headings, configured with
    // behavior: 'wrap', which wraps the heading text in an anchor. Without it
    // the anchor picks up the body-link underline below and every heading
    // renders underlined. Pre-existing on the case studies; fixed here.
    h1: (props) => (
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight [&>a]:no-underline" {...props} />
    ),
    h2: (props) => (
        <h2 className="mt-10 text-xl md:text-2xl font-semibold tracking-tight [&>a]:no-underline" {...props} />
    ),
    p: (props) => <p className="mt-4 leading-relaxed text-white/80" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc pl-6 text-white/80" {...props} />,
    li: (props) => <li className="mt-2" {...props} />,
    a: (props) => (
        <a
            className="rounded-sm underline decoration-white/30 underline-offset-4 hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            {...props}
        />
    ),

    h3: (props) => (
        <h3 className="mt-8 text-lg font-semibold tracking-tight text-white [&>a]:no-underline" {...props} />
    ),
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-white/80" {...props} />,

    // Tables are the one element that can push the page wider than the
    // viewport, so the wrapper scrolls rather than the document.
    table: (props) => (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm" {...props} />
        </div>
    ),
    thead: (props) => <thead className="bg-white/5" {...props} />,
    th: (props) => (
        <th
            className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/50"
            {...props}
        />
    ),
    td: (props) => (
        <td className="border-b border-white/5 px-4 py-3 align-top text-white/80" {...props} />
    ),

    // Used by posts for the "Check your store" callouts.
    blockquote: (props) => (
        <blockquote
            className="mt-6 space-y-3 rounded-2xl border border-white/10 border-l-2 border-l-white/40 bg-white/5 p-5 text-white/80 md:p-6"
            {...props}
        />
    ),

    pre: (props) => (
        <pre
            className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-sm leading-relaxed text-white/80"
            {...props}
        />
    ),
    // Inline code only — see Code() above. One case study uses inline
    // backticks and will pick up the chip styling, which replaces an
    // unstyled browser default.
    code: Code,

    hr: (props) => <hr className="mt-10 border-white/10" {...props} />,

    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    img: (props) => <img loading="lazy" decoding="async" className="mt-6 w-full rounded-2xl border border-white/10" {...props} />,

    Figure
}

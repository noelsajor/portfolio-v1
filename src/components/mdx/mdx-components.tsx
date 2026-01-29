import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
    h1: (props) => <h1 className="text-3xl md:text-4xl font-semibold tracking-tight" {...props} />,
    h2: (props) => <h2 className="mt-10 text-xl md:text-2xl font-semibold tracking-tight" {...props} />,
    p: (props) => <p className="mt-4 leading-relaxed text-white/80" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc pl-6 text-white/80" {...props} />,
    li: (props) => <li className="mt-2" {...props} />,
    a: (props) => <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" {...props} />
}

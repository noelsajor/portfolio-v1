import { buildGraph, serializeJsonLd, type JsonLd as JsonLdNode } from '@/lib/structured-data'

// Renders one JSON-LD <script> holding a schema.org @graph of the given
// nodes. Pages use this for their page-specific nodes (WebPage, FAQPage,
// Article, ItemList...) and reference the site-wide Person/WebSite nodes
// from <StructuredData /> by `@id` — see src/lib/structured-data.ts.
// Server component only: it has no interactivity and must be in the
// initial HTML for crawlers that don't execute JavaScript.
export function JsonLd({ nodes }: { nodes: readonly JsonLdNode[] }) {
    if (nodes.length === 0) return null
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildGraph(nodes)) }} />
}

import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site-config'

// Crawlers used by AI search and answer engines to fetch pages for
// retrieval (search-time) and for training. Listed explicitly, with the
// same allow/disallow as everyone else, for two reasons: it documents that
// being cited by these engines is a deliberate goal of this site (GEO), and
// it prevents a future "block bots" change from silently removing the site
// from AI answers. The wildcard rule already covers them; the explicit
// rules only matter if the wildcard ever changes.
//
// Names are the user-agent tokens each vendor documents for robots.txt:
// OpenAI (GPTBot = training, OAI-SearchBot = ChatGPT search, ChatGPT-User
// = on-demand fetch), Anthropic (ClaudeBot, Claude-SearchBot, Claude-User),
// Perplexity (PerplexityBot, Perplexity-User), Google (Google-Extended
// gates Gemini training only; Googlebot still indexes for AI Overviews),
// Apple (Applebot-Extended), Meta (meta-externalagent), Amazon (Amazonbot),
// DuckDuckGo (DuckAssistBot), Common Crawl (CCBot, used by many models).
const AI_CRAWLERS = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'meta-externalagent',
    'Amazonbot',
    'DuckAssistBot',
    'CCBot'
]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/']
            },
            {
                userAgent: AI_CRAWLERS,
                allow: '/',
                disallow: ['/api/']
            }
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
        // Hostname Google should treat as canonical when it finds the same
        // content on more than one host (apex vs www).
        host: absoluteUrl('/').replace(/\/$/, '')
    }
}

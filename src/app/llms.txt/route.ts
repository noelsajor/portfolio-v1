import { getProjects } from '@/lib/projects'
import { INDEXABLE_LOCALES, localizedPath, type Locale } from '@/lib/i18n'
import { absoluteUrl, siteConfig } from '@/lib/site-config'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import { aboutContent as aboutContentEn, contactContent as contactContentEn, resumeContent as resumeContentEn, workContent as workContentEn } from '@/content/en/static-pages'
import { aboutContent as aboutContentEs, contactContent as contactContentEs, resumeContent as resumeContentEs, workContent as workContentEs } from '@/content/es/static-pages'
import { forAgenciesContent as forAgenciesContentEn } from '@/content/en/for-agencies'
import { forAgenciesContent as forAgenciesContentEs } from '@/content/es/for-agencies'

// /llms.txt — the llmstxt.org convention: a Markdown file at the site root
// that gives an LLM (or an agent deciding what to fetch) a compact, curated
// map of the site. Built from the same content modules the pages render,
// so it can never drift from the site or make a claim the pages don't.
// One file for both locales: the English section comes first (DEFAULT_
// LOCALE), then the Spanish one, each linking to its own localized URLs.
//
// Static at build time, like the sitemap. Not listed in the sitemap (it's
// not an HTML page) and not linked from the UI; crawlers find it by path.
export const dynamic = 'force-static'

const CONTENT = {
    en: {
        home: homeContentEn,
        about: aboutContentEn,
        contact: contactContentEn,
        resume: resumeContentEn,
        work: workContentEn,
        forAgencies: forAgenciesContentEn,
        labels: {
            language: 'English',
            pages: 'Pages',
            services: 'Services',
            caseStudies: 'Case studies',
            faq: 'Frequently asked',
            comparison: 'Working with me vs several freelancers vs an agency',
            profiles: 'Profiles',
            contactLine: 'Email'
        }
    },
    es: {
        home: homeContentEs,
        about: aboutContentEs,
        contact: contactContentEs,
        resume: resumeContentEs,
        work: workContentEs,
        forAgencies: forAgenciesContentEs,
        labels: {
            language: 'Español',
            pages: 'Páginas',
            services: 'Servicios',
            caseStudies: 'Casos de estudio',
            faq: 'Preguntas frecuentes',
            comparison: 'Trabajar conmigo vs varios freelancers vs una agencia',
            profiles: 'Perfiles',
            contactLine: 'Email'
        }
    }
} satisfies Record<Locale, unknown>

function url(lang: Locale, path: string): string {
    return absoluteUrl(localizedPath(lang, path))
}

function section(lang: Locale): string {
    const { home, about, contact, resume, work, forAgencies, labels } = CONTENT[lang]
    const projects = getProjects(lang)
    const lines: string[] = []

    lines.push(`## ${labels.language} (${lang})`, '')
    lines.push(`> ${home.metadata.description}`, '')
    for (const paragraph of about.paragraphs) lines.push(paragraph, '')
    lines.push(about.facts.items.map((item) => `- ${item.label}: ${item.value}`).join('\n'), '')

    lines.push(`### ${labels.pages}`, '')
    lines.push(`- [${home.metadata.title}](${url(lang, '/')}): ${home.hero.supportingText}`)
    lines.push(`- [${about.metadata.title}](${url(lang, '/about')}): ${about.metadata.description}`)
    lines.push(`- [${work.metadata.title}](${url(lang, '/work')}): ${work.metadata.description}`)
    lines.push(`- [${forAgencies.metadata.title}](${url(lang, '/for-agencies')}): ${forAgencies.metadata.description}`)
    lines.push(`- [${resume.metadata.title}](${url(lang, '/resume')}): ${resume.metadata.description}`)
    lines.push(`- [${contact.metadata.title}](${url(lang, '/contact')}): ${contact.metadata.description}`, '')

    lines.push(`### ${labels.services}`, '')
    for (const service of home.services.items) lines.push(`- ${service.title}: ${service.description}`)
    lines.push('')

    lines.push(`### ${labels.caseStudies}`, '')
    for (const project of projects) {
        const summary = project.seoDescription ?? project.summary
        lines.push(`- [${project.title}](${url(lang, `/work/${project.slug}`)}): ${summary}`)
    }
    lines.push('')

    // The home comparison, flattened to one claim per criterion, so an AI
    // answering "freelancer vs agency?" can quote it without parsing a grid.
    lines.push(`### ${labels.comparison}`, '')
    for (const row of home.whyMe.comparison.rows) {
        const [me, freelancers, agency] = row.cells
        const [optMe, optFreelancers, optAgency] = home.whyMe.comparison.options
        lines.push(`- ${row.label}: ${optMe}: ${me}. ${optFreelancers}: ${freelancers}. ${optAgency}: ${agency}.`)
    }
    lines.push(home.whyMe.comparison.note, '')

    lines.push(`### ${labels.faq}`, '')
    for (const item of [...home.faq.items, ...forAgencies.faq.items]) {
        lines.push(`- ${item.question} ${item.answer}`)
    }
    lines.push('')

    return lines.join('\n')
}

function build(): string {
    const header = [
        `# ${siteConfig.name}`,
        '',
        `> ${siteConfig.title}`,
        '',
        `- ${CONTENT.en.labels.contactLine}: ${siteConfig.email}`,
        ...Object.values(siteConfig.sameAs).map((profile) => `- ${profile}`),
        `- Sitemap: ${absoluteUrl('/sitemap.xml')}`,
        ''
    ]
    const sections = INDEXABLE_LOCALES.map((lang) => section(lang))
    return [...header, ...sections].join('\n')
}

export function GET() {
    return new Response(build(), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400'
        }
    })
}

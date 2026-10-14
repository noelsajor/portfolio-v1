// The anchor ids a case study's H2 headings will end up with once rendered.
//
// The case-study page uses this to show only the question chips whose target
// actually exists in that document, and scripts/validate-content.ts uses it
// to keep the two locales exposing the same chips. Both read the raw MDX, so
// the slugs have to be derived the same way in both places, which is why
// this lives here instead of being written twice.

/** rehype-slug uses github-slugger: lowercase, strip everything that is not
 *  a letter, number, space or hyphen (Unicode-aware), spaces -> '-'. */
export function slugifyHeading(heading: string): string {
    return heading
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
}

/** Every anchor id the H2s in this markdown will render with. */
export function headingIds(markdown: string): Set<string> {
    return new Set(
        markdown
            .split('\n')
            .filter((line) => /^##\s+/.test(line))
            .map((line) => slugifyHeading(line.replace(/^##\s+/, '')))
    )
}

// Lightweight validation scenarios for the MDX content pipeline. No test
// framework exists in this project yet, so this is a plain script (run via
// `pnpm run validate:content`) rather than a new testing stack — `tsx` just
// runs it directly, resolving imports the same way Next.js already does.
import fs from 'node:fs'
import path from 'node:path'
import { projectFrontmatterSchema } from '../src/lib/project-schema'
import { getProjectSlugs } from '../src/lib/projects'

let failures = 0

function check(name: string, passed: boolean): void {
    if (passed) {
        console.log(`  ok   - ${name}`)
    } else {
        failures += 1
        console.error(`  FAIL - ${name}`)
    }
}

const tempFiles: string[] = []
function cleanupTempFiles(): void {
    for (const filePath of tempFiles) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}
process.on('exit', cleanupTempFiles)

console.log('Content validation scenarios\n')

// --- Schema-level scenarios -------------------------------------------------

console.log('Schema:')

const validSample = {
    title: 'Sample Project',
    type: 'E-commerce',
    roles: ['UI/UX Design'],
    summary: 'A sample project summary.',
    services: ['UI/UX Design'],
    coverImage: '/images/case-studies/sample-cover.jpg',
    coverAlt: 'Sample cover image',
    challenge: 'Sample challenge.',
    outcome: 'Sample outcome.',
    liveUrl: 'https://example.com'
}

check('valid project passes', projectFrontmatterSchema.safeParse(validSample).success)

{
    const withoutTitle: Record<string, unknown> = { ...validSample }
    delete withoutTitle.title
    const result = projectFrontmatterSchema.safeParse(withoutTitle)
    check(
        'missing required field (title) fails',
        !result.success && result.error.issues.some((issue) => issue.path.join('.') === 'title')
    )
}

{
    const result = projectFrontmatterSchema.safeParse({ ...validSample, liveUrl: 'not-a-url' })
    check(
        'invalid URL (liveUrl) fails',
        !result.success && result.error.issues.some((issue) => issue.path.join('.') === 'liveUrl')
    )
}

{
    const result = projectFrontmatterSchema.safeParse({ ...validSample, type: 'Not A Real Type' })
    check(
        'invalid enum value (type) fails',
        !result.success && result.error.issues.some((issue) => issue.path.join('.') === 'type')
    )
}

{
    const result = projectFrontmatterSchema.safeParse({ ...validSample, extraField: 'not allowed' })
    check('unknown field is rejected (strict mode)', !result.success)
}

{
    const result = projectFrontmatterSchema.safeParse({ ...validSample, segment: 'Not A Real Segment' })
    check(
        'invalid enum value (segment) fails',
        !result.success && result.error.issues.some((issue) => issue.path.join('.') === 'segment')
    )
}

check('valid segment passes', projectFrontmatterSchema.safeParse({ ...validSample, segment: 'D2C' }).success)

check('omitting segment passes (optional field)', projectFrontmatterSchema.safeParse(validSample).success)

{
    const result = projectFrontmatterSchema.safeParse({ ...validSample, updatedAt: '2026-13-45' })
    check(
        'invalid updatedAt (not a real date) fails',
        !result.success && result.error.issues.some((issue) => issue.path.join('.') === 'updatedAt')
    )
}

check(
    'valid updatedAt (YYYY-MM-DD) passes',
    projectFrontmatterSchema.safeParse({ ...validSample, updatedAt: '2026-07-21' }).success
)

{
    const withoutCoverAlt: Record<string, unknown> = { ...validSample }
    delete withoutCoverAlt.coverAlt
    const result = projectFrontmatterSchema.safeParse(withoutCoverAlt)
    check(
        'coverImage without coverAlt fails (must be paired)',
        !result.success && result.error.issues.some((issue) => issue.path.join('.') === 'coverAlt')
    )
}

{
    const withoutEitherCover: Record<string, unknown> = { ...validSample }
    delete withoutEitherCover.coverImage
    delete withoutEitherCover.coverAlt
    check('omitting both coverImage and coverAlt passes', projectFrontmatterSchema.safeParse(withoutEitherCover).success)
}

// --- Loader-level scenarios (exercise the real content directory) ---------
// Temporary fixtures are written into the real content directory and always
// removed afterward (see cleanupTempFiles above) — nothing broken is left
// behind in the repository.

console.log('\nLoader (real content directory):')

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'case-studies')

check(
    'template is never exposed as a project',
    !getProjectSlugs().includes('_template') && !getProjectSlugs({ includeDrafts: true }).includes('_template')
)

{
    const draftSlug = 'zz-validation-scenario-draft'
    const draftPath = path.join(CONTENT_DIR, `${draftSlug}.mdx`)
    tempFiles.push(draftPath)
    fs.writeFileSync(
        draftPath,
        `---
title: Draft Validation Scenario
type: Product Design
roles:
  - UI/UX Design
summary: Temporary fixture used only by scripts/validate-content.ts.
services:
  - UI/UX Design
coverImage: /images/case-studies/sample-cover.jpg
coverAlt: Temporary fixture
challenge: "n/a"
outcome: "n/a"
status: draft
---

Temporary validation fixture.
`,
        'utf8'
    )
    check('draft project excluded from getProjectSlugs()', !getProjectSlugs().includes(draftSlug))
    fs.unlinkSync(draftPath)
    tempFiles.pop()
}

{
    const badSlug = 'zz-validation-scenario-invalid'
    const badPath = path.join(CONTENT_DIR, `${badSlug}.mdx`)
    tempFiles.push(badPath)
    fs.writeFileSync(
        badPath,
        `---
type: Product Design
roles:
  - UI/UX Design
summary: Missing a title on purpose.
services:
  - UI/UX Design
coverImage: /images/case-studies/sample-cover.jpg
coverAlt: Temporary fixture
challenge: "n/a"
outcome: "n/a"
---

Temporary validation fixture.
`,
        'utf8'
    )

    let message = ''
    try {
        getProjectSlugs({ includeDrafts: true })
    } catch (err) {
        message = err instanceof Error ? err.message : String(err)
    }
    check(
        'invalid frontmatter throws, message includes filename, slug, and field',
        message.includes(`${badSlug}.mdx`) && message.includes(badSlug) && message.toLowerCase().includes('title')
    )
    fs.unlinkSync(badPath)
    tempFiles.pop()
}

{
    // Uppercase + a space: a filename that would otherwise happily become a
    // "valid" (but ugly, non-canonical) slug and URL without this check.
    const badFilename = 'Zz Validation Scenario Bad Slug.mdx'
    const badPath = path.join(CONTENT_DIR, badFilename)
    tempFiles.push(badPath)
    fs.writeFileSync(
        badPath,
        `---
title: Bad Slug Validation Scenario
type: Product Design
roles:
  - UI/UX Design
summary: Temporary fixture used only by scripts/validate-content.ts.
services:
  - UI/UX Design
challenge: "n/a"
outcome: "n/a"
---

Temporary validation fixture.
`,
        'utf8'
    )

    let message = ''
    try {
        getProjectSlugs({ includeDrafts: true })
    } catch (err) {
        message = err instanceof Error ? err.message : String(err)
    }
    check(
        'filename that produces a non-kebab-case slug throws',
        message.includes(badFilename) && message.toLowerCase().includes('slug')
    )
    fs.unlinkSync(badPath)
    tempFiles.pop()
}

console.log()
if (failures > 0) {
    console.error(`${failures} validation scenario(s) failed.`)
    process.exit(1)
}
console.log('All validation scenarios passed.')

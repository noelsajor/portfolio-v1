// One-off generator for the default Open Graph image. Run manually with
// `pnpm tsx scripts/generate-og-image.ts` whenever the design needs updating —
// this is not part of the build; the output PNG is committed to public/.
import { writeFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'

async function main() {
    const response = new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: '#000000',
                    padding: '80px',
                    fontFamily: 'sans-serif'
                }}
            >
                <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#ffffff' }}>Jose Leon</div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 24,
                        fontSize: 36,
                        color: 'rgba(255, 255, 255, 0.85)'
                    }}
                >
                    Multidisciplinary Design + Front-End Production
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 32,
                        fontSize: 28,
                        color: 'rgba(255, 255, 255, 0.55)'
                    }}
                >
                    UI/UX · Shopify · Web
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    )

    const buffer = Buffer.from(await response.arrayBuffer())
    await writeFile(new URL('../public/og-image.png', import.meta.url), buffer)
    console.log('Wrote public/og-image.png')
}

main()

import { uiContent as uiContentEn } from '@/content/en/ui'
import { uiContent as uiContentEs } from '@/content/es/ui'
import type { UiContentShape } from '@/content/en/ui'
import type { Locale } from '@/lib/i18n'

// Single lookup for interface strings so components don't each repeat the
// `lang === 'es' ? es : en` ternary. Typed as the widened shape so call
// sites get `string`, not the English literal union.
const UI_CONTENT: Record<Locale, UiContentShape> = {
    en: uiContentEn,
    es: uiContentEs
}

export function getUiContent(lang: Locale): UiContentShape {
    return UI_CONTENT[lang]
}

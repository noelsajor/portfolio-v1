'use client'

import { useEffect, useState } from 'react'

const TYPE_MS = 62
const ERASE_MS = 34
const HOLD_MS = 2100
const PAUSE_MS = 420

/**
 * Types one word out, erases it, types the next, and loops.
 *
 * The first word is rendered on the server fully typed, so the heading is a
 * finished sentence in the HTML: a crawler, a reader with JavaScript off, and
 * the first paint all get "From idea to production." rather than a blank or a
 * single letter. The cycle only ever starts from that same state, so there is
 * nothing for hydration to disagree about.
 *
 * Only the visible string is React state. The phase and the word index are
 * plain locals inside one self-scheduling timer, which keeps the whole cycle
 * in a single effect instead of a state machine that re-renders on every
 * transition just to decide what to do next.
 *
 * Accessibility is handled by the caller: the heading carries an aria-label
 * with the finished sentence and hides this line from assistive technology.
 * A heading that rewrites itself every two seconds is either silent or
 * unbearable in a screen reader depending on how the live region is set up,
 * so the honest answer is not to make it one. Doing it with a second,
 * visually hidden copy of the word instead would put the word in the DOM
 * twice, which is what a crawler and anything else reading text content
 * would then see.
 */
export function TypewriterWords({ words }: { words: readonly string[] }) {
    const [text, setText] = useState(words[0] ?? '')

    useEffect(() => {
        if (words.length < 2) return
        // Read here rather than during render: the server has no media query,
        // and branching on it in the first client render would change the
        // markup out from under hydration.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let index = 0
        let current = words[0] ?? ''
        // The first word arrives already typed, so the cycle opens on a hold
        // and the first thing it does is start deleting.
        let erasing = true
        let timer: ReturnType<typeof setTimeout>

        const step = () => {
            const word = words[index] ?? ''

            if (erasing) {
                if (current.length === 0) {
                    index = (index + 1) % words.length
                    erasing = false
                    timer = setTimeout(step, PAUSE_MS)
                    return
                }
                current = current.slice(0, -1)
                setText(current)
                timer = setTimeout(step, ERASE_MS)
                return
            }

            if (current === word) {
                erasing = true
                timer = setTimeout(step, HOLD_MS)
                return
            }

            current = word.slice(0, current.length + 1)
            setText(current)
            timer = setTimeout(step, TYPE_MS)
        }

        timer = setTimeout(step, HOLD_MS)
        return () => clearTimeout(timer)
    }, [words])

    return (
        <>
            {text}
            <span className="type-caret" />
        </>
    )
}

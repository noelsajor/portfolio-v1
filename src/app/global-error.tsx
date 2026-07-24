'use client'

import { useEffect } from 'react'
import './globals.css'

// Only rendered if the root layout itself throws — replaces the entire
// document, so it must provide its own <html>/<body> and re-import global
// styles (the root layout's own <head>/<body> never mounts in this case).
export default function GlobalError({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html lang="en">
            <body className="min-h-dvh">
                <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
                    <div className="space-y-4">
                        <h1 className="text-8xl font-bold tracking-tighter text-white/10">Error</h1>
                        <h2 className="text-3xl font-semibold tracking-tight">Something went wrong</h2>
                        <p className="mx-auto max-w-md text-white/60">
                            An unexpected error occurred. Please try again.
                        </p>
                    </div>

                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    )
}

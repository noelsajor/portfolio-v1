import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
            <div className="space-y-4">
                <h1 className="text-8xl font-bold tracking-tighter text-white/10">404</h1>
                <h2 className="text-3xl font-semibold tracking-tight">Page not found</h2>
                <p className="mx-auto max-w-md text-white/60">
                    The requested page doesn&apos;t exist or has been moved. Use the button below to head back to safety.
                </p>
            </div>

            <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
                Return Home
            </Link>
        </div>
    )
}

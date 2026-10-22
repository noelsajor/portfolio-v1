// The monogram, inline rather than fetched.
//
// It was a CSS mask over /images/logo.svg first, which cost a network request
// that the text beside it does not have to wait for. The wordmark is painted
// with the HTML while the mark waits on its own response, so on a cold load
// the two arrive out of step and the header assembles itself in front of the
// reader. Inline, the mark and the word are the same paint. There is no
// animation, transition or delay on it anywhere.
//
// That trade only works because the path is small, and the first attempt was
// not: traced over a 2x upsample of the artwork it came to 11.5KB of curve
// data, which is what made a fetched file look like the sensible option.
// Traced at native size it is 1.2KB and pixel-identical at every size this
// site renders it.
//
// fill="currentColor", so it takes the colour of the text it sits beside:
// white against the header wordmark, the footer's dimmer grey on the line it
// shares there. Decorative in both, since the wordmark already names the site.
export function BrandMark({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 626 697"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            <g transform="translate(0,697) scale(0.1,-0.1)" stroke="none">
                <path d="M4140 5642 c0 -1461 -3 -1377 62 -1512 37 -76 75 -115 348 -361 1079
-971 1275 -1153 1302 -1207 l23 -47 3 -823 2 -823 33 6 c158 31 301 177 336
343 19 92 15 3861 -4 3937 -42 164 -105 241 -385 471 -1000 820 -1440 1165
-1692 1327 l-28 17 0 -1328z" />
                <path d="M190 6661 c-78 -25 -127 -69 -162 -146 l-23 -50 0 -2130 c0 -1691 3
-2140 13 -2180 35 -137 87 -210 263 -370 78 -72 247 -224 374 -340 127 -115
319 -289 425 -385 107 -96 224 -202 260 -235 824 -750 914 -828 921 -803 11
36 10 2025 -1 2096 -14 99 34 50 -770 781 -550 500 -553 503 -580 556 l-25 50
0 440 c0 410 1 442 18 470 46 76 142 102 219 60 39 -21 189 -152 817 -715 206
-184 400 -357 431 -385 31 -27 104 -93 161 -145 143 -130 696 -631 839 -760
64 -58 193 -175 287 -260 211 -192 469 -426 908 -825 604 -548 747 -678 867
-788 l118 -109 0 839 c0 986 17 869 -151 1024 -389 360 -607 559 -1079 980
-165 147 -634 556 -935 814 -526 452 -607 521 -895 766 -69 58 -228 193 -355
300 -329 279 -1027 860 -1320 1099 -137 112 -279 228 -315 257 -107 88 -222
123 -310 94z" />
            </g>
        </svg>
    )
}

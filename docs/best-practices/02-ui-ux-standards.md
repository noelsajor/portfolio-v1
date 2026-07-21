# 02 - UI/UX Standards

This playbook defines the visual and interactive standards for all agency projects.

## 📱 Responsive Strategy
- **Breakpoints**: 
  - `sm`: 640px (Mobile Landscape)
  - `md`: 768px (Tablet)
  - `lg`: 1024px (Laptop)
  - `xl`: 1280px (Desktop)
- **Mobile First**: All CSS must be written mobile-first. Use `min-width` media queries (e.g., `md:grid-cols-2`).

## ♿ Accessibility (A11y)
- **Contrast**: Ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- **Focus States**: Never remove focus outlines (`outline: none`) without providing a clearly visible alternative. 
- **Aria Labels**: Use `aria-label` on icon-only buttons (e.g., social links, menu triggers).
- **Semantics**: Use appropriate tags (`<h1>`, `<button>`, `<a>`) correctly. Do not use `div` for interactive elements.

## 🔠 Typography & Fluid Scaling
- **Fluid Type**: Implement fluid typography using `clamp()` or Tailwind 4's dynamic text sizes where applicable.
- **Line Height**: Standard body text must use `leading-relaxed` (1.625) or `leading-normal` (1.5).
- **Content Max-Width**: Limit text content to 65-75 characters per line (approx. `max-w-2xl` to `max-w-3xl`) for optimal readability.

## ✨ Micro-Animations
- **Transistions**: Use `transition-all duration-300 ease-in-out` for all hover states.
- **Hover Effects**: Buttons should have a subtle shift in opacity or background color on hover.
- **Reduced Motion**: Respect user preferences; wrap complex animations in `@media (prefers-reduced-motion: no-preference)`.

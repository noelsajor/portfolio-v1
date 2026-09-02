// BLOCKED — APPROVED TESTIMONIALS REQUIRED.
//
// PR 5: deliberately NOT moved into src/content/{en,es}/ and NOT
// locale-wrapped. These are verbatim client quotes, not authored copy —
// there's no English "original" to translate, so there's nothing here for a
// future Spanish-copy PR to localize. Stays at this path, untouched.
//
// No testimonial goes in this array until all of these are true:
//   1. The quote is real, from a real stakeholder.
//   2. Their name, role, and company are confirmed accurate.
//   3. They've explicitly given permission to publish the quote with
//      attribution (and headshot/logo, if used).
//
// Do not add a placeholder or illustrative entry "to see how it looks" —
// TestimonialsSection renders nothing when this array is empty, which is the
// correct behavior until a real, approved entry exists.
export interface Testimonial {
    quote: string
    name: string
    role: string
    company: string
    relationship: string
}

export const testimonials: Testimonial[] = []

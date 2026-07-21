# 06 - Cybersecurity Standards

This playbook defines the security protocols for all agency deployments.

## 🛡️ Security Headers
All projects must implement the following headers in `next.config.js`:
- **Content Security Policy (CSP)**: Restrict scripts to trusted domains only.
- **X-Frame-Options**: Set to `DENY` or `SAMEORIGIN` to prevent clickjacking.
- **X-Content-Type-Options**: Set to `nosniff`.
- **Referrer-Policy**: Set to `strict-origin-when-cross-origin`.

## 📂 Environment Variables
- **Secrets**: NEVER commit `.env` or `.env.local` to Git.
- **Naming**: Use `NEXT_PUBLIC_` prefix ONLY for variables that need to be accessed on the client-side.
- **Validation**: Use a validation tool (like `t3-env` or custom Zod schemas) to ensure required variables exist at build time.

## 🧹 Input Sanitization & Spam
- **Forms**: Use Honeypot fields and CSRF tokens for all forms.
- **Sanitization**: Treat all user input as untrusted. Use `DOMPurify` if rendering HTML from user input.
- **API Security**: Implement rate limiting on sensitive endpoints (e.g., `/api/contact`).

## 🔐 Data Privacy
- **GDPR/CCPA**: Implement a cookie consent banner if tracking cookies are used.
- **IP Anonymization**: Anonymize IPs in analytics before storage.

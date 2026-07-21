# 07 - Analytics & Conversion Standards

This playbook defines how we track user behavior and measure success.

## 📊 Event Dispatching
- **Naming Convention**: Use `Event_Category: Event_Action [Label]` (e.g., `CTA: Click [Get Started]`).
- **Trigger Points**: 
  - Button Clicks (especially CTAs)
  - Form Submissions (Success vs. Failure)
  - Scroll Depth (25%, 50%, 75%, 100% for blog/articles)
  - External Link Clicks

## 🛠️ Implementation
- **Data Layers**: Push events to `window.dataLayer` for Google Tag Manager (GTM).
- **CTA Attributes**: Every primary CTA must have a `data-tracking` attribute describing its purpose.
- **Conversion Tracking**: Define "Success" pages (e.g., `/contact/success`) for easy pixel tracking in Facebook/LinkedIn.

## ⚖️ GDPR & Compliance
- **Opt-In First**: No tracking scripts should fire until the user has accepted the cookie policy.
- **Anonymization**: Enable `anonymize_ip` in Google Analytics.
- **Privacy Policy**: Every site MUST have a visible link to a Privacy Policy that details what data is collected.

## 📈 Reporting
- **Dashboards**: Provide clients with a Looker Studio or simple Vercel Analytics dashboard.
- **KPIs**: Define 2-3 primary KPIs (e.g., "Contact Form Conversions", "PDP to Checkout Rate") before launch.

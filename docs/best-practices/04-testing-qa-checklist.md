# 04 - Testing & QA Checklist

This playbook defines the mandatory checks before any project is marked for production.

## 🏁 Pre-Launch Checklist

### 1. Visual QA
- [ ] Verify pixel-perfection against Figma/Design files.
- [ ] Test breakpoints on physical devices (iOS/Android/Desktop).
- [ ] Check dark/light mode consistency.
- [ ] Verify all hover and active states.

### 2. Functional QA
- [ ] Test every link (Zero 404s allowed).
- [ ] Submit all forms and verify lead delivery.
- [ ] Test "Add to Cart" or lead logic in production mode.
- [ ] Verify 404 custom error page works.

### 3. SEO & Analytics
- [ ] Run Screaming Frog or similar tool to verify meta tags.
- [ ] Dry-run GTM/Pixel events in Browser Console.
- [ ] Verify `sitemap.xml` and `robots.txt` exist and are valid.

## 📊 Performance Thresholds
Use Lighthouse / PageSpeed Insights.

| Metric | Target Score |
| :--- | :--- |
| **Performance** | 90+ |
| **Accessibility** | 100 |
| **Best Practices** | 100 |
| **SEO** | 100 |

## 🧪 Post-Deployment
- [ ] Check SSL certificate status.
- [ ] Verify DNS propagation.
- [ ] Monitor Vercel build logs for any runtime errors.

#!/usr/bin/env python3
"""Generates public/resume.pdf (English) and public/resume-es.pdf (Spanish).

The downloadable CV is the one artifact that is NOT built from the content
modules in src/content, because it has to fit one page and recruiters read it
outside the site. This script is the source of truth for it, so the layout and
the copy stay reproducible instead of living in a one-off script that gets
lost. Edit RESUMES below and re-run.

Naming: the headline is the LEGAL name, unlike the rest of the site, which is
branded as Noelsajor. A CV feeds contracts, background checks and ATS matching,
so the legal name leads; the brand is right underneath in the contact line
(noelsajor.com), which links both identities.

Usage:
    pip install reportlab
    python3 scripts/generate-resume-pdf.py
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle

INK = HexColor("#111111")
MUTED = HexColor("#555555")
RULE = HexColor("#BBBBBB")

NAME = "JOSE LEON ROJAS"
CONTACT = "noelsajor@gmail.com   |   noelsajor.com   |   linkedin.com/in/jose-leon-dev"

RESUMES = {
    "resume.pdf": {
        "title": "Product Builder | Product Design, Front-End & Shopify Development",
        "profile_heading": "PROFILE",
        "profile": (
            "Multidisciplinary Product Builder working across product design, UI/UX, front-end engineering, Shopify, "
            "and AI-assisted development. Turns business requirements, product ideas, and approved concepts into "
            "responsive, production-ready digital experiences - from flows, prototypes, and design systems through "
            "implementation, QA, optimization, and launch. Brings a long visual-design foundation together with "
            "hands-on web implementation, e-commerce delivery, performance optimization, and cross-functional "
            "collaboration."
        ),
        "skills_heading": "CORE CAPABILITIES",
        "skills": [
            ("Product &amp; UX", "Product Design | UI/UX Design | User Flows | Wireframing | Prototyping | Figma | Responsive Design"),
            ("UI Systems", "Design Systems | Component Libraries | Interaction Patterns | Developer Handoff | Figma-to-Code"),
            ("Front-End", "HTML | CSS | JavaScript | TypeScript | React | Next.js | Astro | Tailwind CSS | Git/GitHub"),
            ("Commerce", "Shopify Online Store 2.0 | Liquid | Theme Development | Theme Customization | Metafields &amp; Schema"),
            ("Delivery", "Web Performance | Core Web Vitals | Accessibility-Aware UI | Responsive QA | SEO Basics | Analytics | AI-Assisted Development"),
        ],
        "experience_heading": "EXPERIENCE",
        "experience": [
            (
                "IOTEK - UI/UX Design &amp; Front-End Implementation (official title: Graphic Designer)",
                "2026-Present",
                "Work across brand, product UI, responsive web implementation, and digital production for a "
                "multi-division IoT company. Translate business and product requirements into reusable visual systems "
                "and production-ready digital experiences. B2B IoT build: developed a bilingual production website and "
                "supporting brand system across UI/UX, front-end implementation, visual systems, and delivery.",
            ),
            (
                "AscentMgnt - Front-End / Shopify Developer",
                "2025-2026",
                "Built and optimized production Shopify storefronts including NUUD Pleasures, Strike Brands, Nationwide "
                "Fabric, and Ben Exotics. Developed Liquid sections, schema settings, reusable components, responsive "
                "product/storefront interfaces, UX improvements, analytics/SEO enhancements, and web-performance "
                "optimizations. NUUD Pleasures: contributed to a full redesign and optimization associated with +79% "
                "sessions, +1,100% total sales, +42% orders, and +21% conversion rate; Lighthouse 96 Performance, "
                "97 Accessibility, 92 SEO; Mobile FCP 0.8s, TTFB 0.5s.",
            ),
            (
                "Persistence Labs - UI/UX Designer",
                "2024-2025",
                "Designed responsive product interfaces, interactive Figma prototypes, and reusable design-system "
                "components; prepared developer-ready handoff and optimized production assets for implementation.",
            ),
            (
                "Citriom Software - UI/UX Designer",
                "2022-2025",
                "Redesigned complex internal/government-facing software interfaces and workflows; built design systems, "
                "reusable component libraries, and consistent interaction patterns supporting implementation.",
            ),
            (
                "Energi Core - UI / Visual Designer",
                "2021-2022",
                "Designed responsive websites, landing pages, product visuals, visual systems, 3D illustrations, "
                "animations, and brand assets.",
            ),
            (
                "BittEx IT Solutions - Graphic Designer",
                "2017-2018",
                "Developed branding systems, marketing assets, and digital campaign materials, establishing the "
                "visual-design foundation later applied to product and interface work.",
            ),
        ],
        "footer_heading": "EDUCATION &amp; LANGUAGES",
        "footer": (
            "Master's in Arts - Central University of Venezuela   |   Bachelor's in Journalism - Fermin Toro "
            "University   |   English: C1 Advanced   |   Spanish: Native"
        ),
    },
    "resume-es.pdf": {
        "title": "Product Builder | Diseño de producto, desarrollo front-end y Shopify",
        "profile_heading": "PERFIL",
        "profile": (
            "Product Builder multidisciplinario que trabaja en diseño de producto, UI/UX, ingeniería front-end, "
            "Shopify y desarrollo asistido por IA. Convierte requerimientos de negocio, ideas de producto y conceptos "
            "aprobados en experiencias digitales responsive y listas para producción: desde flujos, prototipos y "
            "sistemas de diseño hasta implementación, QA, optimización y lanzamiento. Combina una larga base en diseño "
            "visual con implementación web práctica, entrega de e-commerce, optimización de rendimiento y colaboración "
            "entre equipos."
        ),
        "skills_heading": "CAPACIDADES PRINCIPALES",
        "skills": [
            ("Producto y UX", "Diseño de producto | Diseño UI/UX | Flujos de usuario | Wireframing | Prototipado | Figma | Diseño responsive"),
            ("Sistemas de UI", "Sistemas de diseño | Librerías de componentes | Patrones de interacción | Handoff a desarrollo | Figma a código"),
            ("Front-end", "HTML | CSS | JavaScript | TypeScript | React | Next.js | Astro | Tailwind CSS | Git/GitHub"),
            ("Commerce", "Shopify Online Store 2.0 | Liquid | Desarrollo de temas | Personalización de temas | Metafields y schema"),
            ("Entrega", "Rendimiento web | Core Web Vitals | UI con enfoque en accesibilidad | QA responsive | Fundamentos de SEO | Analítica | Desarrollo asistido por IA"),
        ],
        "experience_heading": "EXPERIENCIA",
        "experience": [
            (
                "IOTEK - Diseño UI/UX e implementación front-end (cargo oficial: Graphic Designer)",
                "2026-Actualidad",
                "Trabajo en marca, UI de producto, implementación web responsive y producción digital para una empresa "
                "de IoT con varias divisiones. Traduzco requerimientos de negocio y de producto en sistemas visuales "
                "reutilizables y experiencias digitales listas para producción. Proyecto B2B de IoT: desarrollé un "
                "sitio web de producción bilingüe y su sistema de marca, cubriendo UI/UX, implementación front-end, "
                "sistemas visuales y entrega.",
            ),
            (
                "AscentMgnt - Desarrollador front-end / Shopify",
                "2025-2026",
                "Construí y optimicé tiendas Shopify en producción, entre ellas NUUD Pleasures, Strike Brands, "
                "Nationwide Fabric y Ben Exotics. Desarrollé secciones Liquid, ajustes de schema, componentes "
                "reutilizables, interfaces responsive de producto y tienda, mejoras de UX, mejoras de analítica y SEO, "
                "y optimizaciones de rendimiento web. NUUD Pleasures: contribuí a un rediseño y optimización completos "
                "asociados a +79% de sesiones, +1,100% de ventas totales, +42% de pedidos y +21% de tasa de "
                "conversión; Lighthouse 96 en rendimiento, 97 en accesibilidad, 92 en SEO; FCP móvil 0.8s, TTFB 0.5s.",
            ),
            (
                "Persistence Labs - Diseñador UI/UX",
                "2024-2025",
                "Diseñé interfaces de producto responsive, prototipos interactivos en Figma y componentes reutilizables "
                "de sistema de diseño; preparé handoffs listos para desarrollo y optimicé assets de producción para su "
                "implementación.",
            ),
            (
                "Citriom Software - Diseñador UI/UX",
                "2022-2025",
                "Rediseñé interfaces y flujos de software complejos, internos y de cara a entidades gubernamentales; "
                "construí sistemas de diseño, librerías de componentes reutilizables y patrones de interacción "
                "consistentes que respaldaron la implementación.",
            ),
            (
                "Energi Core - Diseñador UI / visual",
                "2021-2022",
                "Diseñé sitios web responsive, landing pages, visuales de producto, sistemas visuales, ilustraciones "
                "3D, animaciones y assets de marca.",
            ),
            (
                "BittEx IT Solutions - Diseñador gráfico",
                "2017-2018",
                "Desarrollé sistemas de branding, assets de marketing y materiales de campañas digitales, sentando la "
                "base de diseño visual que después apliqué al trabajo de producto e interfaces.",
            ),
        ],
        "footer_heading": "EDUCACIÓN E IDIOMAS",
        "footer": (
            "Maestría en Artes - Universidad Central de Venezuela   |   Licenciatura en Periodismo - Universidad "
            "Fermín Toro   |   Inglés: C1 avanzado   |   Español: nativo"
        ),
    },
}

STYLES = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20, leading=23, textColor=INK, spaceAfter=2),
    "title": ParagraphStyle("title", fontName="Helvetica", fontSize=9.5, leading=12, textColor=INK, spaceAfter=3),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.2, leading=10, textColor=MUTED, spaceAfter=10),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=8.5, leading=10, textColor=INK, spaceBefore=7, spaceAfter=4),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=8, leading=10.2, textColor=INK, alignment=TA_JUSTIFY),
    "skillLabel": ParagraphStyle("skillLabel", fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=INK, spaceBefore=2),
    "skillValue": ParagraphStyle("skillValue", fontName="Helvetica", fontSize=8, leading=10.2, textColor=INK),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=8.5, leading=10.5, textColor=INK),
    "years": ParagraphStyle("years", fontName="Helvetica", fontSize=8, leading=10.5, textColor=MUTED, alignment=2),
    "detail": ParagraphStyle("detail", fontName="Helvetica", fontSize=8, leading=10.2, textColor=INK, alignment=TA_JUSTIFY, spaceAfter=5),
}


CONTENT_WIDTH = 7.4 * inch  # LETTER minus the two 0.55in side margins


def rule():
    # Tables are centered in their frame by default, which would inset the
    # rules and the experience rows; hAlign LEFT pins them to the margin.
    table = Table([[""]], colWidths=[CONTENT_WIDTH], rowHeights=[0.5], hAlign="LEFT")
    table.setStyle(TableStyle([("LINEABOVE", (0, 0), (-1, 0), 0.5, RULE), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return table


def build(filename: str, data: dict) -> None:
    path = Path(__file__).resolve().parent.parent / "public" / filename
    doc = BaseDocTemplate(str(path), pagesize=LETTER, title=f"{NAME} - CV", author=NAME, leftMargin=0.55 * inch, rightMargin=0.55 * inch, topMargin=0.5 * inch, bottomMargin=0.4 * inch)
    doc.addPageTemplates([PageTemplate(id="main", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)])])

    flow = [
        Paragraph(NAME, STYLES["name"]),
        Paragraph(data["title"], STYLES["title"]),
        Paragraph(CONTACT, STYLES["contact"]),
        Paragraph(data["profile_heading"], STYLES["section"]),
        rule(),
        Spacer(1, 4),
        Paragraph(data["profile"], STYLES["body"]),
        Paragraph(data["skills_heading"], STYLES["section"]),
        rule(),
        Spacer(1, 2),
    ]

    for label, value in data["skills"]:
        flow.append(Paragraph(label, STYLES["skillLabel"]))
        flow.append(Paragraph(value, STYLES["skillValue"]))

    flow.append(Paragraph(data["experience_heading"], STYLES["section"]))
    flow.append(rule())
    flow.append(Spacer(1, 4))

    for role, years, detail in data["experience"]:
        header = Table(
            [[Paragraph(role, STYLES["role"]), Paragraph(years, STYLES["years"])]],
            colWidths=[CONTENT_WIDTH - 1.5 * inch, 1.5 * inch],
            hAlign="LEFT",
        )
        header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
        flow.append(header)
        flow.append(Paragraph(detail, STYLES["detail"]))

    flow.append(Paragraph(data["footer_heading"], STYLES["section"]))
    flow.append(rule())
    flow.append(Spacer(1, 4))
    flow.append(Paragraph(data["footer"], STYLES["body"]))

    doc.build(flow)
    print(f"Wrote public/{filename}")


if __name__ == "__main__":
    for filename, data in RESUMES.items():
        build(filename, data)

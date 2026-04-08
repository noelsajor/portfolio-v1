# 03 - Frontend Development

This playbook defines the coding standards for React and Next.js development.

## ⚛️ Component Standards
- **Function Components**: Use `export default function` for pages and `export function` for components.
- **Client vs Server**: Default to Server Components. Use `"use client"` only for interactivity (hooks, event listeners).
- **Props**: Always use TypeScript interfaces or types for component props.

## 🏗️ State Management
- **Local State**: Use `useState` for simple component-level state.
- **Forms**: Use Native HTML5 validation + `react-hook-form` for complex forms.
- **Global State**: Avoid global state (Redux/Zustand) unless absolutely necessary. Use URL params or React Context for simple global data.

## 🖼️ Asset Optimization
- **Images**: Always use the `next/image` component. Never use static `<img>` tags.
- **SVGs**: Inline SVGs for brand marks; use external files for large background decorations.
- **Fonts**: Use `next/font` for automatic optimization and zero layout shift (CLS).

## 🚀 Performance Rules
- **Code Splitting**: Dynamic imports for heavy components that are not visible above the fold.
- **Tree Shaking**: Ensure third-party libraries are tree-shakeable.
- **Fetching**: Use the native `fetch` with Next.js caching rules (`tags`, `revalidate`).

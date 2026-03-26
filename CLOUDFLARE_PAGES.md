# Cloudflare Pages Deployment Guide

GeneXplor-Web is a completely static website built with pure HTML, CSS, and vanilla JavaScript. Because there are no build tools (like Webpack, Vite, or React), deploying to Cloudflare Pages is instantaneous.

## Deployment Settings

When setting up your project in the Cloudflare Pages dashboard, use the following configuration:

1. **Connect your GitHub repository:** Select `contact-ajmal/geneXplor-web`.
2. **Production branch:** `main`
3. **Framework preset:** Select `None`
4. **Build command:** *(Leave this blank)*
5. **Build output directory:** `/` *(Or leave this blank)*

## Environment Variables
This specific static showcase website does not require any environment variables.

## Updating the Site
Because Cloudflare Pages is connected to your GitHub repository, any future changes you commit and push to the `main` branch of `geneXplor-web` will automatically trigger a new deployment to the live URL within seconds.

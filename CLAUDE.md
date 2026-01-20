# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Ślonski Gothic" - a Gothic game modification with full Silesian language translation and dubbing. The site features a dark fantasy Gothic theme with 2010-era gaming website aesthetics.

## Architecture

### Multi-page Structure

The website consists of four main HTML pages that share common styling and functionality:

- `index.html` - Main landing page with project info, team, actors, FAQ, partners, and contact sections
- `poradniki.html` - Tutorials page for installation guides
- `sklep.html` - Shop page for merchandise
- `zmiany.html` - Changelog page (noindex)

All pages share:
- Common navigation structure (with dropdown menus)
- Particle canvas background effect
- Same visual theme and ornamental decorations
- Shared CSS (`styles.css`) and JavaScript (`script.js`)

### Styling System (styles.css - 2733 lines)

**CSS Variables** (`:root`):
- Color palette: Dark backgrounds (`--color-bg-dark`, `--color-bg-medium`), gold accents (`--color-gold`), fire colors (`--color-fire`), mystical teal (`--color-mist`)
- Typography: Three font families - `--font-display` (Cinzel Decorative), `--font-heading` (Cinzel), `--font-body` (Cormorant Garamond)
- Shadows: Glow effects (`--shadow-glow`, `--shadow-fire`, `--shadow-mist`)
- Animations: Custom easing functions (`--ease-dramatic`, `--ease-bounce`)

**Key Visual Components**:
- Marble texture overlays on sections
- Ornate borders with runes (ᛟ, ᚱ, ᚹ, ᛉ) in corners
- Chain decorations on navigation
- Particle effects (embers and mystical mist)
- Progress bars with animations
- FAQ accordion system
- Dropdown navigation menus
- Gothic-themed buttons and frames

### JavaScript Functionality (script.js - 429 lines)

**Module Pattern**: All features are initialized on `DOMContentLoaded`:

1. `initMarbleOverlays()` - Dynamically adds marble texture overlays to sections
2. `initParticles()` - Canvas-based particle system with golden embers and teal mist particles
3. `initProgressBar()` - Animates progress bar using IntersectionObserver
4. `initFAQ()` - Accordion functionality for FAQ items
5. `initAudioPlayer()` - Controls ambient audio playback (currently no audio files present)
6. `initSmoothScroll()` - Smooth scrolling with header offset for anchor links
7. `initNavHighlight()` - Highlights active navigation based on scroll position
8. `initScrollReveal()` - Reveals section frames on scroll using IntersectionObserver
9. `initDropdowns()` - Navigation dropdown menus with click and hover support
10. `initParallax()` - Optional parallax background effect

**Particle System Details**:
- 50 particles with varied colors (gold, orange/fire, teal, dust)
- Upward movement with wave motion
- Radial gradient glow effects on larger particles
- Automatic reset when particles reach top or fade out

### Navigation Structure

**Main Navigation Features**:
- Ornate frame with decorative corners and runes
- Dropdown menus for "Zespół" (Team/Actors) and "Więcej" (More/FAQ/Media/Partners)
- Click-to-toggle on mobile, hover-to-open on desktop (>768px)
- Active link highlighting based on scroll position
- Shared across all pages with minor variations

**Navigation Sections**:
- Home/Start → #home
- Project/Projekt → #about
- Download/Pobierz → #download
- Team dropdown → #team, #aktorzy
- More dropdown → #faq, #media, #partnerzy, #patronat
- Contact/Kontakt → #contact
- Tutorials link → poradniki.html
- Shop link → sklep.html

### Asset Organization

`assets/` directory contains:
- `logo.png` - Main Ślonski Gothic logo
- `marble_texture.png` - Stone wall texture overlay
- `ingame_menu.webp`, `ingame_menu_backdrop.webp`, `ingame_loader.png` - Game screenshots
- `divider.png` - Decorative divider
- `patronat_gothicup.png` - Partner logo
- `actors/` - Actor profile images
- `team/` - Team member images
- `partners/` - Partner logos
- `platforms/` - Platform icons

Audio files referenced but not present:
- `assets/ambient.mp3`
- `assets/ambient.ogg`

## Development Workflow

### Testing Changes
Since this is a static site, simply open the HTML files in a browser:
```bash
# On Windows (from Git Bash or WSL)
start index.html
# Or open directly in browser
```

### File Modification Guidelines

**When modifying HTML**:
- Maintain consistent ornamental structure (section-frame, nav-frame patterns)
- Keep rune decorations consistent (ᛟ, ᚱ, ᚹ, ᛉ, ◆)
- Preserve accessibility attributes (`aria-hidden`, title attributes)
- All pages should include the particle canvas: `<canvas id="particles"></canvas>`

**When modifying CSS**:
- Use CSS variables from `:root` for colors and fonts
- Maintain the Gothic theme aesthetic (dark, ornate, gold accents)
- Preserve responsive breakpoints (768px for mobile/desktop)
- Keep animation timings consistent with theme (dramatic, not rapid)

**When modifying JavaScript**:
- Add new features as separate `init*()` functions
- Call them from the main `DOMContentLoaded` listener
- Use IntersectionObserver for scroll-based animations (better performance)
- Maintain consistent particle system colors (gold, fire, teal, dust)

### Common Patterns

**Section Structure**:
```html
<section id="section-name" class="section">
    <div class="section-frame">
        <h2 class="section-title">Title</h2>
        <div class="ornament"></div>
        <!-- Content here -->
    </div>
</section>
```

**Button Structure**:
```html
<a href="#" class="cta-button">
    <span class="btn-decoration btn-decoration-left">⟨</span>
    <span class="btn-text">Text</span>
    <span class="btn-decoration btn-decoration-right">⟩</span>
</a>
```

## Language and Content

- Primary language: Polish (lang="pl")
- Theme: Silesian Gothic - Gothic game mod with Silesian dubbing
- Tone: Dark fantasy, medieval, ornate
- Cultural context: Silesian language preservation project

## Key Constraints

- No build process - pure HTML/CSS/JS
- No package.json or dependencies
- Font loading from Google Fonts (Cinzel Decorative, Cinzel, Cormorant Garamond)
- Static hosting suitable (GitHub Pages)
- Responsive design with mobile breakpoint at 768px

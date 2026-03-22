# Smart Crop Disease Detection System

## Current State
A React + TypeScript dashboard with 8 sections: Home, Disease Detection, Crop Health Overview, Field Coverage, Device Status, Disease Library, Farmer Guidance, Footer. Uses Recharts for pie chart, shadcn/ui components, animated progress bars, and agriculture-themed green color scheme. Backend provides detections, health stats, device status, and disease library data.

## Requested Changes (Diff)

### Add
- **Multilingual support**: Language selector in header (English, Telugu, Hindi). All static text (labels, headings, descriptions, guidance steps, nav links, etc.) must switch language when user selects. Use a translations object.
- **Multispectral Analysis**: In Disease Detection section, each disease card has a "View Multispectral Analysis" toggle button. Clicking it reveals a side-by-side panel:
  - Left: original leaf image
  - Right: processed multispectral-style image with CSS color overlay (red/yellow = diseased, green/blue = healthy), glowing effect on diseased regions, boundary outlines around infected areas using CSS
  - Legend explaining colors: Red/Yellow = Diseased, Green/Blue = Healthy
  - Bar chart showing Healthy vs Diseased percentage
  - Affected Area percentage, disease name, pesticide/remedy
  - Note: "This is AI-based analysis for early disease detection"
- **Floating Feedback Button**: Fixed button at bottom-right corner (chat bubble icon). Clicking opens a modal/drawer form:
  - Name (optional)
  - Language selection (English / Telugu / Hindi)
  - Large textarea for feedback/suggestion
  - Submit button
  - After submit: show thank you message "Thank you for your feedback. We will improve the system."
  - Simple, large text, farmer-friendly green theme

### Modify
- Header: Add language selector dropdown (EN / తె / हि)
- Disease Detection section: enhance cards with multispectral toggle panel
- All section text: wrap in translation function so it switches based on selected language
- Scroll-to-top button: move to bottom-right slightly above feedback button

### Remove
- Nothing removed

## Implementation Plan
1. Create a `translations.ts` file with English, Telugu, Hindi translations for all static text
2. Add language state (default English) at App level, pass down via context or props
3. Add language selector in header (flag/abbreviation dropdown)
4. Update all static text in all sections to use translation keys
5. Add MultispectralPanel component: side-by-side images with CSS overlay, legend, bar, stats
6. Add "View Multispectral Analysis" toggle to each disease card
7. Add FeedbackButton floating component with modal form
8. Ensure mobile responsiveness throughout

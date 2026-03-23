# Smart Crop Disease Detection System

## Current State
Project has been built multiple times (V1-V5). Previous versions included multilingual support (EN/Telugu/Hindi), multispectral analysis panels, floating feedback chatbox, disease library with 4 crops (Tomato, Potato, Wheat, Cotton), and real diseased leaf images in Disease Detection section. Draft has expired.

## Requested Changes (Diff)

### Add
- Upload Leaf Image button in Disease Detection section (simulates AI result using placeholder data after any image is uploaded)
- AI result card showing: Plant Name, Uploaded Image preview, Disease Name, Confidence %, Affected Area %, Recommended Treatment
- AI-Based Leaf Health Visualization panel (side-by-side original + color-overlay processed image, glow effects, boundary outlines, healthy vs diseased bar chart, affected area %, treatment)
- "Simulation Mode Active" note in Device Status section
- Field Coverage section with animated progress bar

### Modify
- Rename "Multispectral Analysis" → "AI-Based Leaf Health Visualization" everywhere
- Disease Library reduced to 2 crops: Tomato and Wheat (with real diseased leaf images)
- Rebuild entire frontend fresh with updated spec

### Remove
- Potato and Cotton from Disease Library
- Old multispectral analysis label

## Implementation Plan
1. Generate diseased leaf images: tomato late blight, wheat rust (photorealistic)
2. Build single-page React app with all 8 sections: Home, Disease Detection (with upload + AI sim + visualization), Crop Health Overview, Field Coverage, Device Status, Disease Library (Tomato + Wheat), Farmer Guidance, Footer
3. Multilingual support (EN/Telugu/Hindi) via language context
4. Floating feedback chatbox
5. Smooth scrolling, animated progress bars, mobile responsive
6. All sections use agriculture theme (green, light brown, white)

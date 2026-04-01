# Quick Reference: Responsive Design Implementation

## Mobile-First Pattern
```jsx
// Base (mobile) → Tablet → Desktop → Large Screen
className="size-X sm:size-Y md:size-Z lg:size-W"
```

## Common Responsive Classes

### Text Sizing
```jsx
// Headings
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"

// Body text
className="text-sm sm:text-base md:text-lg"

// Small text
className="text-xs sm:text-sm md:text-base"
```

### Image/Icon Sizing
```jsx
// Profile images
className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48"

// Icons
className="w-10 sm:w-12 md:w-14 lg:w-16"
className="size-12 sm:size-14 md:size-16"
```

### Padding/Margins
```jsx
// Container padding
className="px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24"

// Button padding
className="px-3 sm:px-4 py-2 sm:py-3"

// Gap between items
className="gap-3 md:gap-6 lg:gap-10"
```

### Grid Layouts
```jsx
// Single to Multi-column
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// With responsive gap
className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
```

### Flexbox
```jsx
// Responsive direction
className="flex flex-col sm:flex-row gap-4 md:gap-6"

// Responsive sizing
className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
```

## Component Examples

### Responsive Card
```jsx
<div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Title</h3>
  <p className="text-sm sm:text-base text-gray-200 mt-2 md:mt-4">Content</p>
</div>
```

### Responsive Button
```jsx
<button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:scale-105 transition-transform">
  Click Me
</button>
```

### Responsive Image
```jsx
<img 
  src="image.jpg" 
  alt="Description"
  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg"
/>
```

### Responsive Section
```jsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8">
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
    Section Title
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {/* Content */}
  </div>
</section>
```

## Testing Breakpoints

```javascript
// DevTools - Test these widths:
320px  → Mobile (sm)
640px  → Mobile (sm)
768px  → Tablet (md)
1024px → Desktop (lg)
1280px → Large (xl)
1920px → Full HD
2560px → 4K
```

## CSS Classes Reference

### Responsive Visibility
```jsx
// Hide on mobile, show on tablet
className="hidden sm:block"

// Show on mobile, hide on desktop
className="block lg:hidden"
```

### Responsive Display
```jsx
// Different display types
className="flex flex-col md:flex-row"
className="grid grid-cols-1 lg:grid-cols-2"
```

### Responsive Text Alignment
```jsx
className="text-left md:text-center lg:text-right"
```

## Color & Theme Responsiveness

```jsx
// Responsive colors (when needed)
className="bg-blue-500 hover:bg-blue-600"

// Gradients
className="bg-gradient-to-r from-blue-400 to-purple-500"
```

## Common Issues & Fixes

### Issue: Text too small on mobile
**Fix**: Ensure text starts with `text-sm sm:text-base md:text-lg` minimum

### Issue: Image distorted
**Fix**: Use equal width/height: `w-24 h-24` not just `w-24`

### Issue: Touch target too small
**Fix**: Mobile buttons min `h-10 w-10` (40px), better at `h-12 w-12` (48px)

### Issue: Content overflows horizontally
**Fix**: Use `px-3 sm:px-4` container padding, check max-widths

### Issue: Gap looks different sizes
**Fix**: Use responsive gap: `gap-3 md:gap-6 lg:gap-10`

## Performance Tips

1. **Always use base class first** (mobile-first)
   ```jsx
   ✅ className="text-sm md:text-base" // Good
   ❌ className="md:text-base text-sm" // Bad order
   ```

2. **Reuse patterns** across components
   ```jsx
   // Use consistent spacing pattern everywhere
   className="px-3 sm:px-4 md:px-6"
   ```

3. **Minimize breakpoint switches**
   ```jsx
   ✅ className="w-24 sm:w-32 md:w-40" // 3 sizes
   ❌ className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40" // Too many
   ```

4. **Group related responsive classes**
   ```jsx
   // Good grouping
   className="text-sm sm:text-base md:text-lg lg:text-xl"
   
   // Spread similar changes together
   className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14"
   ```

## Accessibility Considerations

### Responsive Touch Targets
```jsx
// Min 44x44px on mobile
className="py-3 px-4 sm:py-3 sm:px-6"
```

### Responsive Text Size
```jsx
// Never go below 16px on mobile for body text
className="text-base sm:text-lg" // Good
className="text-xs sm:text-base" // Risky on mobile
```

### Prefers Reduced Motion
```jsx
// Always included in animations
@media (prefers-reduced-motion: reduce) {
  animation: none;
  transition: none;
}
```

## Device Width Quick Reference

| Device | Width | Breakpoint |
|--------|-------|-----------|
| iPhone SE | 375px | base/sm |
| iPhone 12 | 390px | base/sm |
| iPhone 13 Pro Max | 430px | sm |
| Google Pixel | 393px | base/sm |
| iPad (portrait) | 768px | md |
| iPad (landscape) | 1024px | lg |
| Desktop | 1920px | xl |
| 4K Desktop | 2560px | xl |

## Version History

- **Current**: All components responsive (5 breakpoints)
- **Before**: Limited mobile support, hard-coded sizes
- **Improvements**: Mobile-first, scalable, touch-friendly

---

**Tip**: When adding new components, always start with mobile sizing first, then add responsive classes for larger screens. This ensures mobile users get the best experience.

For detailed examples, see: `RESPONSIVE_DESIGN_GUIDE.md`
For testing checklist, see: `RESPONSIVE_TESTING_CHECKLIST.md`

# Design Documentation

## 🎨 Design Translation Guide

This document explains how each design element from the mockup was translated into code using Tailwind CSS tokens and React components.

## 🎯 Design System

### Color Palette Mapping

| Design Element | Tailwind Token | Hex Value | Usage |
|----------------|----------------|------------|-------|
| Primary Blue | `primary-600` | `#2563eb` | Main actions, buttons, highlights |
| Primary Light | `primary-50` | `#eff6ff` | Selected states, backgrounds |
| Primary Dark | `primary-800` | `#1e40af` | Dark mode accents |
| Secondary Light | `secondary-50` | `#f8fafc` | Page backgrounds |
| Secondary Medium | `secondary-200` | `#e2e8f0` | Borders, dividers |
| Secondary Dark | `secondary-800` | `#1e293b` | Dark mode backgrounds |
| Success Green | `green-600` | `#059669` | AI responses, success states |
| Warning Yellow | `yellow-600` | `#d97706` | Performance indicators |
| Error Red | `red-600` | `#dc2626` | Error states, destructive actions |

### Typography Scale

| Element | Tailwind Class | Font Size | Line Height | Weight |
|---------|----------------|-----------|-------------|---------|
| Page Title | `text-xl` | `1.25rem` | `1.75rem` | `font-bold` |
| Section Headers | `text-lg` | `1.125rem` | `1.75rem` | `font-semibold` |
| Component Headers | `text-sm` | `0.875rem` | `1.25rem` | `font-medium` |
| Body Text | `text-sm` | `0.875rem` | `1.25rem` | `font-normal` |
| Caption Text | `text-xs` | `0.75rem` | `1rem` | `font-normal` |

### Spacing System

| Spacing | Tailwind Class | Pixels | Usage |
|---------|----------------|--------|-------|
| XS | `p-1` | `4px` | Icon buttons, small elements |
| Small | `p-2` | `8px` | Button padding, tight spacing |
| Medium | `p-3` | `12px` | Card padding, component spacing |
| Large | `p-4` | `16px` | Section padding, content spacing |
| XL | `p-6` | `24px` | Page margins, major sections |

## 🏗️ Component Architecture

### 1. Header Component

**Design Elements:**
- Logo with AI branding (Zap icon + "AI Interface" text)
- Menu toggle button for mobile sidebar
- Settings button for future functionality

**Code Translation:**
```tsx
// Branding with icon and text
<div className="flex items-center gap-2">
  <Zap className="text-primary-600" size={24} />
  <h1 className="text-xl font-bold text-secondary-900 dark:text-white">
    AI Interface
  </h1>
</div>

// Menu toggle with hover states
<button className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
  <Menu size={20} />
</button>
```

**Tailwind Token Mapping:**
- `text-primary-600`: Brand color for the lightning bolt icon
- `text-xl font-bold`: Large, bold text for the main title
- `hover:bg-secondary-100`: Light background on hover
- `transition-colors`: Smooth color transitions

### 2. Sidebar Component

**Design Elements:**
- Collapsible sidebar with three main tabs
- Responsive behavior (hidden on mobile, persistent on desktop)
- Smooth slide-in/out animations

**Code Translation:**
```tsx
// Responsive sidebar with transform animations
<aside className={cn(
  "fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
  isOpen ? "translate-x-0" : "-translate-x-full"
)}>

// Tab navigation with active states
<div className="flex border-b border-secondary-200 dark:border-secondary-700">
  {tabs.map((tab) => (
    <button className={cn(
      "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors",
      activeTab === tab.id
        ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:bg-primary-900/20"
        : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 dark:hover:bg-secondary-700"
    )}>
```

**Tailwind Token Mapping:**
- `w-80`: Fixed width of 320px for sidebar
- `transform transition-transform duration-300`: Smooth slide animations
- `lg:translate-x-0`: Desktop behavior (always visible)
- `border-b-2 border-primary-600`: Active tab indicator

### 3. Model Selector Component

**Design Elements:**
- Card-based model selection with performance indicators
- Visual icons for each model type
- Performance metrics (speed, intelligence, cost)

**Code Translation:**
```tsx
// Model card with selection states
<button className={cn(
  "w-full p-4 rounded-lg border transition-all duration-200 text-left",
  isSelected
    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
    : "border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600"
)}>

// Performance indicators with color coding
<span className={cn("flex items-center gap-1", getSpeedColor(model.speed))}>
  <Zap size={12} />
  {model.speed}
</span>
```

**Tailwind Token Mapping:**
- `p-4`: Consistent card padding
- `border-primary-500`: Selected state border
- `bg-primary-50`: Selected state background
- `hover:border-secondary-300`: Hover state enhancement

### 4. Parameter Panel Component

**Design Elements:**
- Range sliders for AI parameters
- Real-time value display
- Parameter descriptions and help text

**Code Translation:**
```tsx
// Parameter slider with value display
<div className="flex items-center justify-between">
  <label className="text-sm font-medium text-secondary-900 dark:text-white">
    {param.name}
  </label>
  <span className="text-sm text-secondary-600 dark:text-secondary-400">
    {values[param.id]}{param.unit && ` ${param.unit}`}
  </span>
</div>

// Range input with custom styling
<input
  type="range"
  className="w-full h-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg appearance-none cursor-pointer slider"
/>
```

**Tailwind Token Mapping:**
- `h-2`: Slider height of 8px
- `bg-secondary-200`: Light background for slider track
- `dark:bg-secondary-700`: Dark mode slider track
- `rounded-lg`: Rounded corners for modern appearance

### 5. Prompt Editor Component

**Design Elements:**
- Large text area for prompt input
- File upload functionality
- Toolbar with save/load/reset actions

**Code Translation:**
```tsx
// Auto-expanding textarea
<textarea
  ref={textareaRef}
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  className="w-full min-h-[200px] p-4 text-sm border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
/>

// Action buttons with states
<button
  type="submit"
  disabled={!prompt.trim() || isLoading}
  className={cn(
    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    isLoading
      ? "bg-secondary-300 text-secondary-600 cursor-not-allowed"
      : "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
  )}
>
```

**Tailwind Token Mapping:**
- `min-h-[200px]`: Minimum height for text area
- `focus:ring-2 focus:ring-primary-500`: Focus state with blue ring
- `hover:shadow-xl`: Enhanced shadow on hover
- `hover:-translate-y-0.5`: Subtle upward movement on hover

### 6. Chat Area Component

**Design Elements:**
- Message bubbles with user/AI distinction
- Timestamps and action buttons
- Loading states with streaming simulation

**Code Translation:**
```tsx
// Message bubble with role-based styling
<div className={cn(
  "flex gap-3 p-4 rounded-lg border transition-all duration-200",
  message.role === 'user'
    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700"
    : "bg-white dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700"
)}>

// Loading indicator with animated cursor
<div className="text-sm text-secondary-800 dark:text-secondary-200">
  {currentResponse}
  <span className="inline-block w-2 h-4 bg-secondary-400 dark:bg-secondary-500 ml-1 animate-pulse" />
</div>
```

**Tailwind Token Mapping:**
- `bg-primary-50`: User message background
- `border-primary-200`: User message border
- `animate-pulse`: Loading cursor animation
- `gap-3`: Consistent spacing between elements

## 🎭 Animation & Micro-interactions

### Transition System

| Animation Type | Tailwind Class | Duration | Easing | Usage |
|----------------|----------------|----------|---------|-------|
| Color Changes | `transition-colors` | `200ms` | `ease` | Hover states, theme switching |
| Transform | `transition-transform` | `300ms` | `ease-in-out` | Sidebar animations |
| All Properties | `transition-all` | `200ms` | `ease` | Complex state changes |

### Hover Effects

```tsx
// Button hover with transform and shadow
className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"

// Card hover with border enhancement
className="border-secondary-200 hover:border-secondary-300 dark:hover:border-secondary-600"
```

### Focus States

```tsx
// Input focus with ring and border
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"

// Button focus with offset ring
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

## 📱 Responsive Design Implementation

### Breakpoint Strategy

| Breakpoint | Tailwind Prefix | Layout Behavior |
|------------|-----------------|-----------------|
| Mobile | Default | Single column, collapsible sidebar |
| Tablet | `md:` | Adaptive layout, partial sidebar |
| Desktop | `lg:` | Full sidebar + content layout |

### Mobile Adaptations

```tsx
// Sidebar behavior
className="fixed lg:static inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0"

// Content layout
className="flex-1 flex flex-col lg:flex-row"

// Responsive margins
className="w-full lg:w-1/2 p-6 border-r border-secondary-200 dark:border-secondary-700"
```

## ♿ Accessibility Implementation

### ARIA Labels

```tsx
// Descriptive button labels
<button aria-label="Toggle sidebar">
  <Menu size={20} />
</button>

// Form labels with proper association
<label htmlFor="prompt" className="text-sm font-medium text-secondary-900 dark:text-white">
  Your Prompt
</label>
```

### Keyboard Navigation

```tsx
// Focus management
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"

// Disabled states
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

### Color Contrast

- **Light Mode**: Primary text on light backgrounds meets WCAG AA standards
- **Dark Mode**: Light text on dark backgrounds provides excellent contrast
- **Interactive Elements**: High contrast focus states for visibility

## 🔧 Custom CSS Integration

### Slider Styling

```css
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Scrollbar Customization

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
```

### Animation Keyframes

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 📊 Design Token Consistency

### Spacing Scale

All spacing values follow the 4px base unit system:
- `4px` → `p-1`, `m-1`
- `8px` → `p-2`, `m-2`
- `12px` → `p-3`, `m-3`
- `16px` → `p-4`, `m-4`
- `24px` → `p-6`, `m-6`

### Color Consistency

Primary colors are used consistently across:
- **Interactive Elements**: Buttons, links, focus states
- **Status Indicators**: Selected states, active tabs
- **Branding**: Logo, primary actions

Secondary colors for:
- **Backgrounds**: Page backgrounds, card backgrounds
- **Borders**: Dividers, input borders, card borders
- **Text**: Secondary text, captions, placeholders

### Typography Hierarchy

- **H1**: Page titles and main headings
- **H2**: Section headers and component titles
- **H3**: Subsection headers and form labels
- **Body**: Main content and descriptions
- **Caption**: Metadata, timestamps, small text

## 🎯 Design Validation

### Visual Consistency

- All interactive elements use consistent hover states
- Color usage follows the established palette
- Spacing maintains the 4px grid system
- Typography follows the defined scale

### Responsive Behavior

- Mobile-first approach with progressive enhancement
- Sidebar behavior adapts to screen size
- Content layout adjusts for different viewports
- Touch targets meet accessibility requirements

### Accessibility Compliance

- WCAG AA color contrast standards met
- Keyboard navigation fully functional
- Screen reader compatibility verified
- Focus management properly implemented

This design system ensures a cohesive, accessible, and professional user experience across all components and screen sizes.

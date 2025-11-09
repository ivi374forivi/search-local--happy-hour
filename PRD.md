# Planning Guide

HappyHourAI is the quickest path from "What's good tonight?" to finding the perfect happy hour deal near you - eliminating the hassle of checking dozens of websites. **Now enhanced with modern glassmorphism aesthetics, extensive animations, and dynamic 3D interactions.**

**Experience Qualities**:
1. **Effortless** - Finding a great deal should take seconds, not minutes of scrolling through outdated websites. The interface flows naturally with intuitive interactions and smooth transitions.
2. **Trustworthy** - Every deal shown is current, verified, and clearly timestamped so users feel confident. Visual cues reinforce reliability.
3. **Joyful** - The experience should feel like the exciting start of a good night out, not a chore. Delightful animations and vibrant design evoke celebration and anticipation.

**Complexity Level**: Light Application (multiple features with basic state) **→ Enhanced to Medium Application with advanced UI/UX**
  - Core functionality includes search/filter, venue browsing, and deal discovery with persistent favorites and user preferences
  - **NEW**: Advanced glassmorphism design system, 3D interactive elements, comprehensive animation framework, floating decorative elements, real-time statistics, and dynamic visual feedback throughout

## Essential Features

### Location-Based Happy Hour Discovery
- **Functionality**: Search and display nearby venues with active happy hour deals based on user location or ZIP code input
- **Purpose**: Instantly show relevant options without making users hunt through irrelevant results
- **Trigger**: User opens app or enters a new location
- **Progression**: Landing screen → Location permission/input → Filtered list of active deals → Venue details
- **Success criteria**: Users can see 5-10 relevant venues within 3 seconds of providing location

### Time-Aware Deal Filtering
- **Functionality**: Automatically highlight deals that are active right now, with ability to filter by specific times, days, and deal types
- **Purpose**: Eliminate confusion about "when is this valid?" and help users plan ahead
- **Trigger**: User views list or applies filter
- **Progression**: View deals → Apply time/day filter → See refined results → Select venue
- **Success criteria**: Deals clearly indicate current availability; filters reduce results meaningfully

### Venue Detail Pages
- **Functionality**: Rich view of each venue showing address, current deals, menu items with prices, atmosphere tags, and user ratings
- **Purpose**: Give users confidence to make a decision without needing to visit external sites
- **Trigger**: User taps/clicks a venue from list or map
- **Progression**: List view → Tap venue → See full details → Navigate or save
- **Success criteria**: All essential decision-making info visible without scrolling excessively

### Save & Share Favorites
- **Functionality**: Bookmark favorite venues and share specific deals with friends via link
- **Purpose**: Build habits and enable social coordination around happy hour plans
- **Trigger**: Heart icon on venue card or share button
- **Progression**: Find deal → Save/Share → Access later from favorites or send link
- **Success criteria**: Favorites persist across sessions; shared links open directly to venue

### Deal Type & Price Filtering
- **Functionality**: Filter by drink type (beer, wine, cocktails), food availability, price range, and atmosphere tags
- **Purpose**: Match user preferences and budgets without overwhelming them with irrelevant options
- **Trigger**: User opens filter panel
- **Progression**: View results → Open filters → Select criteria → View refined list
- **Success criteria**: Each filter reduces results logically; multiple filters work together

## Edge Case Handling

- **No Location Permission**: Gracefully prompt for ZIP code entry with helpful examples
- **No Active Deals**: Show "Check back soon" message with option to view all venues or upcoming deals
- **Expired Data**: Display last-updated timestamp; fade out or hide deals over 48 hours old
- **Empty Search Results**: Suggest expanding search radius or relaxing filters
- **Slow Network**: Show skeleton loading states; cache previously viewed venues
- **Invalid ZIP Code**: Provide inline validation with friendly error message

## Design Direction

The design should feel modern, vibrant, and social - evoking the optimism of after-work gatherings while maintaining clarity and speed. Think "Friday evening energy" rather than corporate or cluttered. The interface should be minimal and focused, removing every unnecessary click between the user and their perfect happy hour.

**Enhanced Implementation**: Modern glassmorphism aesthetic with semi-transparent cards, backdrop blur effects, layered shadows for depth, and stacked 3D elements. Animated gradient backgrounds with parallax drift effects. Extensive use of spring physics animations for natural, delightful interactions. Mouse-tracking 3D tilt effects on cards. Floating decorative elements throughout the interface.

## Color Selection

Triadic color scheme (three equally spaced colors) that evokes warmth, celebration, and trust - balancing the excitement of nightlife with the reliability of accurate information.

- **Primary Color**: Deep Ocean Blue (oklch(0.45 0.14 250)) - Communicates trust and sophistication, used for primary actions and navigation
- **Secondary Colors**: 
  - Sunset Coral (oklch(0.72 0.15 35)) - Warm and inviting for secondary actions and highlights
  - Soft Amber (oklch(0.82 0.12 75)) - Cheerful and energetic for accents and deal tags
- **Accent Color**: Vibrant Gold (oklch(0.75 0.16 85)) - Attention-grabbing highlight for active deals, CTA buttons, and special offers
- **Foreground/Background Pairings**:
  - Background (Soft Cream oklch(0.98 0.01 85)): Deep Navy text (oklch(0.25 0.08 250)) - Ratio 11.2:1 ✓
  - Card (Pure White oklch(1 0 0)): Deep Navy text (oklch(0.25 0.08 250)) - Ratio 12.8:1 ✓
  - Primary (Deep Ocean Blue oklch(0.45 0.14 250)): White text (oklch(1 0 0)) - Ratio 7.1:1 ✓
  - Secondary (Sunset Coral oklch(0.72 0.15 35)): Deep Navy text (oklch(0.25 0.08 250)) - Ratio 5.2:1 ✓
  - Accent (Vibrant Gold oklch(0.75 0.16 85)): Deep Navy text (oklch(0.25 0.08 250)) - Ratio 4.9:1 ✓
  - Muted (Light Blue Grey oklch(0.94 0.02 250)): Medium Navy text (oklch(0.48 0.06 250)) - Ratio 5.8:1 ✓

## Font Selection

Typefaces should feel friendly and contemporary without sacrificing legibility - balancing the casual energy of social plans with the clarity needed for scanning deals quickly.

- **Primary Font**: Inter (body text, UI elements) - Clean, highly legible, modern sans-serif
- **Display Font**: Cal Sans (headings, venue names) - Slightly playful and warm for personality

- **Typographic Hierarchy**:
  - H1 (App Title/Hero): Cal Sans SemiBold/32px/tight letter spacing/-0.02em
  - H2 (Section Heads): Inter Bold/24px/normal letter spacing/-0.01em
  - H3 (Venue Names): Cal Sans Medium/20px/normal letter spacing
  - Body (Deal Details): Inter Regular/16px/relaxed line height/1.6
  - Small (Times, Tags): Inter Medium/14px/normal letter spacing
  - Caption (Metadata): Inter Regular/12px/slight letter spacing/0.01em

## Animations

Animations should enhance the sense of discovery and celebration, making the experience feel alive and responsive, while never delaying critical information or actions.

- **Purposeful Meaning**: Quick spring animations on deal cards create energy; smooth transitions between views maintain spatial context; subtle pulse on "active now" badges draws attention to urgency. **Enhanced with 3D transforms, mouse tracking, shimmer effects, and floating ambient animations.**
- **Hierarchy of Movement**: Primary focus on deal appearance and filtering transitions (300ms); secondary on favorites/saves (200ms); subtle hover states on interactive elements (150ms). **Added staggered entrance animations (50ms delays), continuous ambient animations (2-6s loops), and gesture-responsive 3D tilting.**

**New Animation Types Implemented**:
- **Pulse Glow**: Box-shadow expansion for active elements (2s loop)
- **Shimmer**: Gradient sweep on hover interactions (3s infinite)
- **Floating**: Vertical translation with rotation for ambient life (6s loop)
- **Parallax Drift**: Background gradient movement (30s loop)
- **3D Tilt**: Mouse-tracking perspective transforms on cards
- **Stacked Layers**: Pseudo-element depth effects with progressive blur
- **Spring Physics**: Natural bounce on all interactive elements
- **Stagger Cascade**: Sequential reveals with 50-100ms delays
- **Icon Rotations**: 180-360° spins on state changes
- **Scale Transforms**: 1.05x hover, 0.95x tap feedback

## Component Selection

- **Components**:
  - **Cards**: Venue and deal cards with glassmorphic backgrounds, backdrop blur, multi-layer shadows, 3D stacked effects, and mouse-tracking tilt on hover
  - **Buttons**: Primary (gradient accent), Secondary (outline coral with glass), Ghost (for filters) - all with spring physics on interaction
  - **Input**: Search field with icon prefix, glass background, animated focus ring with gradient glow
  - **Badges**: Rounded badges with pulse glow for active states, gradient fills, icon integration
  - **Dialog**: Enhanced with glass-strong background, staggered content reveals, larger sizing for impact
  - **Stats Cards**: New quick statistics component with animated icons and gradient backgrounds
  - **Floating Decor**: Ambient animated icons drifting across the background
  - **ScrollArea**: For long venue lists and deal details with custom styling
  - **Switch**: Animated toggle for "active now" filter with scale feedback
  - **Separator**: Subtle translucent dividers matching glass aesthetic

- **Customizations**:
  - **Venue Cards**: Glass backgrounds, 3D mouse tracking, image zoom on hover, shimmer overlay, stacked pseudo-elements, gradient overlays
  - **Filter Panel**: Glass card with floating animation, gradient buttons on selection, active filter summary section
  - **Time Indicator**: Animated pulse glow on "active now" badges with continuous subtle scale
  - **Price Display**: Gradient badge groups with hover scale and pulse effects
  - **Header**: Scroll-responsive opacity, animated logo glow, dynamic shadow intensity
  - **Empty States**: Glass containers with floating animation and gradient text

- **States**:
  - **Buttons**: Default solid/glass, hover with 1.05x scale + brightness, active with 0.95x press, disabled with 40% opacity
  - **Cards**: Default with glass blur, hover with enhanced shadow + 1.03x scale + 3D tilt, selected with accent border + glow
  - **Inputs**: Default glass, focus with accent ring + gradient expansion + border color shift, error with destructive color
  - **Interactive Elements**: All have tap feedback (0.9-0.95x scale), rotation effects on state change, spring physics transitions

- **Icon Selection**:
  - MapPin for location (primary color, filled)
  - FunnelSimple for filters (rotates 180° on toggle)
  - Heart/HeartFilled for favorites (pulses on toggle)
  - Clock for time (with active deal indicators)
  - ShareNetwork for sharing
  - MagnifyingGlass for search
  - Wine, BeerBottle, Martini, ForkKnife for deal types (rotate on selection)
  - Star/StarFilled for ratings (accent color)
  - NavigationArrow for directions
  - **Sparkle for accents and magical moments (accent color)**
  - **Fire, TrendUp for statistics**

- **Spacing**:
  - Container padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
  - Card gaps: gap-6 → gap-8 in grid layouts (increased for breathing room)
  - Section spacing: mb-8 → mb-12 between major sections
  - Internal card padding: p-6 (compact), p-8 (detailed) - increased for premium feel
  - Button padding: px-6 py-3 (primary), px-4 py-2 (secondary)
  - Border radius: 1rem base, up to 3rem (rounded-3xl) for cards

- **Mobile**:
  - Single column card layout below 768px
  - Bottom sheet for filters and venue details on mobile (future enhancement)
  - Sticky glass header with scroll-responsive styling
  - Larger touch targets (min 44px) for all interactive elements
  - Reduced animation complexity on mobile for performance
  - Floating decorations adapted for smaller screens
  - Stats cards stack vertically with maintained animations

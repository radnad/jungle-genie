# Jungle Genie plant storefront

_Started 2026-06-29 09:24 UTC_

---

## User

DESIGN SYSTEM PROMPT — "Jungle Genie" 🧞🌿
Responsive WEB plant storefront · design system + 4 core screens

────────────────────────────────────
WHAT IT IS
────────────────────────────────────
An online-only plant shop (Egypt, prices in EGP) with a warm premium-botanical feel and subtle genie magic. Signature feature: "3 Wishes" — curated plant trios. Build a clean, reusable design system plus the 4 core screens (Home, Shop, Product, Cart).

────────────────────────────────────
NON-NEGOTIABLE RULES (the soul)
────────────────────────────────────
- Warm botanical first: sunlit, earthy, editorial. The magic is a whisper — no cartoon genies, no purple mystic clichés. Gold (marigold) carries the "wish" feeling.
- Genie nods stay restrained: gold "wish" language, a faint marigold sparkle ONLY near wish/bundle moments, leafy line-art dividers echoing the logo frame.
- Encouragement-first, warm copy. NO rankings, NO followers, NO review-score UI.
- Online-only: emphasize delivery & care, never "visit us / store hours."
- Plants are the hero — generous photography on cream, lots of breathing room.

────────────────────────────────────
PLATFORM & STACK
────────────────────────────────────
Responsive web (desktop + mobile). Design-only deliverable: screens + a reusable component library to hand to a builder afterward.

────────────────────────────────────
DESIGN TOKENS (use exactly)
────────────────────────────────────
Core palette (ColorHunt):
  --olive        #84994F   primary brand green / buttons / heading accents
  --butter       #FFE797   soft section bg / wish glow / highlights
  --marigold     #FCB53B   gold accent — wishes, sale price, sparkle, CTAs
  --rose-clay    #B45253   warm accent — tags, sale strike, hearts, terracotta pots
Derived neutrals (extend the 4 for a usable UI):
  --cream        #FBF7EA   page bg
  --canvas-alt   #F2ECD9   cards / alt sections
  --olive-deep   #33401C   footer / dark sections / deep buttons / olive btn hover
  --ink          #2C3019   body text
  --muted        #5A6147   secondary text
  --line         #E7DFC8   hairlines
  --marigold-deep #E09A24  gold hover

Type:
  Hero / wordmark / ALL headers & subheaders → "Wonderia" (decorative display)
  Everything else — body, UI, prices, numbers, labels, captions → "Fraunces" (serif)
    · Fraunces optical sizing: higher opsz + slight SOFT for large text, standard for body
    · Use lining figures for all prices/numbers
  (Wonderia is free for commercial use; embed as WOFF, do not rename/alter.)

Shape & depth:
  radius: sm 10 / md 16 / lg 24 / pill 999
  shadow: soft warm → 0 6px 20px rgba(51,64,28,.10)
  spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64

Imagery: real plant photos, soft natural light, cream/butter backdrops. Leafy line-art dividers (echo the logo border). Marigold sparkle ONLY on wish/bundle elements.

────────────────────────────────────
COMPONENTS (design default + hover/active)
────────────────────────────────────
- Top nav + mega-menu:
    Indoor ▸ Large / Rare / Hanging / Low-Light / Air-Purifying
    Plant Families ▸ Monstera / Philodendron / Alocasia / Calathea / Syngonium / Anthurium / Aglaonema / Begonia
    Bundles · Outdoor · Pots
    + search, wishlist heart, cart
- Product card: photo · name · family tag (rose-clay pill) · price EGP · sale strike-through in marigold · heart · "Add to cart"
- Bundle "Wish" card: 3 mini plant thumbnails · marigold "3 Wishes" ribbon · "Save X%" · trio price
- Care badges (icon + label): Light · Water · Pet-safe · Size
- Buttons: primary = solid --olive / cream text (hover --olive-deep) · secondary = --marigold outline · add-to-cart hover → marigold fill
- Qty stepper · price block (EGP) · filter sidebar/drawer · footer (Instagram strip + newsletter)
Copy tone: warm, lightly enchanted, encouraging. "Make a wish." "Wish granted." "Your jungle awaits." Never pushy.

────────────────────────────────────
SCREENS (Core 4 — desktop + mobile)
────────────────────────────────────
1) HOME — brand hero (logo + "Nurturing Nature" + one line, Wonderia headline) → category tiles → "3 Wishes" featured trios → New Arrivals row → leafy divider → Instagram strip (@junglegenieeg) → newsletter.
2) SHOP — left filters (Family, Light, Care level, Size, Price, In/Outdoor) + product grid + sort + category chips.
3) PRODUCT — gallery · name + family tag · price EGP · care badges · qty + add-to-cart · "Part of a Wish bundle?" cross-sell · care notes · related plants.
4) CART — line items w/ thumbnails · qty steppers · subtotal EGP · delivery note ("Delivered across Egypt") · continue-shopping + checkout CTA.

────────────────────────────────────
SEED DATA (real catalog & prices, EGP)
────────────────────────────────────
Single plants:
  Monstera Albo 3,500 · Philodendron Patriciae 2,500 · Monstera Adansonii Variegated 2,500 · Caramel Marble Philodendron 3,250 · Anthurium Clarinervium 1,250 · Strawberry Shake Philodendron 1,600 · Rhapis Palm 1,750 · Variegated Fiddle Leaf 950 · Alocasia Frydek Variegated 900 · Persian Shield 650 · Alocasia Low Rider 700 · Marble Queen Pothos 350 · Snake Plant Zeylanica 450 · Ficus Burgundy 350 · Aloe Vera 150 · Bonsai Tree 1,200 (was 1,500)

"3 Wishes" bundles (feature these):
  ✦ First Wish · Beginner's Trio (hard to kill): Snake Plant + Marble Queen Pothos + ZZ — 600 EGP
  ✦ Second Wish · Air Genie (air-purifying): Peace Lily + Spider Plant + Areca Palm — 780 EGP
  ✦ Third Wish · Statement Corner: Monstera Deliciosa + Rhapis Palm + Fiddle Leaf — 2,400 EGP
  ✦ Collector's Wish (rare trio): Anthurium Clarinervium + Alocasia Frydek Var. + Strawberry Shake — save 12%
Each product: family tag + care badges.

────────────────────────────────────
DONE WHEN
────────────────────────────────────
☐ Token style page (colors, type, radius, shadow, spacing)
☐ All components in default + hover/active states
☐ 4 screens designed at desktop + mobile widths
☐ Wonderia on hero + ALL headers/subheaders; Fraunces on everything else (body, UI, prices, numbers)
☐ "3 Wishes" bundle card is clearly the signature moment
☐ Prices in EGP, sale prices struck in marigold
☐ Instagram (@junglegenieeg) + online-only / delivery messaging present
☐ Zero rankings / followers / review-score UI anywhere
☐ Reads warm premium-botanical — magic as a whisper, not a theme-park

## Assistant

Let me explore the design system before building anything.

_[tool: list_files]_

The bound design system is empty — no fonts or components to copy. Let me check the current project.

_[tool: list_files]_

The bound design system is empty and the project is blank, so I'll be building the whole thing from the brief (which is wonderfully complete). Before I start, a few things genuinely affect the build — especially fonts and photography, which I can't source on my own.

_[tool: questions_v2]_

## User

Questions answered:
- wonderia_font: uploads/wonderia_font-1782725213227.otf
- photography: Mix: photo slots for hero/products, soft placeholders elsewhere
- deliverable_structure: the optimal for the next phase of claude code
- fidelity: Lightly interactive (working hover states, qty steppers, add-to-cart count, filter chips toggle)
- priorities: webpage needs to be optimized for web and mobile web

## Assistant

The design system was empty, so I'm building Jungle Genie from your brief. You've given me everything I need: real Wonderia font, mixed photography, Claude-Code-optimized structure, light interactivity, responsive web+mobile.

My plan for a handoff-optimal structure:
- **Style Guide** DC — documents tokens (color/type/radius/shadow/spacing) + every component in default/hover/active
- **ProductCard** + **WishCard** — reusable child components (they repeat across screens)
- **Home / Shop / Product / Cart** — responsive screens composed from those components

Let me set up fonts and assets first.

_[tool: update_todos]_

_[tool: copy_files]_

_[tool: copy_starter_component]_

Font and image-slot are in. Now the Style Guide — this establishes the entire visual vocabulary (tokens + components) that every screen reuses.

_[tool: dc_write]_

Now the two reusable component DCs the Style Guide imports. ProductCard first:

_[tool: dc_write]_

Now WishCard — the signature "3 Wishes" moment:

_[tool: dc_write]_

Let me verify the Style Guide renders cleanly with both components.

_[tool: show_html]_

_[tool: show_html]_

Wonderia and Fraunces both render beautifully. Let me check the components section lower down.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Foundations are solid — both cards render perfectly. Now I'll build a reusable **Nav** (with working mega-menu + responsive hamburger) and **Footer**, then compose the four screens from all these pieces.

_[tool: dc_write]_

_[tool: dc_write]_

Add the image-slot import to Footer so it's standalone-safe, then build the Home screen.

_[tool: dc_html_str_replace]_

_[tool: dc_write]_

_[tool: show_html]_

The `x-import` of the custom element rendered a visible slot. I should load `image-slot.js` as a helmet script instead, not mount it as a component. Fixing all four files.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

Hero is clean now. Let me check the rest of the page.

_[tool: multi_screenshot]_

Home composes beautifully. Now the Shop screen — filters (functional family/light/care + price + sort) and the product grid.

_[tool: dc_write]_

_[tool: show_html]_

Shop renders well. Let me test filtering interactivity.

_[tool: multi_screenshot]_

Filtering works perfectly. Now the Product page.

_[tool: dc_write]_

Finally, the Cart — functional qty steppers, live subtotal, delivery note.

_[tool: dc_write]_

All built. Let me verify Product and Cart render correctly.

_[tool: snip]_

_[tool: snip]_

_[tool: show_html]_

Product page looks great. Now Cart:

_[tool: show_html]_

Everything works — cart shows the live count badge (4), bundle tag, steppers. The full system is built: Style Guide, ProductCard, WishCard, Nav, Footer, and all four screens. Verifying the richest entry point.

_[tool: ready_for_verification]_

Built the complete **Jungle Genie** system from your brief — warm botanical, magic as a whisper, Wonderia headers + Fraunces everywhere else, prices in EGP with sale strikes in marigold.

**Files (handoff-ready for Claude Code):**
- **Style Guide.dc.html** — tokens (colour, type, radius, shadow, spacing) + every component in default/hover/active
- **ProductCard.dc.html** / **WishCard.dc.html** — reusable cards (the "3 Wishes" trio is the signature moment)
- **Nav.dc.html** (mega-menu + responsive hamburger) / **Footer.dc.html** (@junglegenieeg strip + newsletter + "Delivered across Egypt")
- **Home / Shop / Product / Cart** — responsive screens composed from those components

**Live interactions:** hover states, qty steppers, add-to-cart updating the nav badge, filter chips + sidebar that actually filter the grid, sort, and a recalculating cart subtotal. Photo slots are drag-to-fill (hero + every product/thumbnail); soft botanical placeholders elsewhere. Zero rankings/followers/review UI.

Two notes: the Wonderia `.otf` is embedded as-is — swap-friendly if you get a WOFF later; and the catalog/prices live in each screen's logic class as plain data arrays, easy to lift into a real backend.


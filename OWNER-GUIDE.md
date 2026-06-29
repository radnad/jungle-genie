# Jungle Genie - Owner Guide

Everything a non-technical owner needs to keep the shop fresh. No code, no jargon.

---

## Where everything lives

All the content you will ever want to change is in the `/content` folder:

| File | What it controls |
|---|---|
| `products.json` | Every plant: name, price, photos, care info |
| `bundles.json` | The "3 Wishes" trios |
| `site.json` | Brand name, tagline, hero text, delivery note, Instagram link |
| `theme.json` | Colors and fonts (reference only) |

Open any of these files in a text editor. Change the value inside the quotes. Save. Done.

---

## How to change a price or product name

1. Open `content/products.json`.
2. Find the product by its name (use Ctrl+F / Cmd+F to search).
3. Change the value next to `"priceEGP"` or `"name"`.
4. Save the file.

Example - changing the Snake Plant price from 450 to 400:
```
"priceEGP": 450,
```
becomes:
```
"priceEGP": 400,
```

For a sale price, change `"salePriceEGP"`. Use `null` to remove a sale.

---

## How to add or remove a product

**To add a product:** Copy one of the existing product blocks (from `{` to `},`), paste it at the end of the list (before the final `]`), and fill in the details. The `"id"` and `"slug"` must be unique - use the product name in lowercase with hyphens instead of spaces, for example `"my-new-plant"`.

**To remove a product:** Delete the entire block from `{` to `}` for that product. Make sure the comma after the previous block is also correct.

---

## How to add or remove a "3 Wishes" bundle

Open `content/bundles.json`. Each bundle is one block. To add a bundle, copy one block and paste it at the end of the list. Fill in:
- `"name"` - the wish name shown on the card (e.g. "Fifth Wish")
- `"wishLabel"` - the subtitle shown in italic (e.g. "Sunset Trio")
- `"plantIds"` - an array of exactly 3 product ids from `products.json`
- `"bundlePriceEGP"` - the bundle price
- `"savePercent"` - how much percent the customer saves
- `"saveText"` - short label on the gold badge (e.g. "Save 15%")

To remove a bundle, delete its block.

---

## How to swap a plant photo

**Option 1 - paste a URL (instant, no script needed):**
1. Find a photo you like online (Pexels, Unsplash, or your own).
2. Copy the direct image URL (right-click image, "Copy image address").
3. Open `content/products.json`, find the product, and paste the URL as the `"imageUrl"` value.
4. Save. The new photo appears immediately on the next page load.

**Option 2 - use your own photo file (the owner override):**
This is the best way to show the exact plant a customer will receive.
1. Take or choose a photo and save it as a `.jpg` file.
2. Name the file after the plant's slug. The slug is the `"slug"` value in
   `content/products.json`. For example, for Monstera Albo the slug is
   `monstera-albo`, so the file is `monstera-albo.jpg`.
3. Put the file in the folder `public/plant-photos/`.
4. Run `npm run fetch-photos` once. Your photo now wins over any stock photo,
   even if a Pexels link is already set.

**Option 3 - re-run the auto-fetch script:**
Run this in the terminal from the project folder:
```
npm run fetch-photos
```
This only fetches photos for products that do not already have a URL. It will not overwrite any URL you have pasted manually, and your own photos in `public/plant-photos/` always win.

**Note on rare plants:** Some rare cultivars (for example Monstera Albo, Calathea White Fusion, Syngonium Albo) have a note in the file. For these, add your own photo for the best result, since a stock search may return a close-but-not-exact look.

---

## How to change the logo and the hero photo

**Logo:** Your logo is the file `public/logo.png`. To change it, replace that
file with a new one (keep it roughly square for the best fit). It shows in the
header, the footer, and the browser tab. The browser tab icon is `app/icon.png`;
replace that too if you want the tab to match a new logo.

The header logo currently links to your Instagram. To make it link to the
homepage instead later, there is a short comment in `components/SiteHeader.tsx`
explaining the one line to change.

**Hero photo:** The large photo on the homepage is `public/hero.jpg`. To change
it, replace that file with your own photo. A tall (portrait) or square photo
works best.

---

## How to edit hero text, tagline, delivery note, and Instagram link

Open `content/site.json`. You will see clear labels:
- `"heroHeadline"` - the big text in the hero section
- `"tagline"` - the line under the logo
- `"delivery"` - the delivery note shown in the footer badge
- `"instagram"` - the full Instagram link
- `"instagramHandle"` - the @handle shown in the footer

Change any value and save.

---

## How to change brand colors and fonts

Colors and fonts are documented in `content/theme.json` for reference. The actual color values are set in `tailwind.config.ts` and `app/globals.css`.

To change a color: open `tailwind.config.ts`, find the color name (e.g. `olive`), and replace its hex value. Then rebuild the site.

The display font (Wonderia, used for all headers) is the file at `public/fonts/Wonderia.otf`. To swap it, replace that file with a new OTF or WOFF file and update the font name in `app/globals.css`.

---

## Where your orders arrive

When a customer places an order, payment is **Cash on Delivery** only. There is
no online payment and no customer account.

On the confirmation step, the customer's phone opens a **WhatsApp** message,
already filled in with their name, phone, address, governorate, and the full
order. They tap send and it arrives on your WhatsApp number. The confirmation
page also shows a **Send on WhatsApp** button and an **Email the order instead**
button in case WhatsApp does not open on its own.

To change where orders go, open `content/site.json` and edit the `"orders"`
section:
- `"whatsappNumber"` - your WhatsApp number, digits only, no plus sign or spaces
  (for example `201099898787` for the Egyptian number +20 109 989 8787).
- `"orderEmail"` - the email that receives an order when the customer taps
  "Email the order instead".
- `"deliveryFeeEGP"` - the delivery fee.
- `"freeDeliveryThresholdEGP"` - spend above this amount and delivery is free.

A copy of each order is also saved in the customer's own browser as a backup.

If you later want every order emailed to you automatically (without the customer
tapping a button), that needs an email-sending service connected to the site.
Ask Claude Code to "add automatic order emails with Resend" and provide a key,
and it can be wired up.

---

## How to deploy to Vercel

1. Push your project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In Vercel project settings, go to "Environment Variables" and add:
   - Name: `PEXELS_API_KEY`
   - Value: your Pexels API key
4. Click Deploy. Vercel builds and publishes automatically.

On every future push to your main branch, Vercel will redeploy automatically.

---

## How to ask Claude Code to make a change in future

You can open a Claude Code session and describe what you want in plain language. Here are three example requests:

**Example 1 - changing a product:**
"In the Jungle Genie project, please update the price of Monstera Albo in products.json from 3500 to 3200 EGP and add a sale price of 3500."

**Example 2 - adding a new section:**
"Please add a fourth category tile to the home page called 'Air Purifying' with a link to /shop?tag=air-purifying. Use the same style as the other tiles and give it the olive-deep background color."

**Example 3 - changing the look:**
"Please make the 'Add to cart' button text larger - change it from text-sm to text-base in ProductCard.tsx. Also add a small leaf emoji before the label."

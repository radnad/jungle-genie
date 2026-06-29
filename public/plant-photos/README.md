# Your own plant photos

Drop a photo here to override the stock photo for any plant.

How it works:
1. Name the file exactly after the plant's slug, ending in `.jpg`.
   For example, to set your own Monstera Albo photo, save it as:
   `monstera-albo.jpg`
2. The slug for each plant is the `slug` value in `content/products.json`.
3. Run `npm run fetch-photos` once. Your photo will be used instead of the
   stock photo, and it wins even if a Pexels link is already set.

Your own photos always take priority. This is the best way to show the exact
plant a customer will receive.

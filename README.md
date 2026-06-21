# Daily Fashion - A Fashion App made with React Native 👗

(Note: this was created in 2024, but I finally feel like uploading it to GitHub in 2026 :/. IDK if it works now, haven't tested it. Also, I have lost a lot of my original assets when transferring data to my new laptop so I will put screenshots of it that I have on my phone of the app. Please let me know.)

To end my journey in app dev, I wanted to go with a big bang. So, I tried making a full-stack React Native e-commerce-style app for browsing and managing fashion products, built with Realm database, Drawer Navigation, image upload from gallery, zoom, deep-linking to social media, and responsive layout. It covers the full CRUD cycle and brings together almost everything from my journey.

## What it does

**Home**
- Auto-playing image slider carousel
- Category grid (Women, Men, Kids, Shoes, Bags, Jewellery)
- Tap a category to see only products in that category

**Add Product**
- Upload a photo from your gallery (cropped, saved as local path)
- Fill in name, description, price, category (select dropdown)
- Enter at least one seller contact: WhatsApp, Instagram, or Facebook
- Validates all fields before saving to Realm

**Show Product**
- Lists all products filtered by selected category
- Tap the product image to zoom in/out with pinch gesture
- Tap the cart icon and contact modal appears with deep links:
  - WhatsApp (`wa.me/...`), Instagram, Facebook Messenger
- Long-press a product and checkbox mode for bulk delete

**Edit Product**
- Pre-fills all inputs with existing data from Realm
- Only saves if something actually changed
- Validates that not everything is the same before writing to DB

**Delete Product**
- Long-press to activate checkbox mode
- Tick multiple products, press Delete to remove them all in one Realm `write()`
- Cancel button unticks everything and exits delete mode

**Splash Screen**
- Displays for 3 seconds on launch, then replaces itself with the Drawer (no back-button loop)

## Built with

- React Native (CLI)
- **Realm** (`realm@hermes` which required for Drawer Navigation + Hermes engine)
- React Navigation (Drawer Navigator nested inside Stack Navigator)
- `react-native-image-crop-picker` (gallery upload with cropping)
- `react-native-image-slider-box` (home screen carousel)
- `react-native-image-pan-zoom` (pinch-to-zoom on product images)
- `react-native-select-dropdown` (category picker)
- `react-native-responsive-screen-hooks` = `wp()` / `hp()` for responsive sizing
- `react-native-elements` = icons, CheckBox
- `Linking` (React Native built-in) = deep links to WhatsApp, Instagram, Messenger
- `useRef` = to programmatically reset the Select Dropdown after save

## Getting started

```bash
# Install all dependencies
npm install

# Realm for Hermes (required)
npm install realm@hermes

# Icon library
npm install react-native-elements
npm install --save react-native-vector-icons
npx react-native link react-native-vector-icons

# Other libraries
npm install @react-navigation/drawer @react-navigation/stack
npm i react-native-image-crop-picker
npm i react-native-image-slider-box
npm i react-native-image-pan-zoom
npm i react-native-select-dropdown
npm i react-native-responsive-screen-hooks

# Run
npx react-native run-android
```

> **Drawer navigation setup:** You'll also need to add `plugins: ['react-native-reanimated/plugin']` to `babel.config.js`, enable Hermes in `android/app/build.gradle`, and add the Reanimated JSI module to `MainApplication.java`. See the [React Navigation Drawer docs](https://reactnavigation.org/docs/drawer-navigator/) for details.

> **Social media icons:** Place `whatsapp.png`, `instagram.png`, and `facebook.png` in `assets/images/`. These are `require()`'d directly so the files must exist or the app will crash.

## Screenshots

<img width="213" height="383" alt="image" src="https://github.com/user-attachments/assets/16f431f8-911a-40aa-9a5d-798150d0158a" />

## What I learned

This was the hardest project by a significant margin, and also the one I'm most proud of.

**Realm + Hermes** was a wall I hit early. The regular `npm install realm` doesn't work with Drawer Navigation because Drawer requires the Reanimated library, which uses Hermes. Finding out that `realm@hermes` exists and that I had to also modify `MainApplication.java` manually was not something I would have worked out without digging. Actually understanding *why* those steps were needed made the fix stick.

**The update logic** in `EditProductScreen` was genuinely tricky to reason about. You have data coming from Realm, displayed in controlled inputs, and you need to figure out whether anything changed before deciding whether to write. The condition that checks every field of `updatedData` against `productData` before saving felt like writing real application logic.

**`useRef` for the dropdown reset** was a small thing that taught me something big: not everything in React needs to be state. Some things just need a stable reference to a DOM-like node so you can call a method on it. `dropdownRef.current.reset()` was the first time I used `useRef` for something other than a text input.

**`navigation.replace()` on the Splash Screen**: understanding the difference between `navigate()` (pushes to stack, back button returns) and `replace()` (swaps in place, no going back) was a detail that actually matters for user experience.

## Notes

- Product images are stored as **local file paths** from the device gallery. They will not transfer between devices or survive an app reinstall
- If you update `ProductSchema.js`, you must clear the app's storage on your device before reopening (Realm schema migration)
- Social media deep links require the respective apps to be installed on the device to open them properly
- Built as part of my self-study in mobile development with some guidance from structured learning materials
- Built for Android; iOS not tested

## Acknowledgements

This project was developed as part of a React Native learning course. While some starter files were provided, the application logic, landmark dataset, and overall implementation were developed by me as part of the learning process.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

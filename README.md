# HelpingHeart Marketplace

A responsive, OLX-inspired classifieds marketplace interface for India.

## Phase 1 — marketplace foundation
- Responsive marketplace homepage, search, category and condition filters, and price sorting.
- Firebase-ready listing creation with item details, city, price and image uploads.
- Listing detail view and seller messaging foundation.
- Preview mode is clearly labelled when Firebase is not configured.

## Phase 2 — accounts and profiles
- Firebase email/password registration and sign-in.
- User profile documents with display name, broad city, short bio and optional profile photo.
- Profile editing and personal listing management.
- Owner-restricted profile and Storage writes.

## Phase 3 — marketplace experience
- OLX-inspired blue and pink visual refresh, responsive header and category navigation.
- Listing cards with favourite controls and multi-photo detail galleries.
- Expanded search and filters: category, condition, minimum/maximum price, city/area and sort order.
- Synced favourites stored under each signed-in user's profile.
- Seller profile view with active listings.
- Live Firestore inbox subscription and message replies, scoped to conversation participants.
- Listing uploads support up to six JPG, PNG or WEBP images (5 MB each).

## Firebase setup required
1. Create a Firebase project and register a Web App.
2. Enable Email/Password in Firebase Authentication.
3. Create a Firestore database and enable Firebase Storage.
4. Paste the Firebase Web App config into `firebase-config.js`.
5. Publish the updated `firestore.rules` and existing `storage.rules` in Firebase Console.
6. Add `helpingheartmarketplace.vercel.app` to Firebase Authentication's authorised domains.
7. Test registration, listing uploads, favourites and messages using separate test accounts.

**Important:** Firebase is not connected until the Web App config and Firebase Console setup are completed. The new Firestore rules must be published before favourites and inbox queries will work. Existing messages created before Phase 3 do not contain the `participants` field and will not appear in the new inbox; new messages include it.

## Safety and launch readiness
This is a technical preview, not a fully verified OLX replacement. Before any public launch, an adult operator must review age eligibility, identity and seller verification, moderation/report handling, prohibited listings, privacy and data retention, fraud prevention, dispute handling, and local legal requirements. Do not publish home addresses, personal phone numbers, OTPs, passwords or financial credentials. HelpingHeart Marketplace does not process payments. In-person transactions must be handled by adults using safe public arrangements.

Never put Firebase service-account private keys or other server secrets in frontend files.
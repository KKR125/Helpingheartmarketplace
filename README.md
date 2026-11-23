# HelpingHeart Marketplace

Responsive OLX-inspired classifieds marketplace interface for India.

## Completed development phases
- Phase 1: marketplace foundation, listing creation and Firebase-ready architecture.
- Phase 2: email/password authentication and user profiles.
- Phase 3: blue/pink marketplace redesign, search and filters, multi-photo listings, favourites, seller profiles and inbox.
- Phase 4: report listing/member flows, user blocking that prevents new messages, moderator report queue, admin listing pause/removal, seller listing edit/pause/reactivate/delete, foreground alerts for incoming messages, stronger Firestore rules, and expanded policy drafts.

## Firebase setup required before real use
1. Create a Firebase project and register a Web App.
2. Enable Email/Password in Firebase Authentication.
3. Create Cloud Firestore. Do not enable Firebase Storage; media is stored in Cloudinary.
4. Paste Firebase Web App config into firebase-config.js.
5. Publish firestore.rules in Firebase Console.
6. Add helpingheartmarketplace.vercel.app to Firebase Authentication authorised domains.
7. Create the two signed Cloudinary upload presets and add the required Vercel environment variables described in CLOUDINARY_FIREBASE_SETUP.md.
8. Test signup, profile, listing/photo upload, chat attachments, edit/pause/reactivate, favourites, messages, block and report with adult supervision.

The production site remains a preview until Firebase is configured and tested. Repository rule files do not automatically publish themselves to Firebase.

## Phase 4 admin setup
Admin UI appears only when a signed-in account has the trusted Firebase custom claim admin: true. Never add an isAdmin field to a user-editable profile and never grant admin rights from frontend code. An adult project operator must grant the custom claim from a trusted environment using Firebase Admin SDK, then have the admin user sign out and sign in again. See ADMIN_SETUP.md.

## Current limitations
- No automated phone/email identity verification, KYC, seller badges or fraud detection.
- No push notifications, payment processing, escrow, shipping, dispute-resolution workflow or automatic refunds.
- Moderation is a basic report queue and manual listing status action; it is not 24/7 human moderation.
- No full account deletion/export workflow, retention automation or appeals workflow.
- No real-time message read receipts, attachment scanning or automatic media moderation. Cloudinary media is delivered through shareable URLs; users must never upload sensitive personal documents.
- Legal pages are drafts and need operator details and adult legal/privacy review.
- Public profile reads are enabled for seller profile display. Store only non-sensitive profile fields.

## Safety and launch readiness
This is not yet a verified OLX replacement. Before public launch, an adult operator must review age eligibility, local legal obligations, privacy, data retention, prohibited listings, moderation staffing, account recovery, fraud response and support contact details. Do not publish home addresses, private phone numbers, OTPs, passwords or financial credentials. In-person transactions must be handled by adults using safe public arrangements. HelpingHeart Marketplace does not process payments.

Never commit Firebase service-account keys, Cloudinary API secrets or other server secrets.

## Media uploads
Listing photos, profile photos and chat attachments use Cloudinary. Firebase Authentication verifies the signed-in user; Firestore stores listing/message metadata and Cloudinary URLs. The Vercel API route `/api/cloudinary-signature` verifies the Firebase ID token before creating a Cloudinary upload signature. Firebase Storage is not used. See CLOUDINARY_FIREBASE_SETUP.md for beginner setup steps.
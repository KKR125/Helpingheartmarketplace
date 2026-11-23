# HelpingHeart Marketplace — Firebase + Cloudinary setup

This project uses **Firebase for accounts and marketplace data** and **Cloudinary for photos and chat files**. You do not need to create a Firebase Storage bucket.

Ask a parent/guardian or another responsible adult to help create and manage the service accounts, review privacy settings and monitor usage. Do not share passwords, API secrets, recovery codes or billing details in chat or commit them to GitHub.

## Part A — Firebase (accounts and database)

1. Open https://console.firebase.google.com/ and create a project named `HelpingHeart Marketplace`.
2. In Project Overview, choose **Add app → Web**. Give it a nickname such as `HelpingHeart Marketplace Web`.
3. Firebase displays a web configuration object. Copy the values into the matching fields in `firebase-config.js` in GitHub:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `messagingSenderId`
   - `appId`
   - `storageBucket` may remain blank because Firebase Storage is not used.
4. In **Build → Authentication → Get started → Sign-in method**, enable **Email/Password**.
5. In **Build → Firestore Database**, create a database. For the first setup, choose a location carefully with adult help. Do not use test mode as a permanent security setting.
6. Open the repository's `firestore.rules` file. Copy its complete contents into **Firestore Database → Rules**, then click **Publish**.
7. In **Authentication → Settings → Authorized domains**, add `helpingheartmarketplace.vercel.app`.
8. Do not create a Storage bucket and do not publish `storage.rules`; the app no longer uses Firebase Storage.

## Part B — Cloudinary (photos and attachments)

1. With adult help, create a Cloudinary account at https://cloudinary.com/.
2. In the Cloudinary Console, open the API Keys / Product Environment details and note the Cloud name, API key and API secret. Keep the API secret private; it belongs only in Vercel environment variables.
3. Open **Settings → Upload → Upload presets** and create two presets. Both must use **Signed** signing mode:
   - Image preset name example: `hh_marketplace_images_signed`. Allowed formats: `jpg,jpeg,png,webp`. Maximum file size: 5 MB.
   - Chat preset name example: `hh_marketplace_chat_signed`. Allowed formats: `jpg,jpeg,png,webp,pdf,docx,xlsx,txt`. Maximum file size: 5 MB.
4. Do not set a fixed folder in either preset; the server assigns a separate folder for each signed-in user's listing, profile or chat uploads.
5. Uploaded assets use shareable delivery URLs. Anyone who obtains a URL may be able to open that file. Never upload identity documents, school records containing personal details, financial records, private addresses, passwords or other sensitive material.
6. Check Cloudinary's current free-plan limits before use. Free quotas can change; uploads are not unlimited.

## Part C — Vercel environment variables

1. Open https://vercel.com/ and select the `helpingheartmarketplace` project.
2. Go to **Settings → Environment Variables**.
3. Add each variable below for **Production**:
   - `FIREBASE_API_KEY` = the Firebase Web App `apiKey` value.
   - `CLOUDINARY_CLOUD_NAME` = Cloudinary cloud name.
   - `CLOUDINARY_API_KEY` = Cloudinary API key.
   - `CLOUDINARY_API_SECRET` = Cloudinary API secret.
   - `CLOUDINARY_IMAGE_UPLOAD_PRESET` = exact name of the signed image preset.
   - `CLOUDINARY_CHAT_UPLOAD_PRESET` = exact name of the signed chat preset.
4. Save the variables, then redeploy the latest production deployment so the server function receives them.
5. Never put `CLOUDINARY_API_SECRET` in `index.html`, `firebase-config.js`, GitHub, or a message.

## Part D — Test carefully

1. Open https://helpingheartmarketplace.vercel.app/ and sign in with an adult-supervised test account.
2. Test a profile photo, one listing photo, then a chat message with one small image and one small PDF or text document.
3. Confirm that the recipient can view the attachments and that a signed-out visitor cannot upload.
4. Check Cloudinary's Media Library to see where files are stored.
5. Test Firestore rules with separate adult-supervised test accounts before considering any public use.

## Limits and safety notes

- The app allows up to 6 listing photos (5 MB each), one profile image (3 MB), and up to 3 chat attachments per message (5 MB each).
- Chat file types are limited in the app to JPG, JPEG, PNG, WEBP, PDF, DOCX, XLSX and TXT. The Cloudinary signed chat preset must allow the same formats.
- Client-side checks improve usability; the Cloudinary preset and server-side signature endpoint provide additional restrictions. They are not a substitute for active moderation or malware scanning.
- Cloudinary URLs are shareable. Do not use this chat feature for private documents.
- Deleting a listing/profile/message from Firestore does not automatically delete the corresponding Cloudinary asset. Automatic media cleanup is not included yet.
- No payment handling is included. An adult operator must review legal, privacy, age-eligibility, moderation and incident-response arrangements before any public launch.
- Keep the preview notice until all setup and end-to-end tests have been completed and reviewed by an adult operator.

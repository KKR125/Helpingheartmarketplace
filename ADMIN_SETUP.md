# Admin setup (adult operator only)

The Phase 4 admin dashboard is hidden unless Firebase Authentication returns the trusted custom claim admin: true.

## Important security rules
- Do not add an admin checkbox or admin field to public profile documents.
- Do not grant admin access from browser JavaScript or from the public website.
- Only the adult project owner should assign or revoke admin claims from a trusted computer.
- Never upload a Firebase service-account JSON key to GitHub, Vercel static files, chat, or a public folder.

## Grant an admin claim from a trusted environment

1. An adult operator installs the Firebase Admin SDK in a private local folder (not this public website repository).
2. Create a service-account credential in Firebase Console with the minimum permissions required, store it outside the repository, and restrict access to it.
3. Configure the local environment variable GOOGLE_APPLICATION_CREDENTIALS to the private credential file path.
4. Run a private Node.js script similar to this:

    import { applicationDefault, initializeApp } from "firebase-admin/app";
    import { getAuth } from "firebase-admin/auth";

    initializeApp({ credential: applicationDefault() });

    const uid = "REPLACE_WITH_THE_VERIFIED_ADMIN_UID";
    await getAuth().setCustomUserClaims(uid, { admin: true });
    console.log("Admin claim assigned.");

5. Replace the UID only after the adult operator has independently verified the account belongs to the intended administrator.
6. Have that account sign out and sign in again so the refreshed ID token contains the claim.
7. Test that the Admin moderation button appears and that an ordinary account cannot read reports or moderate listings.

## Revoke admin access

From the same trusted environment, set the account's custom claims to the required remaining claims (or an empty object) using Firebase Admin SDK. Have the account sign out and sign in again. Review administrator access regularly.

## Operational warning

The dashboard is a basic manual queue, not a staffed trust-and-safety service. An adult operator must review reports promptly, document decisions, provide a real support contact and define escalation procedures before public launch.
const crypto = require("crypto");
const PURPOSES = {
  listing: { presetEnv: "CLOUDINARY_IMAGE_UPLOAD_PRESET", folder: "listings" },
  profile: { presetEnv: "CLOUDINARY_IMAGE_UPLOAD_PRESET", folder: "profiles" },
  chat: { presetEnv: "CLOUDINARY_CHAT_UPLOAD_PRESET", folder: "chat" }
};
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  const origin = req.headers.origin;
  if (origin && origin !== "https://helpingheartmarketplace.vercel.app") {
    return res.status(403).json({ error: "This website is not allowed to request uploads." });
  }
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const firebaseApiKey = process.env.FIREBASE_API_KEY;
  if (!cloudName || !apiKey || !apiSecret || !firebaseApiKey) {
    return res.status(503).json({ error: "Upload service is not configured yet. Ask the project administrator to finish setup." });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const idToken = body.idToken, purpose = body.purpose, config = PURPOSES[purpose];
    if (typeof idToken !== "string" || idToken.length < 100 || idToken.length > 5000 || !config) {
      return res.status(400).json({ error: "A valid sign-in and upload purpose are required." });
    }
    const verifyResponse = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + encodeURIComponent(firebaseApiKey), {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken })
    });
    const verified = await verifyResponse.json();
    const uid = verified && verified.users && verified.users[0] && verified.users[0].localId;
    if (!verifyResponse.ok || !uid) return res.status(401).json({ error: "Your sign-in has expired. Please sign in again." });
    const uploadPreset = process.env[config.presetEnv];
    if (!uploadPreset) return res.status(503).json({ error: "The Cloudinary upload preset is not configured." });
    const folder = "helpingheart_marketplace/" + uid + "/" + config.folder;
    const timestamp = Math.floor(Date.now() / 1000);
    const params = { folder, timestamp, upload_preset: uploadPreset };
    const toSign = Object.keys(params).sort().map(key => key + "=" + params[key]).join("&");
    const signature = crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
    return res.status(200).json({ cloudName, apiKey, timestamp, signature, folder, uploadPreset });
  } catch (error) {
    return res.status(500).json({ error: "Could not prepare the upload. Please try again." });
  }
};
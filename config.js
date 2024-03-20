import admin from "firebase-admin";

async function initializeApp() {
  const { default: serviceAccount } = await import("./pushnotifications.json", { assert: { type: 'json' } });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

initializeApp();

export default admin;

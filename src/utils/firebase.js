const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
let serviceAccount;
try {
  // Read the service account file
  const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
  console.log('Loading service account from:', serviceAccountPath);

  const serviceAccountFile = fs.readFileSync(serviceAccountPath, 'utf8');
  serviceAccount = JSON.parse(serviceAccountFile);

  if (!serviceAccount || typeof serviceAccount !== 'object') {
    throw new Error('Invalid service account format');
  }
} catch (error) {
  console.error('Failed to load Firebase service account:', error);
  throw new Error('Failed to load Firebase service account');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const messaging = admin.messaging();

module.exports = {
  messaging,
};

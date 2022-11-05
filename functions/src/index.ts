import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
const admin = require('firebase-admin');
console.log('initializing ');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getCertificate = functions.https.onRequest(
  async (request, response) => {
    const serviceAccount: any = {
      type: process.env.ADMIN_TYPE,
      project_id: process.env.ADMIN_PROJECT_ID || '1233',
      private_key_id: process.env.ADMIN_PRIVATE_KEY_ID as string,
      private_key: process.env.ADMIN_PRIVATE_KEY,
      client_email: process.env.ADMIN_CLIENT_EMAIL,
      client_id: process.env.ADMIN_CLIENT_ID,
      auth_uri: process.env.ADMIN_AUTH_URI,
      token_uri: process.env.ADMIN_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.ADMIN_AUTH_CERT_URL,
      client_x509_cert_url: process.env.ADMIN_CLIENT_CERT_URL,
    } as any;

    console.log('serviceAccount ', serviceAccount);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    functions.logger.info('Hello logs!', { structuredData: true });
    const certificateId = request.query.certificateId as string;
    const db = getFirestore();
    const res = await db.doc(certificateId).get();

    response.json(res.data());
  }
);

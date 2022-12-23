import admin from 'firebase-admin'
import serviceAccount from '../services/database/databasecoderhouse-firebase-adminsdk-z6347-ca2a46754a.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://databasecoderhouse.firebaseio.com"
});

const db = admin.firestore();

export {admin}
export {db}
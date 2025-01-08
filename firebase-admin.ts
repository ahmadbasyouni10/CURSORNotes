// firebase admin config for server side
import {
    initializeApp, 
    getApps,
    App, 
    getApp,
    cert,
} from 'firebase-admin/app';

import { getFirestore } from 'firebase-admin/firestore';

// turns the service key json into a js object key value pair
const serviceKey = require("@/service_key.json")

// type of adminApp is firebase App
let adminApp: App;

if (getApps().length === 0) {
    adminApp = initializeApp({
        // cert is a function that takes in the service key and returns the credentials so firebase can authenticate to make instance of admin app
        credential: cert(serviceKey),
    });
} else {
    adminApp = getApp();
}

const adminDb = getFirestore(adminApp);

export { adminDb, adminApp };
// server action for createnewdocument comp which is client side so we need to create a server action to create a new document in the database
// like a bridge that makes client safely communicate with the server
'use server';
import { adminDb } from "@/firebase-admin";

import { auth } from "@clerk/nextjs/server";
export async function createNewDocument() {
    // protect this route with clerk
    auth.protect();
    const { sessionClaims } = await auth();

    const collectionRef = adminDb.collection("documents");
    const newDocRef = await collectionRef.add({
        title: "New document"
    })

    await adminDb.collection("users").doc(sessionClaims?.email!)


    
}
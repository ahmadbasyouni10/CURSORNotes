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
    // add a new document to the document collections
    const newDocRef = await collectionRef.add({
        title: "New document"
    })

    // add the document to the user collection
    // into their rooms collection
    // this is a subcollection
    // role is owner because they created the document
    await adminDb.collection("users").doc(sessionClaims?.email!).collection("rooms").doc(newDocRef.id).set({
        // INDEX query requires to be in the document
        userId: sessionClaims?.email,
        role: "owner",
        createdAt: new Date(),
        roomId: newDocRef.id
    })

    return { docId: newDocRef.id }
}
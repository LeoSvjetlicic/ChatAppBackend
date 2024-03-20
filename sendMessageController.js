import firebase from './firebase.js';
import SendMessageModel from "./messageModel.js";
import { getMessaging } from "firebase/messaging";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore(firebase);
const messaging = getMessaging(app);
// getToken(messaging, {vapidKey: "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu"});
export const sendMessage = async (req, res, next) => {
    try {
      const data = req.body;
      const message = new SendMessageModel(data.to,data.title,data.body)

      res.status(200).send('Message sent successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
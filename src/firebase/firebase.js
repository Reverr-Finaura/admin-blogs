import { initializeApp } from "firebase/app";

import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAG7aYqGunCEEqMePnR7YN_uMsn8yvwtcM",
  authDomain: "reverr-25fb3.firebaseapp.com",
  databaseURL: "https://reverr-25fb3-default-rtdb.firebaseio.com",
  projectId: "reverr-25fb3",
  storageBucket: "reverr-25fb3.appspot.com",
  messagingSenderId: "710745964607",
  appId: "1:710745964607:web:9c0b08192f30bb97bab88a",
  measurementId: "G-7S7P5C52RG",
};

const app = initializeApp(firebaseConfig);

// Firestore
const database = getFirestore();

// Fetch Admins Data
export const getAdminsFromDatabase = async () => {
  try {
    let Admins = [];
    await (
      await getDocs(collection(database, `Admin`))
    ).forEach((doc) => {
      Admins.push({ ...doc.data() });
    });
    console.log(Admins)
    return Admins;
  } catch (err) {
    console.log("Err: ", err);
  }
};

// getDocs
export const getBlogsFromDatabase = async () => {
  try {
    let blogs = [];
    await (
      await getDocs(collection(database, `Blogs2`))
    ).forEach((doc) => {
      blogs.push({ ...doc.data() });
    });
    return blogs;
  } catch (err) {
    console.log("Err: ", err);
  }
};

// addDocs

export const addBlogInDatabase = async (bid, data) => {
  try {
    return await setDoc(doc(database, "Blogs2", bid), data);
  } catch (err) {
    console.log("Err: ", err);
  }
};
// deleteDocs

export const deleteBlogInDatabse = async (bid) => {
  try {
    return await deleteDoc(doc(database, "Blogs2", bid));
  } catch (err) {
    console.log("Err: ", err);
  }
};

// Storage
const storage = getStorage(app);

export const uploadMedia = async (img) => {
  try {
    await uploadBytesResumable(
      ref(storage, `Images/reverrBlogImages/${img.name}`),
      img
    );
    const getImg = await ref(storage, `Images/reverrBlogImages/${img.name}`);
    const imgLink = await getDownloadURL(getImg);
    return imgLink;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const deleteMedia = (imgName) => {
  deleteObject(ref(storage, `Images/reverrBlogImages/${imgName}`));
};

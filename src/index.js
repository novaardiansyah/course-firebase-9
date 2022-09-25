import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9iGP9akS_osu9Wg2UpNnAv_t8xrpt4kg",
  authDomain: "course-firebase-9.firebaseapp.com",
  projectId: "course-firebase-9",
  storageBucket: "course-firebase-9.appspot.com",
  messagingSenderId: "143259405545",
  appId: "1:143259405545:web:4bb1a56f338637b24bb478"
};

initializeApp(firebaseConfig);

// initialize database
const db = getFirestore();

// initialize collection
const books = collection(db, 'books');

// get docs
getDocs(books)
  .then((snapshot) => {
    let books = [];

    snapshot.docs.forEach((book) => {
      books.push({ id: book.id, ...book.data() });
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
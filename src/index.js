import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc
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

//  Get Real Time Data
onSnapshot(books, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((book) => {
    books.push({ id: book.id, ...book.data() });
  });

  console.log(books);
});

const addBook = document.querySelector('#add-book');
addBook.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(books, {
    title: addBook.title.value,
    author: addBook.author.value
  })
    .then(() => {
      console.log('Successfully store a new data.');
      addBook.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const deleteBook = document.querySelector('#delete-book');
deleteBook.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = doc(db, 'books', deleteBook.id.value);

  deleteDoc(book)
    .then(() => {
      console.log('Successfully deleted data.');
      deleteBook.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});
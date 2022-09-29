import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

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
const db   = getFirestore();
const auth = getAuth();

// initialize collection
const books = collection(db, 'books');

const q = query(books, orderBy('createdAt', 'asc'));

//  Get Real Time Data
const unsubColl = onSnapshot(q, (snapshot) => {
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
    author: addBook.author.value,
    createdAt: serverTimestamp()
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

// * Get a Single Document
const book = doc(db, 'books', 'CgrDuXO22BXRoXxyrFwL');

const unsubDoc = onSnapshot(book, (doc) => {
  console.log(doc.data(), doc.id);
});

const updateBook = document.querySelector('#update-book');
updateBook.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = doc(db, 'books', updateBook.idUpdate.value);

  updateDoc(book, {
    title: updateBook.titleUpdate.value,
    author: updateBook.authorUpdate.value
  })
    .then(() => {
      console.log('Successfully updated data.');
      updateBook.reset();
    } )
    .catch((error) => {
      console.log(error.message);
    });
});

const formSignup = document.querySelector('#signup-form');
formSignup.addEventListener('submit', (e) => {
  e.preventDefault();

  let email    = formSignup.email.value;
  let password = formSignup.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      formSignup.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log('Successfully sign out.');
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let email    = loginForm.emailLogin.value;
  let password = loginForm.passwordLogin.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      loginForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const unsubAuth = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is logged in.');
  } else {
    console.log('User is logged out.');
  }
});

const unsubscribe = document.querySelector('#unsubscribe');
unsubscribe.addEventListener('click', (e) => {
  e.preventDefault();
  unsubColl();
  unsubAuth();
  unsubDoc();
  console.log('Unsubscribed.');
});
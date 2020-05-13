/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
import { db } from '../main.js';

// Posts

export const publishPost = (id, userName, newPost, imagePost, time, status, userPhoto) => db.collection('posts').add({
  name: userName,
  post: newPost,
  user: id,
  photo: userPhoto,
  img: imagePost,
  time: time,
  privacy: status,
  likes: [],
});

export const getAllPosts = callback => db.collection('posts')
  .orderBy('time', 'desc')
  .onSnapshot((querySnapshot) => {
    const allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push({ id: doc.id, ...doc.data() });
    });
    callback(allPosts);
  });

// Comentarios

export const publishComment = (userName, comment, idPost, date) => db.collection('comments').add({
  user: userName,
  comment: comment,
  idPost: idPost,
  time: date,
});

// export const getComment = id => db.collection('comments').doc(id).get();

// Profile

export const createProfileInfo = (id) => {
  db.collection('users').doc(id).set({
    aboutMe: 'Cuenta un poco sobre ti',
    location: 'Ciudad, País',
  });
};

export const getProfileInfo = userId => db.collection('users').doc(userId).get();

export const getPost = id => db.collection('posts').doc(id).get();

export const updateProfileInfo = (userId, description, place) => db.collection('users').doc(userId).update({
  aboutMe: description,
  location: place,
});

export const deletePost = id => db.collection('posts').doc(id).delete();

export const updatePost = (id, post) => db.collection('posts').doc(id).update({ post: post });

export const updatePrivacy = (id, status) => db.collection('posts').doc(id).update({ privacy: status });

export const updateLike = (id, likes) => db.collection('posts').doc(id).update({ likes });

// export const time = () => firebase.firestore.FieldValue.serverTimestamp();

export const getUser = (docId) => {
  const docRef = firebase.firestore().collection('users').doc(docId);
  return docRef.get();
};

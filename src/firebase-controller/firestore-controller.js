/* eslint-disable max-len */
/* eslint-disable object-shorthand */
export const publishPost = (id, userName, newPost, imagePost, time, status, userPhoto) => firebase.firestore().collection('posts').add({
  name: userName,
  post: newPost,
  user: id,
  photo: userPhoto,
  img: imagePost,
  time,
  privacy: status,
  likes: [],
});

export const getAllPosts = callback => firebase.firestore().collection('posts')
  .orderBy('time', 'desc')
  .onSnapshot((querySnapshot) => {
    const allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push({ id: doc.id, ...doc.data() });
    });
    callback(allPosts);
  });

export const updatePost = (id, post) => firebase.firestore().collection('posts').doc(id).update({ post: post });

// export const updatePost = (id, obj = {}) => firebase.firestore().collection('posts').doc(id).update(obj); // pasar el objeto

export const updatePrivacy = (id, status) => firebase.firestore().collection('posts').doc(id).update({ privacy: status });

// Comentarios
export const publishComment = (userName, comment, idPost, date, userId) => firebase.firestore().collection('comments').add({
  user: userName,
  comment,
  idPost: idPost,
  time: date,
  userId: userId,
});

export const getAllComments = (callback, id) => firebase.firestore().collection('comments')
  .where('idPost', '==', id)
  .orderBy('time', 'asc')
  .onSnapshot((querySnapshot) => {
    const allComments = [];
    querySnapshot.forEach((doc) => {
      allComments.push({ id: doc.id, ...doc.data() });
    });
    callback(allComments);
  });

export const updateComment = (id, comment) => firebase.firestore().collection('comments').doc(id).update({ comment: comment });

// Profile
export const createProfileInfo = (id) => {
  firebase.firestore().collection('users').doc(id).set({
    aboutMe: 'Cuenta un poco sobre ti',
    location: 'Ciudad, País',
  });
};

export const getProfileInfo = userId => firebase.firestore().collection('users').doc(userId).get();

export const updateProfileInfo = (userId, description, place) => firebase.firestore().collection('users').doc(userId).update({
  aboutMe: description,
  location: place,
});

// Likes
export const updateLike = (id, likes) => firebase.firestore().collection('posts').doc(id).update({ likes });

// User
export const getUser = (docId) => {
  const docRef = firebase.firestore().collection('users').doc(docId);
  return docRef.get();
};

// Delete
export const deleteDoc = (collection, id) => firebase.firestore().collection(collection).doc(id).delete();

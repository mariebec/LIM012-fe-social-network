/* eslint-disable import/no-cycle */
import { signOut, user } from '../firebase-controller/auth-controller.js';
import { publishPost, getProfileInfo } from '../firebase-controller/firestore-controller.js';
import { uploadImagePost } from '../firebase-controller/storage-controller.js';


export const loadingInfo = () => {
  const currentUser = user();
  getProfileInfo(currentUser.uid).then((doc) => {
    localStorage.setItem('aboutMe', doc.data().aboutMe);
    localStorage.setItem('location', doc.data().location);
  });
  localStorage.setItem('name', currentUser.displayName);
  const userProfilePhoto = currentUser.photoURL || './img/profile-ico.png';
  localStorage.setItem('userphoto', userProfilePhoto);
  localStorage.setItem('userId', currentUser.uid);
};

export const signingOut = () => {
  localStorage.clear();
  signOut();
};

export const makingPost = (file, userId, userName, userPhoto) => {
  const newPost = document.querySelector('#newPost').value;
  const status = document.querySelector('.privacy').value;
  const date = new Date().toLocaleString();

  let imPost = '';
  if (file) {
    imPost = localStorage.getItem('image');
    uploadImagePost(file, userId);
  }
  publishPost(userId, userName, newPost, imPost,
    date, status, userPhoto)
    .then(() => {
      document.querySelector('.new-post').value = '';
    });
};

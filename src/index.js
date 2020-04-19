import { changeView } from './view-controler.js';
// import { signIn, } from './firebase-controller.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRUpKAaeQ9e4ibo9Y4cT4D1HIenlA2yXM',
  authDomain: 'crear-usuario-66208.firebaseapp.com',
  databaseURL: 'https://crear-usuario-66208.firebaseio.com',
  projectId: 'crear-usuario-66208',
  storageBucket: 'crear-usuario-66208.appspot.com',
  messagingSenderId: '264882127288',
  appId: '1:264882127288:web:cc17210f5ad83a83ec0f4d',
  measurementId: 'G-VHBZKPRF3V',
};

/*
 * Verificación de correo
 * const verification = () => {
 *   const user = window.firebase.auth().currentUser;
 *   user.sendEmailVerification().then(() => {
 *     // Email sent.
 *     console.log('Enviando correo');
 *   }).catch((error) => {
 *     console.log(error);
 *   });
 * };
 */

// Initialize Firebase
window.firebase.initializeApp(firebaseConfig);

/*
 * Registro de usuarios
 * const newAccount = document.getElementById('newAccount');
 * newAccount.addEventListener('click', () => {
 *   const emailSignUp = document.getElementById('emailSignUp').value;
 *   const passwordSignUp = document.getElementById('passwordSignUp').value;
 */

/*
 *   window.firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).then(() => {
 *     verification();
 *   }).catch((error) => {
 *     // Handle Errors here.
 *     const errorCode = error.code;
 *     const errorMessage = error.message;
 *     console.log(errorCode);
 *     console.log(errorMessage);
 *     // ...
 *   });
 * });
 */

const sectionContainer = document.getElementById('container');

const sessionActive = (user) => {
  // const userActive = user;
  if (user.emailVerified) {
    // Lo que muestra cuando ya hay un usuario Loggeado
    sectionContainer.innerHTML = `
    <p>Bienvenido</p>
    <button id="btnSignOut">Cerrar sesión</button>
    `;
    const btnSignOut = document.getElementById('btnSignOut');
    btnSignOut.addEventListener('click', () => {
      window.firebase.auth().signOut().then(() => {
        sectionContainer.innerHTML = '';
        console.log('Cerrando sesión');
      }).catch((error) => {
        console.log(error);
      });
    });
  } else {
    sectionContainer.innerHTML = 'Revise su correo electrónico';
  }
};

// Esto debería ir al controlador de firebase
window.firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Si hay un usuario loggeado debería mostrar directamente el muro de la red social
    sessionActive(user);
    console.log('Hay un user loggeado');
  } else {
    // Si No hay un usuario loggeado debería mostrar la vista de inicio de sesión
    console.log('No hay usuario loggeado');

    /*
     * Inicio de sesión
     * const btnLogIn = document.getElementById('btnLogIn');
     * btnLogIn.addEventListener('click', () => {
     *   const emailLogIn = document.getElementById('emailLogIn').value;
     *   const passwordLogIn = document.getElementById('passwordLogIn').value;
     */

    /*
     * YA ESTA EN CONTROLLER
     *   window.firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn).catch((error) => {
     *     // Handle Errors here.
     *     const errorCode = error.code;
     *     const errorMessage = error.message;
     *     console.log(errorCode);
     *     console.log(errorMessage);
     *     // ...
     *   });
     * });
     */
  }
});

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);

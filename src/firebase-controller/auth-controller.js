/* eslint-disable max-len */
// Iniciar sesión
export const signIn = (emailLogIn, passwordLogIn) => firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);

// Registrar usuario
export const signUp = (emailSignUp, passwordSignUp) => firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);

// Verificación de email
export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

// Cerrar sesión
export const signOut = () => firebase.auth().signOut();

// Iniciar sesión con Google
export const logInGoogle = () => {
  // Creando instancia del proveedor - Google
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGoogle);
};

// Usuario loggeado
export const user = () => firebase.auth().currentUser;

// Guardando/actualizando nombre de usuario
export const updateUserName = userName => firebase.auth().currentUser.updateProfile({
  displayName: userName,
});

// Guardando/actualizando foto de usuario
export const updatePhotoAuth = photoProfile => firebase.auth().currentUser.updateProfile({
  photoURL: photoProfile,
});

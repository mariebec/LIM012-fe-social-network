/* eslint-disable import/no-cycle */
import { signUp, verificationEmail } from '../firebase-controller.js';
import { changeView } from '../view-controller/router.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('signup');
  viewSignUp.innerHTML = `
    <img src="../src/img/logo.svg" alt="Voz Amiga" class="hide-show"> 
    <div class="register-container">
        <div class="register-container register">
            <p class="text-purple">Regístrate</p>
            <input class="input-register" id="nameUser" type="text" placeholder="Nombre de usuario"><p id= "alertIconN" class= "hide">*</p>
            <div class="msgAlertReg">
              <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail"><p id= "alertIconE" class= "hide">*</p>
              <span class="balloon ocult">Ingrese un e-mail valido</span>
            </div>
            <div class="msgAlertReg">
              <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña" maxlength= "20"><p id= "alertIconP" class= "hide">*</p>
              <span class="balloon ocult">Tamaño mínimo de 6 caracteres</span>
            </div>
            <button class="btn-new-account btn-locked" id="btnNewAccount" disabled= true>Crear cuenta</button>
            <p class="text-init-app">o ingresa con</p>
        </div>
        <p class="text2">¿Ya tienes una cuenta?</p>
        <a class="text-init-session" id="btnViewLogIn" href="#/signin">Inicia sesión</a>
    </div>`;

  const nameUser = viewSignUp.querySelector('#nameUser');
  const emailLogUp = viewSignUp.querySelector('#emailSignUp');
  const passwordLogUp = viewSignUp.querySelector('#passwordSignUp');
  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');
  const alertIconN = viewSignUp.querySelector('#alertIconN');
  const alertIconE = viewSignUp.querySelector('#alertIconE');
  const alertIconP = viewSignUp.querySelector('#alertIconP');


  // Validación de formulario

  nameUser.addEventListener('blur', () => {
    const patronName = /^[A-Za-z]+$/;
    const coincideName = patronName.test(nameUser.value);
    if (coincideName) {
      alertIconN.classList.add('hide');
      nameUser.classList.remove('inputInvalid');
      // btnNewAccount.classList.remove('btn-locked');
      // console.log('verdadero usuario');
    } else {
      alertIconN.classList.remove('hide');
      alertIconN.classList.add('iconInvalid');
      nameUser.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton usuario');
    }
  });

  emailLogUp.addEventListener('blur', () => {
    const patronEmail = /[A-Za-z0-9]+@[a-z]+\.[a-z]+/;
    const coincideEmail = patronEmail.test(emailLogUp.value);
    if (coincideEmail) {
      alertIconE.classList.add('hide');
      emailLogUp.classList.remove('inputInvalid');
      // btnNewAccount.classList.remove('btn-locked');
      // console.log('verdadero email');
    } else {
      alertIconE.classList.remove('hide');
      alertIconE.classList.add('iconInvalid');
      emailLogUp.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton email');
    }
  });

  passwordLogUp.addEventListener('input', () => {
    const patronPassword = /[A-Za-z0-9]{6,20}$/;
    const coincidenciaPassword = patronPassword.test(passwordLogUp.value);
    if (coincidenciaPassword) {
      alertIconP.classList.add('hide');
      passwordLogUp.classList.remove('inputInvalid');
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
      // console.log('verdadero password');
    } else {
      alertIconP.classList.remove('hide');
      alertIconP.classList.add('iconInvalid');
      passwordLogUp.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton password');
    }
  });
  // Termina validación de formulario


  btnNewAccount.addEventListener('click', () => {
    const emailLogUpValue = viewSignUp.querySelector('#emailSignUp').value;
    const passwordLogUpValue = viewSignUp.querySelector('#passwordSignUp').value;

    signUp(emailLogUpValue, passwordLogUpValue).then(() => {
      // console.log(verificationEmail());
      verificationEmail().then(() => {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = 'Revisa tu correo electrónico para terminar el registro';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      });
    });
  });

  const btnViewLogIn = viewSignUp.querySelector('#btnViewLogIn');
  btnViewLogIn.addEventListener('click', () => {
    changeView('#/signin');
  });

  return viewSignUp;
};

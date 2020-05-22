/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { eachPost } from './post.js';
import { loadingInfo, signingOut, makingPost } from '../view-controller/home-controller.js';


export default (notes) => {
  loadingInfo();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('name');
  const userPhoto = localStorage.getItem('userphoto');

  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
    <label id="menu-mobile" class="menu-mobile"></label>
    <nav class="nav-home hide">
      <ul class="menu-home">
        <li class="btn-go-profile" id="btnProfile"><img class="pro-pic-small" src="${userPhoto}">Perfil</li>
        <li class="btn-go-out" id="btnSignOut"><img class="ico-sign-out" src="./img/sign-out.png">Cerrar sesión</li>
      </ul>
    </nav>
    <img src="./img/logo-voz-amiga.png" alt="Voz Amiga">
    </header>
    <section class="container-home">
      <div class="profile-section">
        <div class="cover-image"></div>
        <div class="profile">
          <div class="profile-photo-name">
            <div class="profile-picture">
              <img id="profilePhoto" class="profile-picture" src="${userPhoto}" alt="">
            </div>
            <p class="user-name">${userName}</p>
          </div>
          <h3 class="about-me">Sobre mí</h3>
          <p class="profile-text">${localStorage.getItem('aboutMe')}</p>
          <div class="location-info">
            <img src="./img/location.png">
            <span id="location">${localStorage.getItem('location')}</span>
          </div>
        </div>
      </div>
      <div class="timeline">
        <div class="container-create-post">
          <img class="like-picture" src="${userPhoto}" alt="">
          <div class="post left">
            <textarea class="new-post" id="newPost" placeholder="¿Qué quisieras compartir?"></textarea>
            <img id="showPicture" class="post-new-image" src="#" alt="">
            <button id="btnCancelImg" class="hide cancel-image"></button>
            <div class="buttons-new-post">
              <div class="options">
                <label for="selectImage">
                  <input type="file" id="selectImage" class="upload" accept="image/jpeg, image/png, image/gif">
                  <img class ="point-photo" src="./img/add-photo.svg">
                </label>
                <div class="container-privacy">
                  <select class="privacy text-1">
                    <option value="0">&#xf0ac</option>
                    <option value="1">&#xf023</option>
                  </select>
                  <i></i>
                </div>
              </div>
              <button id="btnNewPost" class="btn-post">Publicar</button>
            </div>
          </div>
        </div>
        <div class="all-posts"></div>
      </div>
    </section>`;

  const profileSection = viewSignInUser.querySelector('.profile-section');
  const view750px = window.matchMedia('(max-width: 750px)');
  view750px.addEventListener('change', () => {
    if (view750px.matches) {
      profileSection.classList.add('hide');
    } else {
      profileSection.classList.remove('hide');
    }
  });

  const selectImage = viewSignInUser.querySelector('#selectImage');
  const showPicture = viewSignInUser.querySelector('#showPicture');
  const btnCancelImg = viewSignInUser.querySelector('#btnCancelImg');

  let file = '';
  selectImage.addEventListener('change', (e) => {
    // Vista previa de imagen cargada
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      showPicture.src = dataURL;
      // Almacena url en localStorage
      localStorage.setItem('image', dataURL);
    };
    reader.readAsDataURL(input.files[0]);

    file = e.target.files[0];

    // Botón para cancelar imagen
    btnCancelImg.classList.remove('hide');
  });

  const menuMobile = viewSignInUser.querySelector('#menu-mobile');
  const navHome = viewSignInUser.querySelector('.nav-home');
  menuMobile.addEventListener('click', () => {
    navHome.classList.toggle('hide');
  });

  const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', signingOut);

  const btnProfile = viewSignInUser.querySelector('#btnProfile');
  btnProfile.addEventListener('click', () => {
    changeView('#/profile');
  });

  const btnNewPost = viewSignInUser.querySelector('#btnNewPost');
  btnNewPost.addEventListener('click', () => {
    makingPost(file, userId, userName, userPhoto);
  });

  // Leyendo datos del database
  const allPosts = viewSignInUser.querySelector('.all-posts');
  notes.forEach((element) => {
    allPosts.appendChild(eachPost(element));
  });

  // Cancela imagen antes de publicar
  btnCancelImg.addEventListener('click', () => {
    localStorage.removeItem('image');
    showPicture.src = '';
    btnCancelImg.classList.add('hide');
  });

  return viewSignInUser;
};

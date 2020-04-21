import { components } from '../view/index.js';

const changeView = (route) => {
    const sectionContainer = document.getElementById('container');
    sectionContainer.innerHTML = '';
    let routeSelected = '';
    switch (route) {
        case '#/signin': routeSelected = sectionContainer.appendChild(components.signin());
        break;
        case '#/signup': routeSelected = sectionContainer.appendChild(components.signup());
        break;
        case '#/home': routeSelected = sectionContainer.appendChild(components.home());
        break;
        default: routeSelected = 'no se ha encontrado la ruta';
        break;
    }

    return routeSelected;
};

export { changeView };
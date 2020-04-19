import { components } from './view/router.js';

const changeView = (route) => {
    const sectionContainer = document.getElementById('container');
    sectionContainer.innerHTML = '';
    let routeSelected = '';
    switch (route) {
        case '#/': routeSelected = sectionContainer.appendChild(components.signin());
        break;
        case '#/signup': routeSelected = sectionContainer.appendChild(components.signup());
        break;
        default: routeSelected = 'no se ha encontrado la ruta';
            break;
    }

    return routeSelected;
};

export { changeView };

import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import App from 'c/app';

const app = createElement('c-app', { is: App });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);

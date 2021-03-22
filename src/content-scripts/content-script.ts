console.log('Hello from the content-script');

// make mount point in DOM
const appEl = document.createElement('div');
appEl.setAttribute('id', 'ohi-app');
document.body.appendChild(appEl);

// make vue app
import { createApp } from 'vue';
import App from './App.vue';
// create app
export const app = createApp(App);

// add custom vue reactive store
import store from '@/store';
app.config.globalProperties.$store = store;

// mount app to DOM
export const vm = app.mount('#ohi-app');

//
// setInterval(() => {
// 	console.log('Hello from the content-script');

// 	// console.log('d', document);
// }, 1000);

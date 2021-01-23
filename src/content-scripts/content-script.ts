console.log('Hello from the content-script');

// make mount point in DOM
const appEl = document.createElement('div');
appEl.setAttribute('id', 'ohi-app');
document.body.appendChild(appEl);

// make vue app
import { createApp } from 'vue';
import App from './App.vue';
// mount app
createApp(App).mount('#ohi-app');

//
setInterval(() => {
	console.log('Hello from the content-script');

	// console.log('d', document);
}, 1000);

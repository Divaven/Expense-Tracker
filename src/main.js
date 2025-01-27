import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');

store.commit('setExpenses', JSON.parse(localStorage.getItem('expense_tracker_expenses')) || []);

import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema (descomentado)
import 'primevue/resources/primevue.min.css'; // Estilos base de PrimeVue (descomentado)
import 'primeicons/primeicons.css'; // Iconos de PrimeIcons (descomentado)

// Crear la aplicación una sola vez
const app = createApp(App);

// Usar PrimeVue y el router
app.use(PrimeVue);
app.use(router);

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');

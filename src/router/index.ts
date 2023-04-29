import * as vueRouter from 'vue-router';

// 1. Define route components.
import HomeView from '../components/views/HomeView.vue';
import EditorView from '../components/views/EditorView.vue';
// import PublishedTextView from '../components/views/PublishedTextView.vue';
// import InfoTextView from '../components/views/InfoTextView.vue';
// import UserTextListView from '../components/views/UserTextListView.vue';
import UserProfileView from '../components/views/UserProfileView.vue';
import LoginView from '../components/views/LoginView.vue';
import RegisterView from '../components/views/RegisterView.vue';
// import ConnectWalletView from '../components/views/ConnectWalletView.vue';
// import PublishView from '../components/views/PublishView.vue';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: vueRouter.RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/edit', name: 'Editor', component: EditorView },
  // { path: '/edit/:id', name: 'EditorUpdate', component: EditorView },
  // { path: '/text/:id', name: 'Text', component: PublishedTextView },
  // { path: '/info', name: 'Info', component: InfoTextView },
  // { path: '/texts', name: 'TextList', component: UserTextListView },
  { path: '/profile', name: 'Profile', component: UserProfileView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  // { path: '/connect-wallet', name: 'ConnectWallet', component: ConnectWalletView },
  // { path: '/publish', name: 'publish', component: PublishView },
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: HomeView },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = vueRouter.createRouter({
  // 4. Provide the history implementation to use. 
  // We are using the hash history for simplicity here.
  history: vueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;

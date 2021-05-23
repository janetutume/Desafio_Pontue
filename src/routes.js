import List from './pages/List.vue';
import Login from './pages/Login.vue';
import View from './pages/View.vue';
import AdminList from './pages/AdminList.vue';

export const routes = [{
    path: '',
    component: Login
  },
  {
    path: '/list',
    component: List
  },
  {
    path: '/view',
    component: View
  },
  {
    path: '/adminlist',
    component: AdminList
  }
];

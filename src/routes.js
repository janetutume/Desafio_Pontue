import List from './pages/List.vue';
import Login from './pages/Login.vue';
import View from './pages/View.vue';
import AdminList from './pages/AdminList.vue';
import ViewRedaction from './pages/ViewRedaction.vue';

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
  },
  {
      path:'/viewredaction',
      component: ViewRedaction
  }
];

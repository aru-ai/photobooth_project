import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'camera', component: () => import('pages/CameraPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      {
        path: 'take-photo',
        component: () => import('pages/TakePhotoPage.vue'),
      },
      {
        path: 'record-video',
        component: () => import('pages/RecordVideoPage.vue'),
      },
    ],
  },
];

export default routes;

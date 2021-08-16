export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [{ name: 'Login', path: '/user/login', component: './user/Login' }],
      },
      { component: './404' },
    ],
  },
  {
    path: '/tenant-management',
    icon: 'crown',
    name: 'テナント管理',
    routes: [
      {
        path: '/tenant-management/tenant',
        name: 'テナント',
        icon: 'smile',
        component: './Tenant',
      },
      {
        redirect: '/tenant-management/tenant',
      },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/tenant-management/tenant' },
  { path: '/permission-deny', component: './403' },
  { component: './404' },
];

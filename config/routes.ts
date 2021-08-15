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
        path: '/tenant-management/camera',
        name: 'カメラ',
        icon: 'smile',
        component: './404',
      },
      {
        redirect: '/tenant-management/tenant',
      },
    ],
  },
  { path: '/welcome', name: 'Welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: 'Admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: 'Sub-Page', icon: 'smile', component: './Admin' },
      { component: './404' },
    ],
  },
  { name: 'Search Table', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/tenant-management/tenant' },
  { component: './404' },
];

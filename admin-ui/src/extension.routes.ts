export const extensionRoutes = [  {
    path: 'extensions/my-admin-ui',
    loadChildren: () => import('./extensions/my-admin-ui-ui/routes'),
  },
  {
    path: 'extensions/web-content',
    loadChildren: () => import('./extensions/web-content-ui/routes'),
  }];

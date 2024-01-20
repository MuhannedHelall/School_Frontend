import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import route from 'src/routes';
import DashboardLayout from 'src/layouts/dashboard';

import Auth from './auth';

// SuperAdmin Pages
export const SuperIndex = lazy(() => import('src/pages/superAdmin/app'));
export const DeptsPage = lazy(() => import('src/pages/superAdmin/department'));
export const AdminsPage = lazy(() => import('src/pages/superAdmin/admin'));

// Admin Pages
export const AdminIndex = lazy(() => import('src/pages/admin'));
export const EmpsPage = lazy(() => import('src/pages/admin/employee'));

// Other Pages
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: route.login,
      element: <LoginPage />,
    },
    {
      path: route.landing,
      element: <h1>Landing Page</h1>,
    },
    {
      element: (
        <Auth>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </Auth>
      ),
      children: [
        {
          path: route.super.index,
          children: [
            { element: <SuperIndex />, index: true },
            { path: route.super.admins, element: <AdminsPage /> },
            { path: route.super.depts, element: <DeptsPage /> },
          ],
        },
        {
          path: route.admin.index,
          children: [
            { element: <AdminIndex />, index: true },
            { path: route.admin.emps, element: <EmpsPage /> },
          ],
        },
      ],
    },
    {
      path: route.notFound,
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to={route.notFound} replace />,
    },
  ]);

  return routes;
}

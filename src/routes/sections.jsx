import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import route from 'src/routes';
import DashboardLayout from 'src/layouts/dashboard';

import Auth from './auth';
import SuperAuth from './superAuth';
import AdminAuth from './adminAuth';

// SuperAdmin Pages
export const SuperIndex = lazy(() => import('src/pages/superAdmin/app'));
export const DeptsPage = lazy(() => import('src/pages/superAdmin/department'));
export const DeptsIdPage = lazy(() => import('src/pages/superAdmin/deptId'));
export const AdminsPage = lazy(() => import('src/pages/superAdmin/admin'));

// Admin Pages
export const AdminIndex = lazy(() => import('src/pages/admin'));
export const EmpsPage = lazy(() => import('src/pages/admin/employee'));
export const SubjectsPage = lazy(() => import('src/pages/admin/subject'));
export const StudentPage = lazy(() => import('src/pages/admin/showStudent'));
export const StudentsPage = lazy(() => import('src/pages/admin/student'));
export const ClassesPage = lazy(() => import('src/pages/admin/class'));

// Teacher Pages
export const TeacherIndex = lazy(() => import('src/pages/teacher/index'));
export const TeacherClasses = lazy(() => import('src/pages/teacher/class'));
export const SchedulePage = lazy(() => import('src/pages/teacher/schedule'));

// Other Pages
export const LandingPage = lazy(() => import('src/pages/landing'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const EditProfilePage = lazy(() => import('src/pages/editProfile'));
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
      element: <LandingPage />,
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
          path: route.editProfile,
          element: <EditProfilePage />,
        },
        {
          path: route.super.index,
          children: [
            { element: <SuperIndex />, index: true },
            {
              path: route.super.admins,
              element: (
                <SuperAuth>
                  <AdminsPage />
                </SuperAuth>
              ),
            },
            {
              path: route.super.depts,
              element: (
                <SuperAuth>
                  <DeptsPage />
                </SuperAuth>
              ),
            },
            {
              path: route.super.deptsId,
              element: (
                <SuperAuth>
                  <DeptsIdPage />
                </SuperAuth>
              ),
            },
          ],
        },
        {
          path: route.admin.index,
          children: [
            { element: <AdminIndex />, index: true },
            {
              path: route.admin.emps,
              element: (
                <AdminAuth>
                  <EmpsPage />
                </AdminAuth>
              ),
            },
            {
              path: route.admin.subjects,
              element: (
                <AdminAuth>
                  <SubjectsPage />
                </AdminAuth>
              ),
            },
            {
              path: route.admin.students,
              element: (
                <AdminAuth>
                  <StudentsPage />
                </AdminAuth>
              ),
            },
            {
              path: route.admin.studentsId,
              element: (
                <AdminAuth>
                  <StudentPage />
                </AdminAuth>
              ),
            },
            {
              path: route.admin.classes,
              element: (
                <AdminAuth>
                  <ClassesPage />
                </AdminAuth>
              ),
            },
          ],
        },
        {
          path: route.teacher.index,
          children: [
            { element: <TeacherIndex />, index: true },
            { path: route.teacher.classes, element: <TeacherClasses /> },
            { path: route.teacher.schedule, element: <SchedulePage /> },
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

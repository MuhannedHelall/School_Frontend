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
export const LecturesPage = lazy(() => import('src/pages/admin/lectures'));
export const LecturePage = lazy(() => import('src/pages/admin/lecture'));
export const TimeTablePage = lazy(() => import('src/pages/admin/timetable'));
export const StudentPage = lazy(() => import('src/pages/admin/showStudent'));
export const StudentsPage = lazy(() => import('src/pages/admin/student'));
export const ClassesPage = lazy(() => import('src/pages/admin/class'));
export const TeacherTablePage = lazy(() => import('src/pages/admin/teacherTimetable'));

// Teacher Pages
export const TeacherIndex = lazy(() => import('src/pages/teacher/index'));
export const TeacherSubjects = lazy(() => import('src/pages/teacher/subject'));
export const TeacherSubjectsLectures = lazy(() => import('src/pages/teacher/subjectLectures'));
export const TeacherSubjectsGrades = lazy(() => import('src/pages/teacher/subjectGrade'));
export const TeacherLecturePage = lazy(() => import('src/pages/teacher/LecturePage'));
export const TeacherSchedulePage = lazy(() => import('src/pages/teacher/schedule'));

// Student Pages
export const StudentIndex = lazy(() => import('src/pages/student/index'));
export const StudentSubjects = lazy(() => import('src/pages/student/subject'));
export const StudentSchedulePage = lazy(() => import('src/pages/student/schedule'));
// export const StudentGrades = lazy(() => import('src/pages/student/grades'));
export const StudentSubjectsLectures = lazy(() => import('src/pages/student/subjectLectures'));
export const StudentLecturePage = lazy(() => import('src/pages/student/LecturePage'));

// Other Pages
export const LandingPage = lazy(() => import('src/pages/landing'));
export const VarkPage = lazy(() => import('src/pages/vark'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
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
      path: route.vark,
      element: <VarkPage />,
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
          path: `${route.profile}:id`,
          element: <ProfilePage />,
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
              path: `${route.super.deptsId}:id`,
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
              path: `${route.admin.lectures}:id`,
              element: (
                <AdminAuth>
                  <LecturesPage />
                </AdminAuth>
              ),
            },
            {
              path: `${route.admin.lecture}:id`,
              element: (
                <AdminAuth>
                  <LecturePage />
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
            {
              path: `${route.admin.students}`,
              element: (
                <AdminAuth>
                  <StudentsPage />
                </AdminAuth>
              ),
            },
            {
              path: `${route.admin.studentsSubjectId}:subject_id`,
              element: (
                <AdminAuth>
                  <StudentsPage />
                </AdminAuth>
              ),
            },
            {
              path: `${route.admin.studentsId}:id`,
              element: (
                <AdminAuth>
                  <StudentPage />
                </AdminAuth>
              ),
            },
            {
              path: route.admin.timetable,
              element: (
                <AdminAuth>
                  <TimeTablePage />
                </AdminAuth>
              ),
            },
            {
              path: `${route.admin.teacherTimetable}:id`,
              element: (
                <AdminAuth>
                  <TeacherTablePage />
                </AdminAuth>
              ),
            },
          ],
        },
        {
          path: route.teacher.index,
          children: [
            { element: <TeacherIndex />, index: true },
            { path: route.teacher.schedule, element: <TeacherSchedulePage /> },
            {
              path: route.teacher.subjects,
              element: <TeacherSubjects />,
            },
            {
              path: `${route.teacher.subjectLectures}:id`,
              element: <TeacherSubjectsLectures />,
            },
            {
              path: `${route.teacher.subjectGrades}:id`,
              element: <TeacherSubjectsGrades />,
            },
            {
              path: `${route.teacher.lecture}:id`,
              element: <TeacherLecturePage />,
            },
          ],
        },
        {
          path: route.student.index,
          children: [
            { element: <StudentIndex />, index: true },
            {
              path: route.student.subjects,
              element: <StudentSubjects />,
            },
            {
              path: `${route.student.schedule}`,
              element: <StudentSchedulePage />,
            },
            {
              path: `${route.student.subjectLectures}:id`,
              element: <StudentSubjectsLectures />,
            },
            // {
            //   path: `${route.student.subjectGrades}:id`,
            //   element: <StudentGrades />,
            // },
            {
              path: `${route.student.lecture}:id`,
              element: <StudentLecturePage />,
            },
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

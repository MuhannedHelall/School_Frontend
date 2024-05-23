import route from 'src/routes';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = {
  super: [
    {
      title: 'Dashboard',
      path: route.super.index,
      icon: icon('ic_analytics'),
    },
    {
      title: 'Admins',
      path: route.super.admins,
      icon: icon('ic_user'),
    },
    {
      title: 'Departments',
      path: route.super.depts,
      icon: icon('ic_blog'),
    },
  ],
  admin: {
    teacher: [
      {
        title: 'Dashboard',
        path: route.admin.index,
        icon: icon('ic_analytics'),
      },
      {
        title: 'Teachers',
        path: route.admin.emps,
        icon: icon('ic_user'),
      },
      {
        title: 'Subjects',
        path: route.admin.subjects,
        icon: icon('ic_blog'),
      },
      {
        title: 'Timetables',
        path: route.admin.timetable,
        icon: icon('ic_lock'),
      },
    ],
    student: [
      {
        title: 'Dashboard',
        path: route.admin.index,
        icon: icon('ic_analytics'),
      },
      {
        title: 'Classes',
        path: route.admin.classes,
        icon: icon('ic_cart'),
      },
      {
        title: 'Students',
        path: route.admin.students,
        icon: icon('ic_user'),
      },
    ],
    employee: [
      {
        title: 'Dashboard',
        path: route.admin.index,
        icon: icon('ic_analytics'),
      },
      {
        title: 'Employees',
        path: route.admin.emps,
        icon: icon('ic_user'),
      },
    ],
  },
  teacher: [
    {
      title: 'Dashboard',
      path: route.teacher.index,
      icon: icon('ic_analytics'),
    },
    {
      title: 'Subjects',
      path: route.teacher.subjects,
      icon: icon('ic_blog'),
    },
    {
      title: 'Schedule',
      path: route.teacher.schedule,
      icon: icon('ic_lock'),
    },
  ],
  student: [
    {
      title: 'Dashboard',
      path: route.student.index,
      icon: icon('ic_analytics'),
    },
    {
      title: 'Subjects',
      path: route.student.subjects,
      icon: icon('ic_blog'),
    },
    {
      title: 'Schedule',
      path: route.student.schedule,
      icon: icon('ic_lock'),
    },
  ],
};

export default navConfig;

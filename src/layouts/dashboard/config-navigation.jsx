import route from 'src/routes';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
const navConfig = {
  super: {
    en: [
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
    ar: [
      {
        title: 'لوحة القيادة',
        path: route.super.index,
        icon: icon('ic_analytics'),
      },
      {
        title: 'المديرين',
        path: route.super.admins,
        icon: icon('ic_user'),
      },
      {
        title: 'الاقسام',
        path: route.super.depts,
        icon: icon('ic_blog'),
      },
    ],
  },
  admin: {
    teacher: {
      en: [
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
      ar: [
        {
          title: 'لوحة القيادة',
          path: route.admin.index,
          icon: icon('ic_analytics'),
        },
        {
          title: 'المعلمين',
          path: route.admin.emps,
          icon: icon('ic_user'),
        },
        {
          title: 'المواد الدراسية',
          path: route.admin.subjects,
          icon: icon('ic_blog'),
        },
        {
          title: 'الجداول',
          path: route.admin.timetable,
          icon: icon('ic_lock'),
        },
      ],
    },
    student: {
      en: [
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
        {
          title: 'Tution Fees',
          path: route.admin.tution,
          icon: icon('ic_blog'),
        },
      ],
      ar: [
        {
          title: 'لوحة القيادة',
          path: route.admin.index,
          icon: icon('ic_analytics'),
        },
        {
          title: 'الفصول',
          path: route.admin.classes,
          icon: icon('ic_cart'),
        },
        {
          title: 'الطلاب',
          path: route.admin.students,
          icon: icon('ic_user'),
        },
        {
          title: 'المصاريف الدراسية',
          path: route.admin.tution,
          icon: icon('ic_blog'),
        },
      ],
    },
    employee: {
      en: [
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
      ar: [
        {
          title: 'لوحة القيادة',
          path: route.admin.index,
          icon: icon('ic_analytics'),
        },
        {
          title: 'الموظفين',
          path: route.admin.emps,
          icon: icon('ic_user'),
        },
      ],
    },
  },
  teacher: {
    en: [
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
    ar: [
      {
        title: 'لوحة القيادة',
        path: route.teacher.index,
        icon: icon('ic_analytics'),
      },
      {
        title: 'المواد الدراسية',
        path: route.teacher.subjects,
        icon: icon('ic_blog'),
      },
      {
        title: 'الجدول',
        path: route.teacher.schedule,
        icon: icon('ic_lock'),
      },
    ],
  },
  student: {
    en: [
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
    ar: [
      {
        title: 'لوحة القيادة',
        path: route.student.index,
        icon: icon('ic_analytics'),
      },
      {
        title: 'المواد الدراسية',
        path: route.student.subjects,
        icon: icon('ic_blog'),
      },
      {
        title: 'الجدول',
        path: route.student.schedule,
        icon: icon('ic_lock'),
      },
    ],
  },
};

export default navConfig;

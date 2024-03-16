const route = {
  login: '/login',
  landing: '/',
  editProfile: '/editProfile',
  super: {
    index: '/superAdmin',
    admins: '/superAdmin/admins',
    depts: '/superAdmin/departments',
    deptsId: '/superAdmin/departments/:id',
  },
  admin: {
    index: '/admin',
    emps: '/admin/employees',
    students: '/admin/students',
    studentsId: '/admin/students/:id',
    subjects: '/admin/subjects',
    classes: '/admin/classes',
  },
  teacher: {
    index: '/teacher',
    // classes: '/teacher/classes',
    schedule: '/teacher/schedule',
    // lectures: '/teacher/lectures',
    // quizes: '/teacher/quizes',
    // assignments: '/teacher/assignments',
    // exams: '/teacher/exams',
  },
  notFound: '/notfound',
};

export default route;

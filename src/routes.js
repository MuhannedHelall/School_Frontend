const route = {
  login: '/login',
  landing: '/',
  editProfile: '/editProfile',
  super: {
    index: '/superAdmin',
    admins: '/superAdmin/admins',
    depts: '/superAdmin/departments',
    deptsId: '/superAdmin/departments/',
  },
  admin: {
    index: '/admin',
    emps: '/admin/employees',
    students: '/admin/students',
    studentsId: '/admin/students/:id',
    subjects: '/admin/subjects',
    classes: '/admin/classes',
    timetable: '/admin/timetable',
  },
  teacher: {
    index: '/teacher',
    schedule: '/teacher/schedule',
    subjects: '/teacher/subjects',
    subjectLectures: '/teacher/subjects/',
    subjectGrades: '/teacher/subjects/grade/',
    lecture: '/teacher/lectures/',
    // classes: '/teacher/classes',
    // quizes: '/teacher/quizes',
    // assignments: '/teacher/assignments',
    // exams: '/teacher/exams',
  },
  notFound: '/notfound',
};

export default route;

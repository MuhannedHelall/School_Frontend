const route = {
  login: '/login',
  landing: '/',
  vark: '/vark-test',
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
    studentsSubjectId: '/admin/students/',
    studentsId: '/admin/student/',
    subjects: '/admin/subjects',
    lectures: '/admin/lectures/',
    lecture: '/admin/lecture/',
    classes: '/admin/classes',
    timetable: '/admin/timetable',
    teacherTimetable: '/admin/timetable/',
  },
  teacher: {
    index: '/teacher',
    schedule: '/teacher/schedule',
    subjects: '/teacher/subjects',
    subjectLectures: '/teacher/subjects/',
    subjectGrades: '/teacher/subjects/grade/',
    lecture: '/teacher/lectures/',
  },
  student: {
    index: '/student',
    schedule: '/student/schedule',
    subjects: '/student/subjects',
    subjectLectures: '/student/subjects/',
    subjectGrades: '/student/subjects/grade/',
    lecture: '/student/lectures/',
  },

  notFound: '/notfound',
};

export default route;

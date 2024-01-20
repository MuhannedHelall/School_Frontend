const route = {
  login: '/login',
  landing: '/',
  super: {
    index: '/superAdmin',
    admins: '/superAdmin/admins',
    depts: '/superAdmin/departments',
  },
  admin: {
    index: '/admin',
    emps: '/admin/employees',
  },
  notFound: '/404',
};

export default route;

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
  admin: [
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
};

export default navConfig;

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Admins',
    path: '/admins',
    icon: icon('ic_user'),
  },
  {
    title: 'Departments',
    path: '/departments',
    icon: icon('ic_blog'),
  },
];

export default navConfig;

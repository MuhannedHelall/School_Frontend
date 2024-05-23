import route from 'src/routes';

export function goHome(role) {
  switch (role) {
    case 'superAdmin':
      return route.super.index;
    case 'admin':
      return route.admin.index;
    case 'teacher':
      return route.teacher.index;
    case 'student':
      return route.student.index;
    default:
      return route.login;
  }
}

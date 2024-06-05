import route from 'src/routes';

export function goHome(role, isFirstTimeLogin) {
  switch (role) {
    case 'superAdmin':
      return route.super.index;
    case 'admin':
      return route.admin.index;
    case 'teacher':
      return route.teacher.index;
    case 'student':
      if (isFirstTimeLogin) return route.vark;
      return route.student.index;
    default:
      return route.login;
  }
}

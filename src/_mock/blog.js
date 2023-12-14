import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const DEPT_NAME = ['Finance', 'Marketing', "Student's affairs", 'Teachers', "Employee's affairs"];

export const posts = [...Array(5)].map((_, index) => ({
  id: faker.string.uuid(),
  title: DEPT_NAME[index % 6],
  numOfAdmins: faker.number.int({ min: 1, max: 5 }),
  numOfEmps: faker.number.int(100),
  mainAdmin: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

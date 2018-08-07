import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS : NbMenuItem[] = [
 {
    title: 'Upload',
    icon: 'nb-cloudy',
    link: '/upload',
    home: true
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/login'
      },
      {
        title: 'Logout',
        link: '/logout'
      },
    ]
  },
];


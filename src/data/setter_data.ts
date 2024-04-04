type setter = {
  name: string;
  image_url: string;
  imageInCenter?: boolean;
  roll?: number;
  group?: number;
  email?: string;
  phone?: string;
  profile_url?: string | { platform: string; url: string }[];
  modal_image_url?: string;
  post: string;
  dept?: string | null;
};

const x: setter[] = [
  {
    name: 'Ashiqul Islam',
    image_url: '/Images/setters/Ashiqul-Islam.jpg',
    post: 'Software Engineer',
    dept: 'Google',
    profile_url: [],
  },
  {
    name: 'Fahim Shahriar Shakkhor',
    image_url: '/Images/setters/Fahim-Shahriar-Shakkhor.jpg',
    post: 'Software Engineer ',
    dept: 'Google',
    profile_url: [],
  },
  {
    name: 'Adnan Toky',
    image_url: '/Images/setters/Adnan-Toky.jpg',
    post: 'CSE',
    dept: 'RUET',
    profile_url: [],
  },
  {
    name: 'Jubayer Nirjhor',
    image_url: '/Images/setters/Jubayer-Nirjhor.jpg',
    post: 'CSE',
    dept: 'DU',
    profile_url: [],
  },
];

export default x;

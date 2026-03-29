const classes = [
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'SSC-26',
  '11',
  '12',
  'HSC-25',
  'POLYTECHNIC-1ST',
  'POLYTECHNIC-2ND',
];

const tShirtSize = ['S', 'M', 'L', 'XL', 'XXL'];

const regDataInit = {
  address: '',
  class: '6',
  codeforcesHandle: '',
  email: '',
  fbLink: '',
  GuardianMobile: '',
  GuardianName: '',
  imageUrl: '',
  institution: '',
  mobile: '',
  name: '',
  verified: false,
  tophHandle: '',
  tophPassword: '',
  selected: false,
  paymentPhone: '',
  transactionId: '',
  tShirtSize: '',
  paymentStatus: false,
  recordingLink: '',
  caCode: '',
  clubPartnerCode: '',
};

type regDataType = typeof regDataInit;

// const registratin

export { regDataInit, classes, tShirtSize };
export type { regDataType };

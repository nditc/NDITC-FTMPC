const classes = [
  '6',
  '7',
  '8',
  '9',
  '10',
  'SSC-25',
  '11',
  '12',
  'HSC-24',
  'POLYTECHNIC-1ST',
  'POLYTECHNIC-2ND',
];

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
  refId: '',
  paymentStatus: false,
  recordingLink: '',
};

type regDataType = typeof regDataInit;

// const registratin

export { regDataInit, classes };
export type { regDataType };

import { regDataType } from '@/db/registerData';

// Pass the 'language' parameter to specify the language (optional).
// Defaults to 'en' if no valid language code is provided.
const verifyData: (regData: regDataType, pass: string, confPass: string) => [boolean, string] = (
  regData,
  pass,
  confPass
) => {
  let isVerified = true;

  if (pass.length <= 8) {
    return [false, 'Password too short'];
  }
  if (pass !== confPass) {
    return [false, "Password ans confirm password aren't same"];
  }

  regData.fbLink = 'dsada';
  regData.codeforcesHandle = 'dsdsd';

  Object.values(regData).forEach((v) => {
    if (v === '') {
      return [false, 'Some fields are still missing'];
    }
  });

  return [true, 'Data Verified!'];
};

export default verifyData;

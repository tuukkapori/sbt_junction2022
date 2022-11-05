import { getUserByWalletId } from '../firebase';

export interface ProfileInfo {
  walletId: string;
  name: string;
  bio: string;
  profilePicture: string;
}

const getProfileFromBlockchain = async (walletId: string) => {
  return {
    education: [
      {
        type: 'education',
        school: 'Aalto University',
        degree: 'Bachelor of Computer Science',
        startDate: '2017-09-01',
        endDate: '2022-06-01',
      },
      {
        type: 'education',
        school: 'LUT University',
        degree: 'Bachelor of Mathematics',
        startDate: '2013-09-01',
        endDate: '2018-06-01',
      },
    ],
    workHistory: [
      {
        type: 'work',
        companyName: 'Binance',
        position: 'Software Engineer',
        startDate: '2020-01-01',
        endDate: '2022-03-15',
      },
      {
        type: 'work',
        companyName: 'Junction',
        position: 'Junio Software Developer',
        startDate: '2016-06-01',
        endDate: '2019-12-31',
      },
    ],
  };
};

const getProfileFromFirebase = async (walletId: string) => {
  const user: any = await getUserByWalletId(walletId);

  const profileInfo: ProfileInfo = { walletId, ...user };

  return profileInfo;
};

export { getProfileFromBlockchain, getProfileFromFirebase };

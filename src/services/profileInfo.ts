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
        school: 'Aalto University',
        degree: 'Bachelor of Computer Science',
        startDate: '2022-09-01',
        endDate: '2025-06-01',
      },
      {
        school: 'LUT University',
        degree: 'Bachelor of Mathematics',
        startDate: '2018-09-01',
        endDate: '2021-06-01',
      },
    ],
    workHistory: [
      { companyName: 'Binance', startDate: '2016-06-01' },
      { companyName: 'Junction', startDate: '2016-06-01' },
    ],
  };
};

const getProfileFromFirebase = async (walletId: string) => {
  const user: any = await getUserByWalletId(walletId);

  const profileInfo: ProfileInfo = { walletId, ...user };

  return profileInfo;
};

export { getProfileFromBlockchain, getProfileFromFirebase };

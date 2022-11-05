export interface ProfileInfo {
  walletId: string;
  name: string;
  bio: string;
}

const getProfileFromBlockchain = async (walletId: string) => {
  return {
    education: [
      {
        school: 'Aalto University',
        degree: 'Bachelor of Computer Science',
        startDate: '2017-09-01',
        endDate: '2022-06-01',
      },
      {
        school: 'LUT University',
        degree: 'Bachelor of Mathematics',
        startDate: '2013-09-01',
        endDate: '2018-06-01',
      },
    ],
    workHistory: [
      {
        companyName: 'Binance',
        position: 'Software Engineer',
        startDate: '2020-01-01',
        endDate: '2022-03-15',
      },
      {
        companyName: 'Junction',
        position: 'Junio Software Developer',
        startDate: '2016-06-01',
        endDate: '2019-12-31',
      },
    ],
  };
};

const getProfileFromFirebase = async (
  walletId: string
): Promise<ProfileInfo> => {
  return {
    walletId,
    name: 'Teemu Teekkari',
    bio: 'senior web3 developer',
  };
};

export { getProfileFromBlockchain, getProfileFromFirebase };

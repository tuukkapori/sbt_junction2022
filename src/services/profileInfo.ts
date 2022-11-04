export interface ProfileInfo {
  walletId: string;
  name: string;
  bio: string;
}

const getProfileFromBlockchain = async (walletId: string) => {
  return {
    education: [
      { school: 'Aalto University', startDate: '2022-09-01' },
      { school: 'LUT University', startDate: '2022-10-01' },
    ],
    workHistory: [
      { companyName: 'Binance', startDate: '2016-06-01' },
      { companyName: 'Junction', startDate: '2016-06-01' },
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

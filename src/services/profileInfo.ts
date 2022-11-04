const getProfileInfo = async () => {
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

export { getProfileInfo };

const getProfileInfo = async () => {
  return {
    education: [{ school: 'Aalto University', startDate: '2022-09-01' }],
    workHistory: [{ companyName: 'Nitor', startDate: '2016-06-01' }],
  };
};

export { getProfileInfo };

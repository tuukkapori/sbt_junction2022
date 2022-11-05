const getCurrentWalletFromLocalStorage = () => {
  const wallet = window.localStorage.getItem('currentWallet');
  return wallet;
};

const setCurrentWalletLocalStorage = (walletAddress: string) => {
  window.localStorage.setItem('currentWallet', walletAddress);
};

const deleteCurrentWalletLocalStorage = () => {
  window.localStorage.removeItem('currentWallet');
};

export {
  getCurrentWalletFromLocalStorage,
  setCurrentWalletLocalStorage,
  deleteCurrentWalletLocalStorage,
};

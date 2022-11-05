import React, { useEffect } from 'react';
import getBalance from './helpers/getBalance';
import requestAccounts from './helpers/requestAccounts';

/* interface Values {
  user: any
  setUser: (values: any) => void
  contract: any
  setContract: (values: any) => void
} */

const initialValues: any = {
  contract: {},
  setContract: () => {},
  user: {
    address: '',
    isConnected: false,
    balance: 0,
  },
  setUser: () => {},
};

const MetamaskContext = React.createContext<any>(initialValues);

const MetamaskProvider = ({ children }: any) => {
  const [contract, setContract] = React.useState<any>();
  const [user, setUser] = React.useState<User>({
    address: window.ethereum?.selectedAddress,
    isConnected: false,
    balance: 0,
  });
  const getUserInfo = async () => {
    if (window.ethereum) {
      const userInfo = await requestAccounts();
      setUser({
        ...user,
        ...userInfo,
      });
    }
  };
  const values: any = { user, setUser, contract, setContract };

  // if (window.ethereum)
  //   window.ethereum.on('accountsChanged', async (accounts: any) => {
  //     getUserInfo();
  //   });

  useEffect(() => {
    getUserInfo();
    const timer = window.setInterval(() => {
      if (!user.isConnected) {
        getUserInfo();
      }
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MetamaskContext.Provider value={values}>
      {children}
    </MetamaskContext.Provider>
  );
};

export { MetamaskProvider, MetamaskContext };

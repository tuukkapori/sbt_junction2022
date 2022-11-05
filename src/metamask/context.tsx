import React, { useEffect } from 'react';
import requestAccounts from './helpers/requestAccounts';

/* interface Values {
  user: any
  setUser: (values: any) => void
  contract: any
  setContract: (values: any) => void
} */
const initialValues = {
  contract: {},
  setContract: () => {},
  user: {
    address: '',
    isConnected: false,
    balance: 0,
  },
  setUser: () => {},
  chainId: '',
};

const MetamaskContext = React.createContext<any>(initialValues);

const MetamaskProvider = ({ children }: any) => {
  const [contract, setContract] = React.useState<any>();
  const [user, setUser] = React.useState<User>({
    address: window.ethereum?.selectedAddress,
    isConnected: false,
    balance: 0,
  });
  const [chainId, setChainId] = React.useState<string>('');
  const getUserInfo = async () => {
    if (window.ethereum) {
      const userInfo = await requestAccounts();
      setUser({
        ...user,
        ...userInfo,
      });
      setChainId(window.ethereum.chainId);
    }
  };
  const values: any = { user, setUser, contract, setContract,chainId,setChainId };

  // if (window.ethereum)
  //   window.ethereum.on('accountsChanged', async (accounts: any) => {
  //     getUserInfo();
  //   });

  useEffect(() => {
    getUserInfo()
  }, []);
  return (
    <MetamaskContext.Provider value={values}>
      {children}
    </MetamaskContext.Provider>
  );
};

export { MetamaskProvider, MetamaskContext };

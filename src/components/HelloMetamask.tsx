import { useEffect } from 'react';
import { useMetamask, ConnectMetamask, loadSmartContract } from '../metamask';
import dapp from '../metamask/dapp';

export default function HelloMetamask() {
  const { user, setContract } = useMetamask();
  const setSmartContract = () => {
    setContract(loadSmartContract(dapp.address, dapp.abi));
  };

  useEffect(() => {
    setSmartContract();
  }, []);

  return (
    <div >
      <div>
        {!user.isConnected ? (
          <ConnectMetamask />
        ) : (
          <>
            <div >
              Wallet connected
            </div>
            <div >
              {user.address}
            </div>
            <div >
              Balance: {user.balance.toString().slice(0, 10)} ETH
            </div>
          </>
        )}
      </div>
    </div>
  );
}

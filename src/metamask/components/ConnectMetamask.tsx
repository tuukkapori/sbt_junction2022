import requestAccounts from '../helpers/requestAccounts';

const ConnectMetamask = () => {
  return (
    <div>
      <div>Your Metamask is not connected to this website</div>
      <div
        onClick={() => {
          if (window.ethereum) {
            requestAccounts();
          }
        }}
      >
        Connect Metamask
      </div>
    </div>
  );
};

export default ConnectMetamask;

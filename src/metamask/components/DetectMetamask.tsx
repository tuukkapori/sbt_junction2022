import { ConnectMetamask } from '../';

export default function DetectMetamask() {
  if (!window.ethereum) {
    return <span>Metamask is not installed in this browser</span>;
  } else {
    return <ConnectMetamask />;
  }
}

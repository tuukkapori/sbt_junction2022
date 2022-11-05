import { ethers } from 'ethers';

function loadSmartContract<T>(address: string, abi: Record<string, any>[]) {
  if (!window.ethereum) return null;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, abi, provider.getSigner());

  const contractAsAny: any = contract;
  const contractAsT: T = contractAsAny;

  return contractAsT;
}

export default loadSmartContract;

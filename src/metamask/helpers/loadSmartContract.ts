import { ethers } from 'ethers';
import {  SoulBoundCertificate } from '../../types/ethers-contracts';
import contractInfo from '../../contracts/SoulBoundToken.json'
function loadSmartContract(address: string) {
  if (!window.ethereum) return null;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract: any = new ethers.Contract(address, contractInfo.abi, provider.getSigner())
  const contractAny: SoulBoundCertificate = contract
  return contractAny;
}

export default loadSmartContract;

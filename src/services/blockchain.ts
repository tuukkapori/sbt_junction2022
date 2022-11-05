import { getUserByWalletId } from './firebase';
import soulBoundTokenContract from '../contracts/SoulBoundToken.json';
import loadSmartContract from '../metamask/helpers/loadSmartContract';
import { SoulBoundToken } from '../contracts/SoulBoundToken';
export interface ProfileInfo {
  walletId: string;
  name: string;
  bio: string;
  profilePicture: string;
}

// let contract: SoulBoundToken;

// const initialize = async () => {
//   const address = '0x994B4A6dBE760F8Fae32A5D649087653505b2A39';
//   const provider = ethers.providers.getDefaultProvider('ropsten');
//   const contractFactory = await ethers.getContractFactory('SoulBoundToken');
//   contract = (await contractFactory.deploy()) as unknown as SoulBoundToken;
// };

const contract = loadSmartContract<SoulBoundToken>(
  soulBoundTokenContract.address,
  soulBoundTokenContract.abi
);

const getSymbol = async () => {
  return contract.symbol();
};

const getProfileFromBlockchain = async (walletId: string) => {
  return {
    education: [
      {
        type: 'education',
        school: 'Aalto University',
        degree: 'Bachelor of Computer Science',
        startDate: '2017-09-01',
        endDate: '2022-06-01',
      },
      {
        type: 'education',
        school: 'LUT University',
        degree: 'Bachelor of Mathematics',
        startDate: '2013-09-01',
        endDate: '2018-06-01',
      },
    ],
    workHistory: [
      {
        type: 'work',
        companyName: 'Binance',
        position: 'Software Engineer',
        startDate: '2020-01-01',
        endDate: '2022-03-15',
      },
      {
        type: 'work',
        companyName: 'Junction',
        position: 'Junior Software Developer',
        startDate: '2016-06-01',
        endDate: '2019-12-31',
      },
    ],
  };
};

const getCertificates = async (walletId: string) => {
  console.log('getting certificates');
  const uris = await contract.getURIsFromAddress(walletId);
  return uris;
};

const createCertificate = async (walletId: string, uri: string) => {
  console.log('creating certificate');
  console.log({ walletId, uri });
  await contract.safeMint(walletId, uri);
};

export {
  getProfileFromBlockchain,
  getSymbol,
  getCertificates,
  createCertificate,
};

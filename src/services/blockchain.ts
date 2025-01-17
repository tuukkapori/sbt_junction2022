import soulBoundTokenContract from '../contracts/SoulBoundToken.json';
import loadSmartContract from '../metamask/helpers/loadSmartContract';
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

const contract = loadSmartContract(soulBoundTokenContract.address);

const getSymbol = async () => {
  return contract.symbol();
};

export interface Certificate {
  type: 'education' | 'work';
  issuerAddress: string;
  issuerName: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  transactionHash: string;
  tokenId?: string;
}

const getProfileFromBlockchain = async (
  walletId: string
): Promise<Certificate[]> => {
  return [
    {
      type: 'education',
      issuerAddress: 'none',
      issuerName: 'Aalto University',
      title: 'Bachelor of Computer Science',
      description: 'blaahblaah',
      startDate: '2017-09-01',
      endDate: '2022-06-01',
      transactionHash: 'none',
    },
    {
      type: 'education',
      issuerAddress: 'none',
      issuerName: 'LUT University',
      title: 'Bachelor of Mathematics',
      description: 'blaahblaah',
      startDate: '2013-09-01',
      endDate: '2018-06-01',
      transactionHash: 'none',
    },
    {
      type: 'work',
      issuerAddress: 'none',
      issuerName: 'Binance',
      title: 'Software Engineer',
      description:
        'sadfasdfasdfasdf dsadfa asdfggas da fas fasdfasdf asdfasdggsadfasd fasdf asf wa dsfasdadsf',
      startDate: '2020-01-01',
      endDate: '2022-03-15',
      transactionHash: 'none',
    },
    {
      type: 'work',
      issuerAddress: 'none',
      issuerName: 'Junction',
      title: 'Junior Software Developer',
      description: 'blaahblaah',
      startDate: '2016-06-01',
      endDate: '2019-12-31',
      transactionHash: 'none',
    },
  ];
};

const getCertificateURIs = async (walletId: string) => {
  console.log('getting certificates', { walletId });
  try {
    const uris = await contract.getURIsFromAddress(walletId);
    return uris;
  } catch (err) {
    console.log(err);
  }
};

const createCertificate = async (walletId: string, uri: string) => {
  try {
    console.log('creating certificate');
    console.log({ walletId, uri });
    const res = await contract.safeMint(walletId, uri);
    console.log('res from create cert ', res);
    return res.hash;
  } catch (err) {
    console.log(err);
  }
};

const revokeCertificate = async (id: string) => {
  try {
    const res = await contract.revokeCertificate(id);
  } catch (err) {
    console.log(err);
  }
};

const getIssuedCertificateURIs = async (walletId: string) => {
  try {
    console.log('getting issued certificates');
    const IDs = await contract.getTokensIssuedByAddress(walletId);
    return Promise.all(
      IDs.map(async id => ({ uri: await contract.tokenURI(id), id }))
    );
  } catch (err) {
    console.log(err);
  }
};

export {
  getProfileFromBlockchain,
  getSymbol,
  getCertificateURIs,
  createCertificate,
  getIssuedCertificateURIs,
  revokeCertificate,
};

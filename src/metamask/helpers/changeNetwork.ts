const networks: Record<string, any> = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: 'Sepolia Test Network',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'SepoliaETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.sepolia.dev'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  },
  bnbTestnet: {
    chainId: 97,
    chainName: 'Binance Testnet',
    nativeCurrency: {
      name: 'binance token',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-2-s2.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
};

export default async function changeNetwork(networkName: string) {
  if (!networkName) networkName = 'sepolia';

  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        ...networks[networkName],
      },
    ],
  });
}

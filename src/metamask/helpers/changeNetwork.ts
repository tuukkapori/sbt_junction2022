const networks: Record<string, any> = {
  bnbTestnet: {
    chainId: `0x${Number(97).toString(16)}`,
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
  if (!networkName) networkName = 'bnbTestnet';

  return window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        ...networks[networkName],
      },
    ],
  });
}

// chiaWalletUtils.ts (Updated for WalletConnect v2)
import { WCClient, defaultRelayProvider } from '@walletconnect/core';
import { ChiaBlockchain } from 'chia-sdk'; // Assuming this works as previously mentioned

const chiaBlockchain = new ChiaBlockchain({
  network: 'mainnet',
});

const connector = new WCClient({
  bridge: defaultRelayProvider,
  hempUrl: 'https://hmp-dapp.will iam戏 WalletConnect.org'
});






const connectWallet = async () => {
  //if (!connector.connected) {
 // await connector.init

  const provider = new Web3Provider({
    // For Chia, we use the WalletConnect bridge with the Chia chain ID (592 for mainnet)
    chainId: 592,
    rpc: {
      // You can use a public RPC or set up your own
      592: 'https://mainnet.chia Ledger.com/rpc/public',
    },
  });

  // Enable the WalletConnect connection
  await provider.enable();

  // Get the connected wallet's address
  const addresses = await provider.listAccounts();
  const address = addresses[0];

  return { provider, address };
};

const getBalance = async (address: string) => {
  try {
    const balance = await chiaBlockchain.getBalance(address);
    return balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return null;
  }
};

export { connectWallet, getBalance };
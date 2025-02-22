// walletModal.tsx
import { WagmiConfig, createClient, defaultChains } from '@web3modal/wagmi';
import { alchemyProvider } from '@web3modal/wagmi';
import { greenweb } from 'greenwebjs';
import { BE_URL } from "../utils/constant";

const apiKey = BE_URL; // Replace with your Alchemy API key
const chains = defaultChains;

const provider = alchemyProvider(apiKey, chains);

const wagmiClient = createClient({
  provider,
 autoConnect: true,
});
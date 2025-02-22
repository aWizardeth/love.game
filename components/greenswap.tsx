import React, { useState, useEffect, FC } from 'react';
import * as Goby from './goby';
import { WagmiConfig, useAccount, useConnect } from '@web3modal/wagmi';
import { wagmiClient } from './walletModal';

const Green: FC = () => {
  const { connect: wagmiConnect, isConnected } = useConnect();
  const { address } = useAccount();
  const [gobyAddress, setGobyAddress] = useState<string>('');
  const [isGobyConnected, setIsGobyConnected] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected) {
      connectGobyWallet();
    }
  }, [isConnected]);

  const connectGobyWallet = async () => {
    try {
      const gobyAddr = await Goby.connect();
      setGobyAddress(gobyAddr);
      setIsGobyConnected(true);
    } catch (error) {
      console.error('Error connecting to Goby wallet:', error);
    }
  };

  const handleConnect = () => {
    if (!isConnected) {
      wagmiConnect();
    } else if (!isGobyConnected) {
      connectGobyWallet();
    }
  };

  const handleCreateOffer = async () => {
    if (isGobyConnected) {
      const offerParams = { /* Populate with required offer parameters */ };
      try {
        const offer = await Goby.createOffer(offerParams);
        console.log('Offer created:', offer);
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }
  };

  const handleAddCAT = async () => {
    if (isGobyConnected) {
      const addCATParams = { /* Populate with required CAT parameters (assetId, symbol, logoUrl) */ };
      try {
        await Goby.addCAT(addCATParams);
        console.log('CAT added successfully');
      } catch (error) {
        console.error('Error adding CAT:', error);
      }
    }
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <div>
        {!isConnected ? (
          <button onClick={handleConnect}>Connect Wallet</button>
        ) : (
          <div>
            <p>Connected Wallet Address: {address}</p>
            {isGobyConnected ? (
              <div>
                <p>Goby Address: {gobyAddress}</p>
                <button onClick={handleCreateOffer}>Create Offer</button>
                <button onClick={handleAddCAT}>Add CAT</button>
              </div>
            ) : (
              <button onClick={handleConnect}>Connect to Goby Wallet</button>
            )}
          </div>
        )}
      </div>
    </WagmiConfig>
  );
};

export default Green;
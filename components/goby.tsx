import * as GreenWeb from 'greenwebjs';
import { CHIA_NETWORK } from '../../config';
import { addCATParams, createOfferParams } from './types';

/**
 * Connect to the Chia wallet.
 * @returns {Promise<string>} The wallet address associated with the connected account.
 */
export async function connect(): Promise<string> {
  try {
    await window.chia.request({ method: "connect" });
    const puzzleHash: string = window.chia.selectedAddress;
    const address: string = GreenWeb.util.address.puzzleHashToAddress(
      puzzleHash,
      CHIA_NETWORK.prefix
    );
    return address;
  } catch (error) {
    console.error('Error connecting to Chia wallet:', error);
    throw new Error('Failed to connect to wallet.');
  }
}

/**
 * Disconnect from the wallet. (No-op for Goby wallet)
 * Currently, there's no method to disconnect from the Goby wallet, so it resolves immediately.
 * @returns {Promise<void>}
 */
export async function disconnect(): Promise<void> {
  // Currently not possible to disconnect from Goby wallet
  return Promise.resolve();
}

/**
 * Create an offer using the specified parameters.
 * @param {createOfferParams} params - Parameters for creating the offer.
 * @returns {Promise<string>} The generated offer string.
 * @throws Will throw an error if the offer could not be created.
 */
export async function createOffer(params: createOfferParams): Promise<string> {
  try {
    const response = await window.chia.request({
      method: 'createOffer',
      params,
    });

    if (response?.offer) {
      return response.offer;
    } else {
      throw new Error('Failed to create offer');
    }
  } catch (error) {
    console.error('Error creating offer:', error);
    throw error;
  }
}

/**
 * Add a CAT (Colored Coin Asset Token) to the watch list in the wallet.
 * @param {addCATParams} params - Parameters including asset ID, symbol, and logo URL.
 * @returns {Promise<void>}
 * @throws Will throw an error if the CAT could not be added.
 */
export async function addCAT(params: addCATParams): Promise<void> {
  const gobyParams = {
    type: 'cat',
    options: {
      assetId: params.assetId,
      symbol: params.symbol,
      logo: params.logoUrl,
    },
  };

  try {
    await window.chia.request({
      method: 'walletWatchAsset',
      params: gobyParams,
    });
  } catch (error) {
    console.error('Error adding CAT:', error);
    throw new Error('Failed to add CAT.');
  }
}
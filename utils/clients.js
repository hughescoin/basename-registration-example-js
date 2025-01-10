import 'dotenv/config';
import { createWalletClient, http, createPublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';

//Create an account from a private key
const privateKey = process.env.PRIVATE_KEY;
export const account = privateKeyToAccount(privateKey);

//Create a wallet client
export const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

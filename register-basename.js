import 'dotenv/config';
import {
  http,
  createWalletClient,
  encodeFunctionData,
  namehash,
  getAddress,
  parseEther,
} from 'viem';
import { normalize } from 'viem/ens';
import { baseSepolia } from 'viem/chains';
import {
  l2ResolverABI,
  registrarABI,
  L2ResolverAddress,
  BaseNamesRegistrarControllerAddress,
} from './utils/basename.js';
import { privateKeyToAccount } from 'viem/accounts';

const baseNameRegex = /\.basetest\.eth$/;

//Create an account from a private key
const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey);
console.log(`Account: ${account.address.toString()}`);

//Create a wallet client
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});

function createRegisterContractMethodArgs(baseName, addressId) {
  const addressData = encodeFunctionData({
    abi: l2ResolverABI,
    functionName: 'setAddr',
    args: [namehash(normalize(baseName)), addressId],
  });
  const nameData = encodeFunctionData({
    abi: l2ResolverABI,
    functionName: 'setName',
    args: [namehash(normalize(baseName)), baseName],
  });

  const registerArgs = {
    request: [
      baseName.replace('.basetest.eth', ''),
      addressId,
      '31557600',
      L2ResolverAddress,
      [addressData, nameData],
      true,
    ],
  };
  console.log(`Register contract method arguments constructed: `, registerArgs);

  return registerArgs;
}

async function registerBasename(baseName, addressId) {
  try {
    const registerArgs = createRegisterContractMethodArgs(baseName, addressId);
    const contractInvocation = await walletClient.writeContract({
      address: BaseNamesRegistrarControllerAddress,
      abi: registrarABI,
      functionName: 'register',
      args: [registerArgs.request],
      value: parseEther('0.01'),
    });
    console.log(
      `Successfully registered Basename ${baseName} for wallet: `,
      account.address.toString()
    );
    console.log(`Transaction hash: ${contractInvocation}`);
  } catch (error) {
    console.error(`Error registering basename: ${error}`);
  }
}

async function main() {
  try {
    console.log(`Registering basename: ${process.env.BASE_NAME}`);
    const baseName = process.env.BASE_NAME;
    const addressId = getAddress(account.address.toString());
    console.log(`Address ID: ${addressId}`);
    await registerBasename(baseName, addressId);
  } catch (error) {
    console.error(`Error registering basename: ${error}`);
  }
}

main();

import 'dotenv/config';
import {
  encodeFunctionData,
  namehash,
  getAddress,
  parseEther,
  formatEther,
} from 'viem';
import { normalize } from 'viem/ens';
import {
  l2ResolverABI,
  registrarABI,
  L2ResolverAddress,
  BaseNamesRegistrarControllerAddress,
} from './utils/basename.js';
import { walletClient, publicClient, account } from './utils/clients.js';

const baseNameRegex = /\.basetest\.eth$/;
const duration = '31557600';

async function getTransactionCosts() {
  const baseName = process.env.BASE_NAME;

  // Get the register price for a basename
  const price = await publicClient.readContract({
    address: BaseNamesRegistrarControllerAddress,
    abi: registrarABI,
    functionName: 'registerPrice',
    args: [namehash(normalize(baseName)), duration],
  });

  // Multiply the price by 10 to get the correct decimal places
  const adjustedPrice = BigInt(price) * BigInt(10);

  // Get the current gas price
  const gasPrice = await publicClient.getGasPrice();

  // Estimate the gas needed for the transaction
  const registerArgs = createRegisterContractMethodArgs(
    baseName,
    account.address
  );
  console.log('Estimating gas ...');
  const gasEstimate = await publicClient.estimateContractGas({
    address: BaseNamesRegistrarControllerAddress,
    abi: registrarABI,
    functionName: 'register',
    args: [registerArgs.request],
    value: parseEther('0.01'), //When estimating gas, we can pass a higher `value` to get a more accurate estimate
    account: account.address,
  });

  const gasCost = gasEstimate * gasPrice;
  const totalCost = gasCost + adjustedPrice;
  console.log(
    `Total cost in ETH to register ${baseName} for ${duration} year(s) is ${formatEther(
      totalCost
    ).toString()}`
  );

  return formatEther(totalCost).toString();
}

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
      duration,
      L2ResolverAddress,
      [addressData, nameData],
      true,
    ],
  };
  return registerArgs;
}

async function registerBasename(baseName, addressId) {
  try {
    const registerArgs = createRegisterContractMethodArgs(baseName, addressId);
    const value = await getTransactionCosts();
    const contractInvocation = await walletClient.writeContract({
      address: BaseNamesRegistrarControllerAddress,
      abi: registrarABI,
      functionName: 'register',
      args: [registerArgs.request],
      value: parseEther(value),
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

import {
  standardPrincipalCV,
  uintCV,
  callReadOnlyFunction,
  cvToValue,
  trueCV,
  falseCV,
} from '@stacks/transactions';
import { StacksMocknet } from '@stacks/network';
import { openContractCall } from '@stacks/connect';
import { userSession } from './auth';

const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const CONTRACT_NAME = 'escrow-contract';
const NETWORK = new StacksMocknet();

const makeContractCall = async (functionName, functionArgs) => {
  const options = {
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: functionName,
    functionArgs: functionArgs,
    onFinish: data => {
      console.log('Transaction ID:', data.txId);
      console.log('Transaction:', data.stacksTransaction);
    },
  };

  await openContractCall(options);
};

export const createEscrow = async (seller, buyer, arbiter, amount) => {
  const amountUint = uintCV(amount * 1000000); // Convert STX to micro-STX
  const functionArgs = [
    standardPrincipalCV(seller),
    standardPrincipalCV(buyer),
    standardPrincipalCV(arbiter),
    amountUint,
  ];
  await makeContractCall('create-escrow', functionArgs);
};

export const getUserEscrows = async () => {
  const address = userSession.loadUserData().profile.stxAddress.testnet;
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-user-escrows',
    functionArgs: [standardPrincipalCV(address)],
    network: NETWORK,
    senderAddress: address,
  };

  const result = await callReadOnlyFunction(options);
  return cvToValue(result).value.map(id => ({ id: id.value }));
};

export const getEscrowDetails = async (id) => {
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-escrow',
    functionArgs: [uintCV(id)],
    network: NETWORK,
    senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
  };

  const result = await callReadOnlyFunction(options);
  const escrowData = cvToValue(result).value;
  return {
    id: id,
    seller: escrowData.seller.value,
    buyer: escrowData.buyer.value,
    arbiter: escrowData.arbiter.value,
    amount: escrowData.amount.value / 1000000, // Convert micro-STX to STX
    fee: escrowData.fee.value / 1000000,
    status: escrowData.status.value,
    createdAt: escrowData.createdAt.value,
    rating: escrowData.rating.value ? escrowData.rating.value : null,
  };
};

export const releaseToSeller = async (id) => {
  await makeContractCall('release-to-seller', [uintCV(id)]);
};

export const refundToBuyer = async (id) => {
  await makeContractCall('refund-to-buyer', [uintCV(id)]);
};

export const dispute = async (id) => {
  await makeContractCall('dispute', [uintCV(id)]);
};

export const resolveDispute = async (id, toSeller) => {
  await makeContractCall('resolve-dispute', [uintCV(id), toSeller ? trueCV() : falseCV()]);
};

export const cancelEscrow = async (id) => {
  await makeContractCall('cancel-escrow', [uintCV(id)]);
};

export const extendTimeout = async (id, extension) => {
  await makeContractCall('extend-timeout', [uintCV(id), uintCV(extension)]);
};

export const rateTransaction = async (id, rating) => {
  await makeContractCall('rate-transaction', [uintCV(id), uintCV(rating)]);
};

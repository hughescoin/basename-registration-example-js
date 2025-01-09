// Base Sepolia Registrar Controller Contract Address.
export const BaseNamesRegistrarControllerAddress =
  '0x49aE3cC2e3AA768B1e5654f5D3C6002144A59581';

// Base Sepolia L2 Resolver Contract Address.
export const L2ResolverAddress = '0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA';

// Base Mainnet Registrar Controller Contract Address.
//export const BaseNamesRegistrarControllerAddress = "0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5";

// Base Mainnet L2 Resolver Contract Address.
// export const L2ResolverAddress = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

// The regular expression to validate a Basename on Base Sepolia.

export const l2ResolverABI = [
  {
    inputs: [
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'address', name: 'a', type: 'address' },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'string', name: 'newName', type: 'string' },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// Relevant ABI for Basenames Registrar Controller Contract.
export const registrarABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'resolver',
            type: 'address',
          },
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
          {
            internalType: 'bool',
            name: 'reverseRecord',
            type: 'bool',
          },
        ],
        internalType: 'struct RegistrarController.RegisterRequest',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

const address = "0xc6d0270f936af9a47a5129b1fc5360965ca177cb";

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "description",
        type: "string",
      },
      {
        name: "category",
        type: "string",
      },
      {
        name: "durationInDays",
        type: "uint256",
      },
      {
        name: "amountToRaise",
        type: "uint256",
      },
    ],
    name: "startProject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        name: "projectStarter",
        type: "address",
      },
      {
        indexed: false,
        name: "projectTitle",
        type: "string",
      },
      {
        indexed: false,
        name: "projectDesc",
        type: "string",
      },
      {
        indexed: false,
        name: "projectCategory",
        type: "string",
      },
      {
        indexed: false,
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        name: "goalAmount",
        type: "uint256",
      },
    ],
    name: "ProjectStarted",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "returnAllProjects",
    outputs: [
      {
        name: "",
        type: "address[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export { address, abi };

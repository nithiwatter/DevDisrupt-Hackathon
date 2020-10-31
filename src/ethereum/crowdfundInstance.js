const address = "0x81A1f44b97FfBb1101F49a346420bE8D7C2cB4f2";

const abi = [
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
];

export { address, abi };

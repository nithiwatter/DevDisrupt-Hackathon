import Web3 from "web3";

let web3 = null;

const ethEnabled = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    return web3;
  } else {
    return web3;
  }
};

export default ethEnabled;

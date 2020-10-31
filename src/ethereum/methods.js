// import { abi } from "../ethereum/projectInstance";
import { openSnackbarExternal } from "../components/notifier/Notifier";

let crowdfundInstance = null;

const getAccount = () => {
  return new Promise(async (resolve) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      resolve(accounts[0]);
    } catch (e) {
      resolve(null);
    }
  });
};

const initialize = (instance) => {
  crowdfundInstance = instance;
};

const getProjects = () => {
  crowdfundInstance.methods
    .returnAllProjects()
    .call()
    .then((projects) => {
      console.log(projects);
    });
};

const createProject = (projectData, account) => {
  const {
    projectTitle,
    projectDescription,
    projectGoal,
    projectDuration,
  } = projectData;
  crowdfundInstance.methods
    .startProject(
      projectTitle,
      projectDescription,
      projectDuration,
      projectGoal
    )
    .send({
      from: account,
    })
    .then(() => console.log("success"))
    .catch((e) =>
      openSnackbarExternal({
        message: "Please authorize the transaction!",
        severity: "error",
      })
    );
};

const methods = { getAccount, initialize, getProjects, createProject };

export default methods;

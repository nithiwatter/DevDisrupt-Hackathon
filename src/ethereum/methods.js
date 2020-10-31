import firebaseUtils from "../firebase/firebaseUtils";
import { createIndividualProject } from "../ethereum/projectInstance";
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
      projects.forEach((projectAddress) => {
        const projectInstance = createIndividualProject(projectAddress);
        projectInstance.methods
          .getDetails()
          .call()
          .then((projectData) => {
            // const {
            //   currentAmount,
            //   currentState,
            //   deadline,
            //   goalAmount,
            //   projectCategory,
            //   projectDesc,
            //   projectStarter,
            //   projectTitle,
            // } = projectData;
            console.log(projectData);
          });
      });
    });
};

const createProject = (projectData, account, projectEndDate) => {
  return new Promise((resolve) => {
    const {
      projectTitle,
      projectDescription,
      projectCategory,
      projectGoal,
      projectDuration,
    } = projectData;

    crowdfundInstance.methods
      .startProject(
        projectTitle,
        projectDescription,
        projectCategory,
        projectDuration,
        projectGoal
      )
      .send({
        from: account,
        // gasPrice: "100000000000",
        //   gas: 40000,
      })
      .then(async (res) => {
        console.log("success");
        const projectInfo = res.events.ProjectStarted.returnValues;
        const { contractAddress } = projectInfo;
        const projectData2 = {
          projectAddress: contractAddress,
          projectTitle,
          projectDescription,
          projectCategory,
          projectEndDate,
          projectGoal,
        };
        const project = await firebaseUtils.addProjectToFirestore(projectData2);
        resolve(project);
      })
      .catch((_) => {
        openSnackbarExternal({
          message: "Please authorize the transaction!",
          severity: "error",
        });
        resolve(null);
      });
  });
};

const methods = { getAccount, initialize, getProjects, createProject };

export default methods;

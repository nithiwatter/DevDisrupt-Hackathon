import { firebase } from "./config";

const usersRef = firebase.firestore().collection("users");
const projectsRef = firebase.firestore().collection("projects");

const getUserFromFirestore = (uid) => {
  return new Promise((resolve) => {
    usersRef
      .doc(uid)
      .get()
      .then((document) => {
        if (!document.exists) {
          resolve(null);
        }

        const user = document.data();
        resolve(user);
      });
  });
};

const addUserToFirestore = (userData) => {
  const { uid, displayName, email, phoneNumber, photoURL } = userData;

  return new Promise((resolve) => {
    const user = {
      id: uid,
      email: email || "",
      displayName: displayName || "",
      phone: phoneNumber || "",
      profilePictureURL: photoURL || "",
      userID: uid,
    };

    // save this user to the firestore collection
    usersRef
      .doc(uid)
      .set(user)
      .then(() => {
        resolve(user);
      });
  });
};

const addProjectToFirestore = (projectData) => {
  return new Promise(async (resolve) => {
    const { projectAddress, ...rest } = projectData;
    console.log(projectAddress);
    await projectsRef.doc(projectAddress).set({ ...rest });
    projectsRef
      .doc(projectAddress)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          resolve(null);
        }
      });
  });
};

const firebaseUtils = {
  addUserToFirestore,
  getUserFromFirestore,
  addProjectToFirestore,
};

export default firebaseUtils;

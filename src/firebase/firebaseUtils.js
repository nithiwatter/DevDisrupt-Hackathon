import { firebase } from "./config";

const usersRef = firebase.firestore().collection("users");

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

const firebaseUtils = {
  addUserToFirestore,
  getUserFromFirestore,
};

export default firebaseUtils;

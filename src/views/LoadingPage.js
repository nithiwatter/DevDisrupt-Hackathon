import React, { Component } from "react";
import { CircularProgress, withStyles } from "@material-ui/core";

import { firebase } from "../firebase/config";
import firebaseUtils from "../firebase/firebaseUtils";

const styles = () => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class LoadingPage extends Component {
  componentDidMount() {
    const { setUser, setIsReady } = this.props;
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (response) => {
        if (response) {
          const { uid } = response;
          // access our firestore to get additional information regarding this user
          const user = await firebaseUtils.getUserFromFirestore(uid);
          setUser(user);
        }
        setIsReady(true);
      });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <CircularProgress color="primary" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingPage);

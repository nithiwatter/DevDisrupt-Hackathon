import React, { Component } from "react";
import { CircularProgress, withStyles } from "@material-ui/core";

import { firebase } from "../firebase/config";
import firebaseUtils from "../firebase/firebaseUtils";
import ethEnabled from "../ethereum/web3";
import { abi, address } from "../ethereum/crowdfundInstance";
import methods from "../ethereum/methods";

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
    const { setUser, setIsReady, setAccount } = this.props;
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (response) => {
        if (response) {
          const { uid } = response;
          // access our firestore to get additional information regarding this user
          const user = await firebaseUtils.getUserFromFirestore(uid);
          setUser(user);
        }
        // initialize all web3 config while loading
        const web3 = ethEnabled();
        if (!web3) {
          // need to handle this better
          setIsReady(true);
          return alert("Please install the Metamask Chrome Extension!");
        }
        const instance = new web3.eth.Contract(abi, address);
        methods.initialize(instance);
        const account = await methods.getAccount();

        setIsReady(true);
        setAccount(account);
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

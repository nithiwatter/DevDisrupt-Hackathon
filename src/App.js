import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import AuthContext from "./auth/context";
import theme from "./theme";
import Routes from "./Routes";
import LoadingPage from "./views/LoadingPage";

function App() {
  const [user, setUser] = React.useState(null);
  const [isReady, setIsReady] = React.useState(false);

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {isReady ? (
              <Router>
                <Routes />
              </Router>
            ) : (
              <LoadingPage setUser={setUser} setIsReady={setIsReady} />
            )}
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

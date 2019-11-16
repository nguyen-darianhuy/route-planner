import React from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import TitleScreen from "./TitleScreen";
import {StylesProvider} from "@material-ui/styles";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {color} from "./constants";
import Div100vh from "react-div-100vh";
import "typeface-rubik";

const theme = createMuiTheme({
   typography: {
      fontFamily: "Rubik",
   },
   palette: {
      primary: {
         main: color.green,
         light: color.green1,
      },
      secondary: {
         main: color.red,
      },
   },
});

function App() {
   return (
      <ThemeProvider theme={theme}>
         <StylesProvider injectFirst>
            <Div100vh>
               <TitleScreen />
            </Div100vh>
         </StylesProvider>
      </ThemeProvider>
   );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;

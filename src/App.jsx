import React from "react";

import { ThemeProvider } from "@emotion/react";
import useImage from "use-image";

import ImageEditor from "./containers/ImageEditor";
// // import Resize from "./containers/Resize";
import theme from "./styles/theme";
import { GlobalStyles } from "./styles/styles";

// import userImage from "./images/bmw.png";
import userImage from "./images/UI-Lovecraft.jpg";
// import userImage from "./images/UI-Goethe.jpg";
// const userImage = 'https://konvajs.github.io/assets/yoda.jpg';

const App = () => {
  const [image] = useImage(userImage, "Anonymous");
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ImageEditor image={image} />
      {/* <Resize file={image} /> */}
    </ThemeProvider>
  );
};

export default App;

import React from "react";

import { ThemeProvider } from "@emotion/react";
import useImage from "use-image";

import ImageEditor from "./containers/ImageEditor";
import ImageResize from "./containers/ImageResize";
import theme from "./styles/theme";
import { GlobalStyles } from "./styles/styles";

// import userImage from "./images/bmw.png";
// import userImage from "./images/UI-Lovecraft.jpg";
import userImage from "./images/UI-Goethe.jpg";

const App = () => {
  const [image] = useImage(userImage, "Anonymous");
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ImageEditor image={image} />
      <ImageResize file={image} />
    </ThemeProvider>
  );
};

export default App;

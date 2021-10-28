/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";

import MediaQuery, {
  useMediaQuery,
  Context as ResponsiveContext
} from "react-responsive";

// --------------------------------------- //
// ------------- breakpoints ------------- //
// --------------------------------------- //
// using Material UI default breakpoints: https://material-ui.com/customization/default-theme/
export const MOBILE_BREAKPOINT = 600;
export const TABLET_BREAKPOINT = 960;
export const DESKTOP_BREAKPOINT = 1280;
export const LARGE_DESKTOP_BREAKPOINT = 1920;

// --------------------------------------- //
// ------------ media queries ------------ //
// --------------------------------------- //
export const mobile = `@media (max-width: ${MOBILE_BREAKPOINT}px)`;
export const mobileTablet = `@media (max-width: ${TABLET_BREAKPOINT}px)`;
export const tablet = `@media (min-width: ${TABLET_BREAKPOINT + 1}px)`;
export const tabletDesktop = `@media (min-width: ${
  TABLET_BREAKPOINT + 1
}px) and (max-width: ${DESKTOP_BREAKPOINT}px)`;
export const desktop = `@media (min-width: ${DESKTOP_BREAKPOINT + 1}px)`;
export const largeDesktop = `@media (min-width: ${
  LARGE_DESKTOP_BREAKPOINT + 1
}px)`;

// --------------------------------------- //
// -------- responsive components -------- //
// --------------------------------------- //
export const Mobile = (props) => {
  const { width } = useContext(ResponsiveContext);
  return (
    <MediaQuery {...props} maxWidth={MOBILE_BREAKPOINT} deviceWidth={width} />
  );
};

export const MobileTablet = (props) => {
  const { width } = useContext(ResponsiveContext);
  return (
    <MediaQuery {...props} maxWidth={TABLET_BREAKPOINT} deviceWidth={width} />
  );
};

export const Tablet = (props) => {
  const { width } = useContext(ResponsiveContext);
  return (
    <MediaQuery
      {...props}
      minWidth={TABLET_BREAKPOINT + 1}
      deviceWidth={width}
    />
  );
};

export const TabletDesktop = (props) => {
  const { width } = useContext(ResponsiveContext);
  return (
    <MediaQuery
      {...props}
      minWidth={TABLET_BREAKPOINT + 1}
      maxWidth={DESKTOP_BREAKPOINT}
      deviceWidth={width}
    />
  );
};

export const Desktop = (props) => {
  const { width } = useContext(ResponsiveContext);
  return (
    <MediaQuery
      {...props}
      minWidth={DESKTOP_BREAKPOINT + 1}
      deviceWidth={width}
    />
  );
};

export const LargeDesktop = (props) => {
  const { width } = useContext(ResponsiveContext);
  return (
    <MediaQuery
      {...props}
      minWidth={LARGE_DESKTOP_BREAKPOINT + 1}
      deviceWidth={width}
    />
  );
};

// --------------------------------------- //
// ---------- responsive hooks ----------- //
// --------------------------------------- //
export const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);
  const { width } = useContext(ResponsiveContext);

  const isMobile = useMediaQuery({
    maxWidth: MOBILE_BREAKPOINT,
    deviceWidth: width
  });

  const isMobileTablet = useMediaQuery({
    maxWidth: TABLET_BREAKPOINT,
    deviceWidth: width
  });

  const isTablet = useMediaQuery({
    minWidth: MOBILE_BREAKPOINT + 1,
    deviceWidth: width
  });

  const isTabletDesktop = useMediaQuery({
    minWidth: TABLET_BREAKPOINT + 1,
    maxWidth: DESKTOP_BREAKPOINT,
    deviceWidth: width
  });

  const isDesktop = useMediaQuery({
    minWidth: DESKTOP_BREAKPOINT + 1,
    deviceWidth: width
  });

  const isLargeDesktop = useMediaQuery({
    minWidth: LARGE_DESKTOP_BREAKPOINT + 1,
    deviceWidth: width
  });

  useEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);

  // add default value in server side
  // see: https://github.com/contra/react-responsive/issues/162
  return {
    isMobile: isClient ? isMobile : false,
    isMobileTablet: isClient ? isMobileTablet : false,
    isTablet: isClient ? isTablet : false,
    isTabletDesktop: isClient ? isTabletDesktop : false,
    isDesktop: isClient ? isDesktop : true,
    isLargeDesktop: isClient ? isLargeDesktop : false
  };
};

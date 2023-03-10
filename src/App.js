/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

import { ProtectedRoute } from "components/ProtectedRoute";
import EditBooking from "layouts/Bookings/editBooking";
import EditBookingConfirm from "layouts/BookingConfirm/editBookingConfirm";
import EditBookingCancel from "layouts/BookingCancel/editBookingCancel";
import EditTestimonials from "layouts/manageTestimonials/editTestimonials";
import EditManageContact from "layouts/manageContact/editManageContact";
import EditFeedback from "layouts/feedback/editFeedback";
import EditUser from "layouts/users/editUser";
import EditSubscribers from "layouts/manageSubscribers/editSubscribers";

// RTL plugins

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import EditFaq from "layouts/faq/editFaq";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      // stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="B2B Cabs"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route
            path="/bookings/:id/"
            element={<ProtectedRoute props={<EditBooking />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/confirm-bookings/:id/"
            element={<ProtectedRoute props={<EditBookingConfirm />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/cancel-bookings/:id/"
            element={<ProtectedRoute props={<EditBookingCancel />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/manage-testimonials/:id/"
            element={<ProtectedRoute props={<EditTestimonials />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/manage-contactus-query/:id/"
            element={<ProtectedRoute props={<EditManageContact />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/registered-users/:id/"
            element={<ProtectedRoute props={<EditUser />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/manage-subscribers/:id/"
            element={<ProtectedRoute props={<EditSubscribers />}></ProtectedRoute>}
          ></Route>
          <Route
            path="/feedback/:id/"
            element={<ProtectedRoute props={<EditFeedback />}></ProtectedRoute>}
          ></Route>
          <Route
          path="/faq/:id/"
          element={<ProtectedRoute props={<EditFaq />}></ProtectedRoute>}
        ></Route>
          {/* <Route
          path="/faq/add"
          element={<ProtectedRoute props={<EditFaq />}></ProtectedRoute>}
        ></Route> */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="B2B Cabs"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/* {configsButton} */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route
          path="/bookings/:id/"
          element={<ProtectedRoute props={<EditBooking />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/confirm-bookings/:id/"
          element={<ProtectedRoute props={<EditBookingConfirm />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/cancel-bookings/:id/"
          element={<ProtectedRoute props={<EditBookingCancel />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/manage-testimonials/:id/"
          element={<ProtectedRoute props={<EditTestimonials />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/manage-contactus-query/:id/"
          element={<ProtectedRoute props={<EditManageContact />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/registered-users/:id/"
          element={<ProtectedRoute props={<EditUser />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/manage-subscribers/:id/"
          element={<ProtectedRoute props={<EditSubscribers />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/feedback/:id/"
          element={<ProtectedRoute props={<EditFeedback />}></ProtectedRoute>}
        ></Route>
        <Route
          path="/faq/:id/"
          element={<ProtectedRoute props={<EditFaq />}></ProtectedRoute>}
        ></Route>
        {/* <Route
          path="/faq/add"
          element={<ProtectedRoute props={<EditFaq />}></ProtectedRoute>}
        ></Route> */}
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}

{
  /* <Route exact path="/booking/:id" element={<ProtectedRoute props={<EditBooking/>}></ProtectedRoute>}></Route> */
}

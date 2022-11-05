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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useLocation, NavLink } from "react-router-dom";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import  { useNavigate   } from 'react-router-dom'
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import myApi from "../../../axios";

function Basic() {
  let navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [errorMsg,setErrorMsg] = useState()

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const onSubmit = async() => {
    const reponse = await myApi.post('/api/v1/accounts/login-verify/',{email:email,password:password})
    console.log(reponse.data.valid,'NS')
    if(reponse?.data.valid != false){
      if(reponse?.data.is_admin == true){
        localStorage.setItem('user',JSON.stringify(reponse?.data))
        setErrorMsg("")
        return navigate('/dashboard')
      }
      else{
        setErrorMsg("User has no permission to login")
      }
    }
    else{
      setErrorMsg(reponse?.data.response)
    }
  }
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          {/* <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography> */}
          <MDBox component={NavLink} to="/" display="flex" alignItems="center">
            <MDBox component="img" src="/main.png" alt="Brand" width="2rem" />
          <MDBox
            width={"100%"}
            // sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color="white">
              B2B Cabs
            </MDTypography>
          </MDBox>
        </MDBox>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={(e)=>setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" onChange={(e)=>setPassword(e.target.value)} fullWidth />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="warning" fullWidth onClick={onSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text" sx={{color:'red !important'}}>
                {/* Don&apos;t have an account?{" "} */}
                {errorMsg}
                {/* <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography> */}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
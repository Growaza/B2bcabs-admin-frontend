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

// @mui material components
import { useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Card } from "@mui/material";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import Notification from "components/Notification";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import myApi from "../../axios";

const columnsData = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "first_name",
    headerName: "First Name",
    width: 150,
    editable: true,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",

    sortable: false,
    width: 180,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",

    width: 180,
    // editable: true,
  },
  {
    field: "state",
    headerName: "State",

    width: 150,
    // editable: true,
  },
  {
    field: "city",
    headerName: "City",

    width: 150,
    // editable: true,
  },
];

function UpdateContact() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [address, SetAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  React.useEffect(async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData, "userData");
    const data = await myApi.get(`/api/v1/accounts/vendors/${userData?.user_id}/`);
    console.log(data?.data, "data");
    setFirstName(data?.data.first_name);
    setLastName(data?.data.last_name);
    setPhoneNumber(data?.data.phone_number);
    setEmail(data?.data.email);
    setPassword(data?.data.password);
    setDob(data?.data.dob);
    // setData(data.data);
  }, []);

  const updateUser = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!dob) {
      dob = "2022-01-01";
    }
    let dt = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password,
      dob: dob,
    };
    try {   
      const data = await myApi.put(`/api/v1/accounts/vendors/${userData?.user_id}/`, dt);
      setNotify({
        isOpen: true,
        message: `user profile updated successfully`,
        type: "success",
      });
    } catch (e) {
      setNotify({
        isOpen: true,
        message: Object.entries(e?.response?.data)[0][1][0],
        type: "error",
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Update Contact Info
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Box sx={{ height: "500px", width: "100%" }}>
                  <MDBox component="form" role="form">
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="First Name"
                        value={firstName}
                        fullWidth
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Last Name"
                        value={lastName}
                        fullWidth
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="tel"
                        label="Contact Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDButton onClick={() => updateUser()} color="warning">
                      Update User
                    </MDButton>
                  </MDBox>
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Notification notify={notify} setNotify={setNotify} />
    </DashboardLayout>
  );
}

export default UpdateContact;

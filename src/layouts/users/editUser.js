import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import myApi from "../../axios";
import data from "layouts/tables/data/authorsTableData";

function EditUser(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [phoneNumber, setPhoneNumber] = useState();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    razorpay_account_id: null,
    state: "",
    city: "",
    // prefer_car: "",
    // cost_of_jorney: "",
    // commission_of_vendor: "",
    // date_of_jorney: "",
    // pickup_time: "",
    // is_booking_confirm: "",
    // customer_name: "",
    // customer_email: "",
    // customer_mobile_number: "",
  });

  React.useEffect(async () => {
    const data = await myApi.get(`/api/v1/accounts/vendors/${id}/`);
    console.log(data?.data, "data");
    setData(data.data);
  }, []);

  const updateBooking = async () => {
    const updateData = await myApi.put(`/api/v1/accounts/vendors/${id}/`, data);

    return navigate(`/registered-users/`);
  };

  const updateData = (e) => {
    console.log(data, "data");
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <Card> */}
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
                Update User Info
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <Box sx={{ height: 400, width: "100%", mb: 3 }}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="First Name"
                      value={data?.first_name}
                      fullWidth
                      name="first_name"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Last Name"
                      value={data?.last_name}
                      fullWidth
                      name="last_name"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Email"
                      value={data?.email}
                      fullWidth
                      name="email"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Password"
                      value={data?.password}
                      fullWidth
                      name="password"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="password"
                      label="Last Name"
                      value={data?.last_name}
                      fullWidth
                      name="last_name"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Phone Number"
                      value={data?.phone_number}
                      fullWidth
                      name="phone_number"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="State"
                      value={data?.state}
                      fullWidth
                      name="state"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="City"
                      value={data?.city}
                      fullWidth
                      name="city"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDButton onClick={() => updateBooking()} color="warning">
                      Update User
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Box>
            </MDBox>
            {/* </Card> */}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditUser;

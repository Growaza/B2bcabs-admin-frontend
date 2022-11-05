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

function EditSubscribers(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [phoneNumber, setPhoneNumber] = useState();
  const [data, setData] = useState({
    email: "",
    // testimonials: "",
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
    const data = await myApi.get(`/api/v1/subscribers/subscribers/${id}/`);
    console.log(data?.data, "data");
    setData(data.data);
  }, []);

  const updateBooking = async () => {
    const updateData = await myApi.put(`/api/v1/subscribers/subscribers/${id}/`, data);

    return navigate(`/manage-subscribers/`);
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
                Manage Subscribers
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <Box sx={{ height: 400, width: "100%", mb: 3 }}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="email"
                      label="Email"
                      value={data?.email}
                      fullWidth
                      name="email"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  {/* <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Testimonials"
                      value={data?.testimonials}
                      fullWidth
                      name="testimonials"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox> */}

                  <MDBox mb={2}>
                    <MDButton onClick={() => updateBooking()} color="warning">
                      Update Subscriber
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

export default EditSubscribers;

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
import Notification from "components/Notification";

function EditBooking(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [phoneNumber, setPhoneNumber] = useState();
  const [data, setData] = useState({
    pick_up: "",
    drop: "",
    prefer_car: "",
    cost_of_jorney: "",
    commission_of_vendor: "",
    date_of_jorney: "",
    pickup_time: "",
    is_booking_confirm: "",
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  React.useEffect(async () => {
    const data = await myApi.get(`/api/v1/booking/postbooking/${id}/`);
    console.log(data?.data, "data");
    setData(data.data);
  }, []);

  const updateBooking = async () => {
    try {
      const updateData = await myApi.put(`/api/v1/booking/postbooking/${id}/`, data);
      setNotify({
        isOpen: true,
        message: "Booking Updated",
        type: "success",
      });
    } catch (e) {
      setNotify({
        isOpen: true,
        message: Object.entries(e?.response?.data)[0][1][0],
        type: "error",
      });
    }
    // return navigate(`/bookings/`);
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
                Update Booking Info
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <Box sx={{ height: 400, width: "100%", mb: 3 }}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Pick Up"
                      value={data?.pick_up}
                      fullWidth
                      name="pick_up"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Drop"
                      value={data?.drop}
                      fullWidth
                      name="drop"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Prefer Car"
                      value={data?.prefer_car}
                      fullWidth
                      name="prefer_car"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Cost Of Jorney"
                      value={data?.cost_of_jorney}
                      fullWidth
                      name="cost_of_jorney"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Commission Of Vendor"
                      value={data?.commission_of_vendor}
                      fullWidth
                      name="commission_of_vendor"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="date"
                      label="Date Of jorney"
                      value={data?.date_of_jorney}
                      fullWidth
                      name="date_of_jorney"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Pickup Time"
                      value={data?.pickup_time}
                      fullWidth
                      name="pickup_time"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Is Booking Confirm"
                      value={data?.is_booking_confirm}
                      onChange={(e) => updateData(e)}
                      name="is_booking_confirm"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Customer Name"
                      value={data?.customer_name}
                      onChange={(e) => updateData(e)}
                      name="customer_name"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Customer Email"
                      value={data?.customer_email}
                      onChange={(e) => updateData(e)}
                      fullWidth
                      name="customer_email"
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="tel"
                      label="Customer Mobile Number"
                      value={data?.customer_mobile_number}
                      onChange={(e) => updateData(e)}
                      fullWidth
                      name="customer_mobile_number"
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDButton onClick={() => updateBooking()} color="warning">
                      Update Booking
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
      <Notification notify={notify} setNotify={setNotify} />
    </DashboardLayout>
  );
}

export default EditBooking;

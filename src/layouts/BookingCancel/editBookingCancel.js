import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import myApi from "../../axios";
import data from "layouts/tables/data/authorsTableData";
import Notification from "components/Notification";

function EditBookingCancel(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [phoneNumber, setPhoneNumber] = useState();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [data, setData] = useState({
    driver_email: "",
    driver_licence_number: "",
    driver_mobile_number: "",
    driver_name: "",
    driver_vehicle_number: "",
    is_booking_cansel: false,
    is_pickup: "",
    is_booking_confirm: "",
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
  });

  React.useEffect(async () => {
    const data = await myApi.get(`/api/v1/booking/confirmbooking/${id}/?is_booking_cansel=True`);
    console.log(data?.data, "data");
    setData(data.data);
  }, []);

  const updateBooking = async () => {
    delete data["created_at"];
    delete data["updated_at"];
    try {
      const updateData = await myApi.put(
        `/api/v1/booking/confirmbooking/${id}/?is_booking_cansel=True`,
        data
      );
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
    
  };

  const updateData = (e) => {
    console.log(data, "data");
    const { name, value } = e.target;
    console.log(name, value);
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
                Update Cancel Booking Info
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <Box sx={{ height: 400, width: "100%", mb: 3 }}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Driver Email"
                      value={data?.driver_email}
                      fullWidth
                      name="driver_email"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Driver Licence Number"
                      value={data?.driver_licence_number}
                      fullWidth
                      name="driver_licence_number"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Driver Mobile Number"
                      value={data?.driver_mobile_number}
                      fullWidth
                      name="driver_mobile_number"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Driver Name"
                      value={data?.driver_name}
                      fullWidth
                      name="driver_name"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="driver_vehicle_number"
                      value={data?.driver_vehicle_number}
                      fullWidth
                      name="driver_vehicle_number"
                      onChange={(e) => updateData(e)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <InputLabel id="demo-simple-select-label" sx={{mb:1}}>Is Booking Cansel</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={data?.is_booking_cansel}
                        name="is_booking_cansel"
                        onChange={(e) => updateData(e)}
                        input={<OutlinedInput />}
                        label="is_booking_cansel"
                        style={{ height: "42px" }}
                        renderValue={(selected) => {
                          return <em>{String(selected)}</em>;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBox>

                  <MDBox mb={2}>
                    <InputLabel id="demo-simple-select-label" sx={{mb:1}}>Is Pickup</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={data?.is_pickup}
                        name="is_pickup"
                        onChange={(e) => updateData(e)}
                        input={<OutlinedInput />}
                        label="Is Pickup"
                        style={{ height: "42px" }}
                        renderValue={(selected) => {
                          return <em>{String(selected)}</em>;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBox>
                  {/* <MDBox mb={2}>
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
                      onChange={(e) => setPhoneNumber(e)}
                      fullWidth
                      name="customer_mobile_number"
                    />
                  </MDBox> */}
                  <MDBox mb={2}>
                    <MDButton onClick={() => updateBooking()} color="warning">
                      Update Cancel Booking
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

export default EditBookingCancel;

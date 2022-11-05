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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Card } from "@mui/material";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDTypography from "components/MDTypography";

// Action
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import ConfirmDialog from "components/confirmDialog";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from "@mui/x-data-grid";
import myApi from "../../axios";
import moment from "moment";

function DriverRequest() {
  // const [data, setData] = useState([]);

  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [data, setData] = useState([]);

  const getRowData = (data) => {
    let arr = []
    data && data.map((item) => {
      arr.push({
        id: item.id,
        vendor_name: `${item.vendor.first_name} ${item.vendor.last_name}`,
        vendor_email: item.vendor.email,
        vendor_phone_number: item.vendor.phone_number, 
        pick_up: item.pick_up,
        drop: item.drop,
        prefer_car: item.prefer_car,
        cost_of_jorney: item.cost_of_jorney,
        commission_of_vendor: item.commission_of_vendor,
        date_of_jorney: item.date_of_jorney,
        pickup_time: item.pickup_time,
        is_booking_confirm: item.is_booking_confirm,
        customer_name: item.customer_name,
        customer_email: item.customer_email,
        customer_mobile_number: item.customer_mobile_number,
        is_5min_expire: item.is_5min_expire,
        is_booking_pick_admin: item.is_booking_pick_admin,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })
    })
    return arr
  }

  const columnsData = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_email",
      headerName: "Vendor Email",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_phone_number",
      headerName: "Vendor Phone number",
      width: 150,
      editable: false,
    },
    {
      field: "pick_up",
      headerName: "Pick Up",
      width: 150,
      editable: false,
    },
    {
      field: "drop",
      headerName: "Drop",
      width: 150,
      editable: false,
    },
    {
      field: "prefer_car",
      headerName: "Prefer Car",
      sortable: false,
      width: 150,
    },
    {
      field: "cost_of_jorney",
      headerName: "Cost Of Jorney",
      width: 150,
    },
    {
      field: "commission_of_vendor",
      headerName: "Commission Of Vendor",
      width: 150,
    },
    {
      field: "date_of_jorney",
      headerName: "Date Of Jorney",
      width: 150,
    },
    {
      field: "pickup_time",
      headerName: "Pickup Time",
      width: 150,
    },
    // {
    //   field: "is_booking_confirm",
    //   headerName: "Is Booking Confirm",
    //   width: 150,
    // },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 150,
    },
    {
      field: "customer_email",
      headerName: "Customer Email",
      width: 150,
    },
    {
      field: "customer_mobile_number",
      headerName: "Customer Mobile Number",
      width: 150,
    },
    {
      field: "is_5min_expire",
      headerName: "5min Expire",
      width: 150,
    },
    {
      field: "is_booking_pick_admin",
      headerName: "Is Booking Pick Admin",
      width: 150,
    },
    {
      field: "created_at",
      headerName: "Created Date",
      width: 240,
      renderCell: (params) => {
        let date = params.value ? moment(params.value).format("DD-MM-YYYY HH:mm:ss") : "-";
        return date;
      }
    },
    {
      field: "updated_at",
      headerName: "Updated Date",
      width: 240,
      renderCell: (params) => {
        let date = params.value ? moment(params.value).format("DD-MM-YYYY HH:mm:ss") : "-";
        return date;
      }
    },
  ];

  React.useEffect(async () => {
    const data = await myApi.get("/api/v1/booking/postbooking?flag=&is_driver_request_form=true");
    console.log(data?.data, "data");
    setData(data.data);
  }, []);

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
                  Driver Request
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Box sx={{ height: "100vh", width: "100%" }}>
                  {data.length > 0 ? (
                    <DataGrid
                      rows={getRowData(data)}
                      columns={columnsData}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      checkboxSelection={false}
                      disableSelectionOnClick
                      components={{ Toolbar: GridToolbar }}
                      // experimentalFeatures={{ newEditingApi: true }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DriverRequest;

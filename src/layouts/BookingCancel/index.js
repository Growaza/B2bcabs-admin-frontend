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
import { useState, Fragment } from "react";
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
import ConfirmDialog from "components/confirmDialog";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import Box from "@mui/material/Box";
import moment from "moment";
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbar  } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import myApi from "../../axios";
import {
  Button,
  IconButton,
  Snackbar,
  Alert,
  Slide,
  Skeleton,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Collapse,
  Tooltip,
} from "@mui/material";


function BookingCancel() {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [data, setData] = useState([]);
  const [isDialogeOpen, setIsDialogeOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState();

  const handleClick = (id) => {
    setDeleteId(id);
    setIsDialogeOpen(true);
  };
  async function deleteCheck() {
    try {
      await myApi
        .delete(`/api/v1/booking/confirmbooking/${deleteId}/?is_booking_cansel=True`)
        .then((result) => {
          const newData = data.filter((item) => {
            return item.id !== deleteId;
          });

          setData(newData);
          setDeleteId("");
          setIsDialogeOpen(false);
        });
    } catch (err) {
      setIsDialogeOpen(false);
    }
  }

  const updateCheck = async (id) => {
    console.log(id, "id");
    try {
      return navigate(`/cancel-bookings/${id}`);
    } catch (error) {}
  };

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
      field: "driver_email",
      headerName: "Driver Email",
      width: 150,
      editable: false,
    },
    {
      field: "driver_licence_number",
      headerName: "Driver Licence Number",
      width: 150,
      editable: false,
    },
    {
      field: "driver_mobile_number",
      headerName: "Driver Mobile Number",
      sortable: false,
      width: 150,
    },
    {
      field: "driver_name",
      headerName: "Driver Name",
      width: 150,
    },
    {
      field: "driver_vehicle_number",
      headerName: "Driver Vehicle Number",
      width: 150,
    },
    // {
    //   field: "is_booking_cansel",
    //   headerName: "Is Booking Cansel",
    //   width: 150,
    // },
    {
      field: "is_pickup",
      headerName: "Is Pickup",
      width: 150,
    },
    {
      field: "pick_up",
      headerName: "Pickup",
      width: 150,
    },
    {
      field: "drop",
      headerName: "Drop",
      width: 150,
    },
    {
      field: "prefer_car",
      headerName: "Prefer Car",
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
    // {
    //   field: "is_booking_confirm",
    //   headerName: "Is Booking Confirm",
    //   width: 150,
    // },
    // {
    //   field: "customer_name",
    //   headerName: "Customer Name",
    //   width: 150,
    // },
    // {
    //   field: "customer_email",
    //   headerName: "Customer Email",
    //   width: 150,
    // },
    // {
    //   field: "customer_mobile_number",
    //   headerName: "Customer Mobile Number",
    //   width: 150,
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,

      renderCell: (params) => {
        return (
          <Fragment>
            <Tooltip title="edit">
              <IconButton component="a" aria-label="edit" onClick={() => updateCheck(params.id)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete">
              <IconButton aria-label="delete" onClick={() => handleClick(params.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <ConfirmDialog
              title="Delete Confirm Booking?"
              open={isDialogeOpen}
              setOpen={setIsDialogeOpen}
              onConfirm={() => deleteCheck(params.id)}
            >
              Do you want to delete this confim-booking?
            </ConfirmDialog>
          </Fragment>
        );
      },
    },
  ];
  // const columnsData = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "driver_email",
  //     headerName: "Driver Email",
  //     width: 150,
  //     editable: false,
  //   },
  //   {
  //     field: "driver_licence_number",
  //     headerName: "Driver Licence Number",
  //     width: 150,
  //     editable: false,
  //   },
  //   {
  //     field: "driver_mobile_number",
  //     headerName: "Driver Mobile Number",
  //     sortable: false,
  //     width: 150,
  //   },
  //   {
  //     field: "driver_name",
  //     headerName: "Driver Name",
  //     width: 150,
  //   },
  //   {
  //     field: "driver_vehicle_number",
  //     headerName: "Driver Vehicle Number",
  //     width: 150,
  //   },
  //   {
  //     field: "is_booking_cansel",
  //     headerName: "Is Booking Cansel",
  //     width: 150,
  //   },
  //   {
  //     field: "is_pickup",
  //     headerName: "Is Pickup",
  //     width: 150,
  //   },
  //   // {
  //   //   field: "is_booking_confirm",
  //   //   headerName: "Is Booking Confirm",
  //   //   width: 150,
  //   // },
  //   // {
  //   //   field: "customer_name",
  //   //   headerName: "Customer Name",
  //   //   width: 150,
  //   // },
  //   // {
  //   //   field: "customer_email",
  //   //   headerName: "Customer Email",
  //   //   width: 150,
  //   // },
  //   // {
  //   //   field: "customer_mobile_number",
  //   //   headerName: "Customer Mobile Number",
  //   //   width: 150,
  //   // },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 150,
  //     sortable: false,
  //     filterable: false,

  //     renderCell: (params) => {
  //       return (
  //         <Fragment>
  //           <Tooltip title="edit">
  //             <IconButton component="a" aria-label="edit" onClick={() => updateCheck(params.id)}>
  //               <EditIcon fontSize="small" />
  //             </IconButton>
  //           </Tooltip>
  //           <Tooltip title="delete">
  //             <IconButton aria-label="delete" onClick={() => handleClick(params.id)}>
  //               <DeleteIcon fontSize="small" />
  //             </IconButton>
  //           </Tooltip>

  //           <ConfirmDialog
  //             title="Delete Cancel Booking?"
  //             open={isDialogeOpen}
  //             setOpen={setIsDialogeOpen}
  //             onConfirm={() => deleteCheck(params.id)}
  //           >
  //             Do you want to delete this cancel-booking?
  //           </ConfirmDialog>
  //         </Fragment>
  //       );
  //     },
  //   },
  // ];

  const getRowData = (data) => {
    let arr = []
    data && data.map((item) => {
      arr.push({
        id: item.id,
        vendor_name: `${item.vendor[0].first_name} ${item.vendor[0].last_name}`,
        vendor_email: item.vendor[0].email,
        vendor_phone_number: item.vendor[0].phone_number, 
        driver_email: item.postbooking[0].driver_name,
        driver_licence_number: item.postbooking[0].driver_licence_number, 
        driver_mobile_number: item.postbooking[0].driver_mobile_number,
        driver_name: item.postbooking[0].driver_name,
        driver_vehicle_number: item.postbooking[0].driver_vehicle_number,
        is_pickup:  item.is_pickup,
        pick_up: item.postbooking[0].pick_up,
        drop: item.postbooking[0].drop,
        prefer_car: item.postbooking[0].prefer_car,
        created_at: item.created_at,
        updated_at: item.updated_at
      })
    })
    console.log("arr",arr);
    return arr
  }

  React.useEffect(async () => {
    const data = await myApi.get("/api/v1/booking/confirmbooking/?is_booking_cansel=True");
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
                  Cancel Bookings
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

export default BookingCancel;

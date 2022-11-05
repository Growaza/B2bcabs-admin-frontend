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
import moment from "moment";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import myApi from "../../axios";

const rowsData = [
  {
    id: 1,
    name: "Snow",
    email: "Jon",
    phone_number: 345678935,
    msg: "01/01/2000",
  },
  {
    id: 2,
    name: "Snow",
    email: "Jon",
    phone_number: 345678935,
    msg: "01/01/2000",
  },
];

function PaymentHistory() {
  // const [data, setData] = useState([]);

  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const [data, setData] = useState([]);
//   const [isDialogeOpen, setIsDialogeOpen] = React.useState(false);
//   const [deleteId, setDeleteId] = useState();

//   const handleClick = (id) => {
//     setDeleteId(id);
//     setIsDialogeOpen(true);
//   };

  const updateCheck = async (id) => {
    try {
      return navigate(`/manage-contactus-query/${id}`);
    } catch (error) {}
  };

  React.useEffect(async () => {
    const data = await myApi.get("/api/v1/payment/paymenthistory/");
    console.log(data?.data, "data");
    setData(data?.data);
  }, []);

  const getRowData = (data) => {
    let arr = []
    data && data.map((item) => {
      arr.push({
        id: item.id,
        amount: item?.amount || "-",
        payment_status: item?.payment_status || "-",
        vendor_name: `${item.confirm_booking.vendor.first_name} ${item.confirm_booking.vendor.last_name}`,
        vendor_email: item.confirm_booking?.vendor?.email || "-",
        vendor_phone_number: item.confirm_booking?.vendor?.phone_number || "-",
        vendor_business_name: item.confirm_booking?.vendor?.business_name || "-",
        vendor_business_type: item.confirm_booking?.vendor?.business_type || "-",
        vendor_account_number: item.confirm_booking?.vendor?.account_type || "-",
        vendor_account_type: item.confirm_booking?.vendor?.account_number || "-",
        is_pickup: item.confirm_booking?.is_pickup || "-",
        is_booking_confirm: item.confirm_booking?.is_booking_cansel || "-",
        customer_name: item.confirm_booking?.postbooking?.customer_name || "-",
        customer_email: item.confirm_booking?.postbooking?.customer_email || "-",
        customer_mobile_number: item.confirm_booking?.postbooking?.customer_mobile_number || "-",
        created_at: item?.created_at || "-",
        updated_at: item?.updated_at || "-",
      })
    })
    return arr
  }

  const columnsData = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
      editable: true,
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      width: 200,
      editable: true,
    },
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
      field: "vendor_business_name",
      headerName: "Vendor Business name",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_business_type",
      headerName: "Vendor Business Type",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_account_number",
      headerName: "Vendor Account Number",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_account_type",
      headerName: "Vendor Account Type",
      width: 150,
      editable: false,
    },
    {
      field: "is_pickup",
      headerName: "Is Pickup",
      sortable: false,
      width: 150,
    },
    {
      field: "is_booking_confirm",
      headerName: "Is Booking Confirm",
      sortable: false,
      width: 150,
    },
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
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 150,
    //   sortable: false,
    //   filterable: false,

    //   renderCell: (params) => {
    //     return (
    //       <Fragment>
    //         <Tooltip title="edit">
    //           <IconButton component="a" aria-label="edit" onClick={() => updateCheck(params.id)}>
    //             <EditIcon fontSize="small" />
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="delete">
    //           <IconButton aria-label="delete" onClick={() => handleClick(params.id)}>
    //             <DeleteIcon fontSize="small" />
    //           </IconButton>
    //         </Tooltip>

    //         <ConfirmDialog
    //           title="Delete ManageContact?"
    //           open={isDialogeOpen}
    //           setOpen={setIsDialogeOpen}
    //         //   onConfirm={() => deleteCheck(params.id)}
    //         >
    //           Do you want to delete this managecontact?
    //         </ConfirmDialog>
    //       </Fragment>
    //     );
    //   },
    // },
  ];

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
                  Payment History
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

export default PaymentHistory;

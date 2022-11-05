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

import { Card, Switch } from "@mui/material";

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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import myApi from "../../axios";

function Users() {
  // const [data, setData] = useState([]);

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
      await myApi.delete(`/api/v1/accounts/vendors/${deleteId}/`).then((result) => {
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
    try {
      return navigate(`/registered-users/${id}`);
    } catch (error) {}
  };

  const handleChangeToggle = async (val, id) => {
    console.log(val, id, "sdd");
    let data = {
      "is_active": !Boolean(val),
    };
    console.log(data, "data");
    const updateStatus = await myApi.put(`/api/v1/accounts/vendor-account-status-action/${id}/`, data);
    apiCall()
  }
  React.useEffect(async () => {
    const data = await myApi.get("/api/v1/accounts/vendors/");
    console.log(data?.data, "data");
    setData(data.data);
  }, []);

  const apiCall = async () => {
    const data = await myApi.get("/api/v1/accounts/vendors/");
    console.log("data",data);
    setData(data?.data);
  }

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
      editable: false,
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
      field: "dob",
      headerName: "Date Of Birth",

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
    {
      field: "business_name",
      headerName: "Business Name",

      width: 150,
      // editable: true,
    },
    {
      field: "business_type",
      headerName: "Business Type",

      width: 150,
      // editable: true,
    },
    {
      field: "account_number",
      headerName: "Account Number",

      width: 150,
      // editable: true,
    },
    {
      field: "account_type",
      headerName: "Account Type",

      width: 150,
      // editable: true,
    },
    {
      field: "is_active",
      headerName: "Status",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Switch checked={Boolean(params.value)} name="status" onChange={() => handleChangeToggle(params.value, params.id)} />
        );
      },
    },
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
              title="Delete User?"
              open={isDialogeOpen}
              setOpen={setIsDialogeOpen}
              onConfirm={() => deleteCheck(params.id)}
            >
              Do you want to delete this user?
            </ConfirmDialog>
          </Fragment>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3} sx={{ height: "100%" }}>
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
                  Users
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Box sx={{ height: "100vh", width: "100%" }}>
                  {data.length > 0 ? (
                    <DataGrid
                      rows={data}
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

export default Users;

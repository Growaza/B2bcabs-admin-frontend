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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Card, Chip, FormControlLabel, Stack, Switch } from "@mui/material";

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
import { useState, Fragment } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from "@mui/x-data-grid";
import myApi from "../../axios";

function ManageTestimonials() {
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
      await myApi.delete(`/api/v1/testimonials/testimonials/${deleteId}/`).then((result) => {
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
      return navigate(`/manage-testimonials/${id}`);
    } catch (error) {}
  };

  const handleChangeToggle = async (val, id) => {
    let data = {
      "status": !Boolean(val),
    };
    console.log(data, "data");
    const updateStatus = await myApi.put(`/api/v1/testimonials/testimonials-status-action/${id}/`, data);
    apiCall()
  }

  React.useEffect(async () => {
    apiCall()
    // const data = await myApi.get("/api/v1/testimonials/testimonials");
    // setData(data?.data);
  }, []);

  const apiCall = async () => {
    const data = await myApi.get("/api/v1/testimonials/testimonials");
    setData(data?.data);
  }

  const handleDoneButtonClick = async (id) => {
    let data = {
      "is_confirm": "activate"
    };
    const updateStatus = await myApi.put(`/api/v1/testimonials/testimonials-confirm-action/${id}/`, data);
    apiCall();
  }

  const handleCancelButtonClick = async (id) => {
    let data = {
      "is_confirm": "dectivate"
    };
    const updateStatus = await myApi.put(`/api/v1/testimonials/testimonials-confirm-action/${id}/`, data);
    apiCall();
  }

  const columnsData = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "testimonials",
      headerName: "Testimonials",
      width: 250,
      editable: true,
    },
    {
      field: "status",
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
      field: "is_confirm",
      headerName: "Is Confirm",
      width: 150,
      editable: true,
      renderCell: (params) => {
        console.log("params",params.id);
        if (params.value == "null" || params.value == "") {
          return (
            <Fragment>
              <Stack direction="row">
                <Tooltip title="Accept">
                  <IconButton component="a" aria-label="accept">
                    <DoneRoundedIcon fontSize="medium" onClick={() => handleDoneButtonClick(params.id)} sx={{color:"#5cb85c"}}/>
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Decline">
                  <IconButton aria-label="decline">
                    <ClearRoundedIcon fontSize="medium" onClick={() => handleCancelButtonClick(params.id)} sx={{color:"#d9534f"}} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Fragment>
          )
          
         
        } else {
          return (
            <Fragment>
              {params.value.toLowerCase() == "activate" ? <Chip label="Accept" color="success" size="small" sx={{color: "#fff"}}/> : <Chip label="Decline" size="small" color="error" sx={{color: "#fff"}}/>} 
            </Fragment>
          )
        }
      }
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
              title="Delete Testimonial?"
              open={isDialogeOpen}
              setOpen={setIsDialogeOpen}
              onConfirm={() => deleteCheck(params.id)}
            >
              Do you want to delete this testimonial?
            </ConfirmDialog>
          </Fragment>
        );
      },
    },
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
                  Manage Testimonials
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Box sx={{ height: "100vh", width: "100%" }}>
                  {data.length > 0 ? (
                    <DataGrid
                      rows={data}
                      columns={columnsData}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      checkboxSelection={false}
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      components={{ Toolbar: GridToolbar }}
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

export default ManageTestimonials;

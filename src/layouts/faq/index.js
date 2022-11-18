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

import { Card, Icon } from "@mui/material";

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
import MDButton from "components/MDButton";

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

function FAQ() {
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
      await myApi.delete(`/api/v1/manage_pages/create-update-faqs/`, { id: deleteId}).then((result) => {
        console.log("result", result);
        getData();
        setDeleteId("");
        setIsDialogeOpen(false);
      });
    } catch (err) {
      setIsDialogeOpen(false);
    }
  }

  const updateCheck = async (id) => {
    try {
      return navigate(`/faq/${id}`);
    } catch (error) {}
  };

  const addCheck = async () => {
    try {
      return navigate(`/faq/add/`);
    } catch (error) {}
  };

  React.useEffect(async () => {
    getData();
  }, []);

  const getData = async () => {
    const data = await myApi.get("/api/v1/manage_pages/get_faqs/");
    console.log(data?.data, "data");
    setData(data.data);
  }

  const columnsData = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "question",
      headerName: "question",
      width: 180,
      editable: true,
    },
    {
      field: "answer",
      headerName: "Answer",
      width: 200,
      editable: true,
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
              title="Delete FAQs?"
              open={isDialogeOpen}
              setOpen={setIsDialogeOpen}
              onConfirm={() => deleteCheck(params.id)}
            >
              Do you want to delete this FAQs?
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
                py={2}
                px={2}
                variant="gradient"
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="info"
                sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
              >
                <MDTypography variant="h6" color="white">
                  FAQ
                </MDTypography>
                <MDButton variant="gradient" color="light" onClick={() => addCheck()}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add faq
                </MDButton>
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

export default FAQ;

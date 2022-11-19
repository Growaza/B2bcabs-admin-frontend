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
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Card } from "@mui/material";

import Notification from "components/Notification";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate, useParams } from "react-router-dom";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import myApi from "../../axios";

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
    editable: true,
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
];

function ManagePages() {
  let navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [page, setPage] = useState("");
  const [pageDetail, setPageDetail] = useState("");

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

  React.useEffect(() => {
    getData(page)
  }, [page]);

  const getData = async (page) => {
    if (page) {
      const data =  await myApi.get(`/api/v1/manage_pages/pages/?variable=${page}`)
      setPageDetail(data?.data[0].value)
    } else {
      setPageDetail("")
    }
    // setData(data.data);
  }

  const handleMessageChange = (event, editor) => {
    const data = editor.getData();
    setPageDetail(data);
  };

  const updatePage = async () => {
    let data = {
      variable: page,
      value: pageDetail,
    };
    if (page.length > 0) {
      const updateData = await myApi.put(`/api/v1/manage_pages/update-manage-pages/`, data);
      setNotify({
        isOpen: true,
        message: `${page} page updated successfully`,
        type: "success",
      });
    } else {
      setNotify({
        isOpen: true,
        message: `fill up the form.`,
        type: "error",
      });
    }
    // setPage("")
    // setPageDetail("")
    // return navigate(`/manage-pages`);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

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
                  Manage Pages
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Box sx={{ height: "500px", width: "100%" }}>
                  <MDBox component="form" role="form">
                    <MDBox mb={2} mx={2}>
                      {/* <MDInput type="select" label="Address" value={address} fullWidth onChange={(e)=>SetAddress(e.target.value)} /> */}
                      <FormControl sx={{ mt: 3 }} fullWidth>
                        <Select
                          // multiple
                          displayEmpty
                          value={page}
                          onChange={(e) => setPage(e.target.value)}
                          input={<OutlinedInput />}
                          style={{ height: "42px" }}
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <em>Select One</em>;
                            }

                            return selected;
                          }}
                          MenuProps={MenuProps}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {/* <MenuItem disabled value="">
                                <em>Select One</em>
                            </MenuItem> */}
                          <MenuItem value={"terms_and_condition"}>terms and condition</MenuItem>
                          <MenuItem value={"privacy_and_policy"}>privacy and policy</MenuItem>
                          <MenuItem value={"aboutus"}>aboutus</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                    {/* <MDBox mb={2} mx={2}>
                    <MDInput type="email" label="Email Id" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth />
                    </MDBox> */}
                    <MDBox mb={2} mx={2}>
                      {/* <MDInput type="tel" label="Contact Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} fullWidth /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        onInit={(editor) => {}}
                        onChange={handleMessageChange}
                        config={{ maxHeight: 200}}
                        style={{height: "200px", overflow: "scroll"}}
                        value={pageDetail}
                        data={pageDetail}
                      ></CKEditor>
                    </MDBox>

                    <MDBox my={2} mx={2}>
                      <MDButton onClick={() => updatePage()} color="warning">
                        Update Pages
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Notification notify={notify} setNotify={setNotify} />
    </DashboardLayout>
  );
}

export default ManagePages;

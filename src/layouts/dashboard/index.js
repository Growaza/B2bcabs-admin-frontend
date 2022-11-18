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
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import { Card, Typography } from "@mui/material";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import myApi from "../../axios";
import { _toCamel } from "context";

const columnsData = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "contact_no",
    headerName: "Contact no",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "dob",
    headerName: "DOB",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "country",
    headerName: "Country",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "reg_date",
    headerName: "Reg Date",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rowsData = [
  {
    id: 1,
    name: "Snow",
    email: "Jon",
    contact_no: 345678935,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 2,
    name: "Lannister",
    email: "Cersei",
    contact_no: 345678942,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 3,
    name: "Lannister",
    email: "Jaime",
    contact_no: 345678945,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 4,
    name: "Stark",
    email: "Arya",
    contact_no: 345678916,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 5,
    name: "Targaryen",
    email: "Daenerys",
    contact_no: 345678967,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 6,
    name: "Melisandre",
    email: null,
    contact_no: 3456789150,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 7,
    name: "Clifford",
    email: "Ferrara",
    contact_no: 345678944,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 8,
    name: "Frances",
    email: "Rossini",
    contact_no: 345678936,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
  {
    id: 9,
    name: "Roxie",
    email: "Harvey",
    contact_no: 345678965,
    dob: "01/01/2000",
    address: "A-5 xyz",
    city: "ahmedabad",
    country: "india",
  },
];

const colorData = ["#7DA0FA", "#4747A1", "#7978E9", "#F3797E", "#4747A1", "#7978E9", "#F3797E"]

function Dashboard() {
  const [data, setData] = React.useState();

  React.useEffect(async () => {
    const data = await myApi.get("/api/v1/manage_pages/total-counting/");
    console.log(data, "data");
    setData(data.data);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          {data &&
            Object.keys(data).map(function (key,i) {
              return (
                <>
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Box sx={{pl: 2, py: 3, backgroundColor: colorData[i], color: "#fff", borderRadius: "20px"}}>
                      <Typography variant="h6" sx={{color: "#fff"}}> {_toCamel(key)} </Typography>
                      <Typography variant="h3" sx={{color: "#fff", mt: 2}}>
                        {" "}
                        {data[key]} <br />
                      </Typography>
                    </Box>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

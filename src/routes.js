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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import ManageTestimonials from "layouts/manageTestimonials";
import ManageContact from "layouts/manageContact";
import ManageSubscribers from "layouts/manageSubscribers";
import UpdateContact from "layouts/users/UpdateContact";
import ManagePages from "layouts/managePages";
import Bookings from "layouts/Bookings";
import BookingConfirm from "layouts/BookingConfirm";
import BookingCancel from "layouts/BookingCancel";
import Users from "layouts/users";
import logout from "layouts/logout";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Feedback from "layouts/feedback";
import FAQ from "layouts/faq";
import Reports from "layouts/notifications";
import AboutUs from "layouts/profile";
import { ProtectedRoute } from "components/ProtectedRoute";
import DriverRequest from "layouts/DriverRequest";
import PaymentHistory from "layouts/PaymentHistory";
// import ContactUs from "layouts/contact-us";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <ProtectedRoute props={<Dashboard />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Registered Users",
    key: "registeredusers",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/registered-users",
    component: <ProtectedRoute props={<Users />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Bookings",
    key: "bookings",
    icon: <Icon fontSize="small">local_taxi</Icon>,
    route: "/bookings",
    component: <ProtectedRoute props={<Bookings />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Confirm Bookings",
    key: "confirm-bookings",
    icon: <Icon fontSize="small">no_crash</Icon>,
    route: "/confirm-bookings",
    component: <ProtectedRoute props={<BookingConfirm />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Cancel Bookings",
    key: "cancel-bookings",
    icon: <Icon fontSize="small">cancel</Icon>,
    route: "/cancel-bookings",
    component: <ProtectedRoute props={<BookingCancel />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Manage Testimonials",
    key: "managetestimonials",
    icon: <Icon fontSize="small">format_quote</Icon>,
    route: "/manage-testimonials",
    component: <ProtectedRoute props={<ManageTestimonials />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Manage Contactus Query",
    key: "managecontactusquery",
    icon: <Icon fontSize="small">contact_page</Icon>,
    route: "/manage-contactus-query",
    component: <ProtectedRoute props={<ManageContact />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Manage Subscribers",
    key: "managesubscribers",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/manage-subscribers",
    component: <ProtectedRoute props={<ManageSubscribers />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Update Contact Info",
    key: "updatecontactinfo",
    icon: <Icon fontSize="small">info</Icon>,
    route: "/update-contact-info",
    component: <ProtectedRoute props={<UpdateContact />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Manage Pages",
    key: "managepages",
    icon: <Icon fontSize="small">auto_stories</Icon>,
    route: "/manage-pages",
    component: <ProtectedRoute props={<ManagePages />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Driver Request",
    key: "driverreqeust",
    icon: <Icon fontSize="small">emoji_people</Icon>,
    route: "/driver-request",
    component: <ProtectedRoute props={<DriverRequest />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "feedback",
    icon: <Icon fontSize="small">feedback</Icon>,
    route: "/feedback",
    component: <ProtectedRoute props={<Feedback />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "FAQs",
    key: "faq",
    icon: <Icon fontSize="small">question_mark</Icon>,
    route: "/faq",
    component: <ProtectedRoute props={<FAQ />}></ProtectedRoute>,
  },
  {
    type: "collapse",
    name: "Payment History",
    key: "paymenthistory",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/payment-history",
    component: <ProtectedRoute props={<PaymentHistory />}></ProtectedRoute>,
  },
  // {
  //   type: "collapse",
  //   name: "Payment History",
  //   key: "payment-history",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Brands",
  //   key: "brands",
  //   icon: <Icon fontSize="small">apartment</Icon>,
  //   route: "/feedback",
  //   component: <Feedback />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Vehicles",
  //   key: "reports",
  //   icon: <Icon fontSize="small">texi</Icon>,
  //   route: "/reports",
  //   component: <Reports />,
  // },
  // {
  //   type: "collapse",
  //   name: "Bookings",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">book</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Manage Testimonials",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Manage Conatctus Query",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Reg Users",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">personadd</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Manage Pages",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">pages</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Update Contact Info",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Manage Subsribers",
  //   key: "aboutUs",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/aboutUs",
  //   component: <AboutUs />,
  // },
  // {
  //   type: "collapse",
  //   name: "Contact Us",
  //   key: "contactUs",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/contactUs",
  //   component: <ContactUs />,
  // },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;

import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// Public pages

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";


// User pages

import BookTable from "./pages/BookTable";
import History from "./pages/History";


// Admin pages

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import ManageTables from "./pages/ManageTables";


// Super Admin

import SuperAdmin from "./pages/SuperAdmin";



function App(){


return (


<BrowserRouter>


<Navbar />



<Routes>





{/* HOME */}

<Route

path="/"

element={<Home />}

/>






{/* AUTH */}

<Route

path="/login"

element={<Login />}

/>



<Route

path="/register"

element={<Register />}

/>



<Route

path="/forgot-password"

element={<ForgotPassword />}

/>







{/* CUSTOMER */}



<Route

path="/book"

element={<BookTable />}

/>



<Route

path="/history"

element={<History />}

/>








{/* ADMIN */}



<Route

path="/admin"

element={<AdminDashboard />}

/>




<Route

path="/users"

element={<Users />}

/>




<Route

path="/tables-admin"

element={<ManageTables />}

/>








{/* SUPER ADMIN */}



<Route

path="/super-admin"

element={<SuperAdmin />}

/>





</Routes>




<Footer />



</BrowserRouter>


);


}



export default App;

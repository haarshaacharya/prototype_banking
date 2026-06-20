import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Kyc from "./pages/Kyc";
import AdminDashboard from "./pages/AdminDashboard";




// Protected Route Component

function ProtectedRoute({ children, adminOnly=false }) {


    const token = localStorage.getItem("token");


    const storedUser = localStorage.getItem("user");


    const user = storedUser
    ?
    JSON.parse(storedUser)
    :
    null;





    // No login

    if(!token){


        return (

            <Navigate 
            to="/" 
            replace 
            />

        );


    }






    // Admin protection

    if(
        adminOnly &&
        user?.role !== "admin"
    ){

        return (

            <Navigate
            to="/dashboard"
            replace
            />

        );

    }






    return children;


}








function App(){



    const [
        isAuthChecked,
        setIsAuthChecked
    ] = useState(false);






    useEffect(()=>{


        setIsAuthChecked(true);


    },[]);








    if(!isAuthChecked){


        return(

            <div

            style={{

                height:"100vh",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                background:"#0f172a",

                color:"white",

                fontSize:"20px"

            }}

            >

                Loading...

            </div>

        );


    }









    return(


        <Routes>




            {/* Login */}

            <Route

            path="/"

            element={<Login/>}

            />






            {/* Register */}

            <Route

            path="/register"

            element={<Register/>}

            />









            {/* User Dashboard */}

            <Route

            path="/dashboard"

            element={


                <ProtectedRoute>


                    <Dashboard/>


                </ProtectedRoute>


            }

            />









            {/* Admin Dashboard */}

            <Route

            path="/admin-dashboard"

            element={


                <ProtectedRoute adminOnly={true}>


                    <AdminDashboard/>


                </ProtectedRoute>


            }

            />









            {/* KYC */}

            <Route

            path="/kyc"

            element={


                <ProtectedRoute>


                    <Kyc/>


                </ProtectedRoute>


            }

            />








            {/* Invalid Route */}

            <Route

            path="*"

            element={

                <Navigate
                to="/"
                replace
                />

            }

            />





        </Routes>


    );


}



export default App;
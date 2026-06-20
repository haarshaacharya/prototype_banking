import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import "../styles/dashboard.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function AdminDashboard(){


    const [data,setData] = useState(null);

    const [pendingKyc,setPendingKyc] = useState([]);

    const [loading,setLoading] = useState(true);


    const { logout } = useContext(AuthContext);


    const navigate = useNavigate();




    const maskAadhaar = (number)=>{


        if(!number) return "";


        return "******" + number.slice(-4);


    };




    const maskPan = (pan)=>{


        if(!pan) return "";


        return pan.substring(0,3)
        +
        "****"
        +
        pan.substring(pan.length-1);


    };





    const fetchAdminData = async()=>{


        try{


            const res = await api.get(
                "/admin/dashboard"
            );


            setData(
                res.data.dashboard
            );



            const kycRes = await api.get(
                "/admin/pending-kyc"
            );


            setPendingKyc(
                kycRes.data.kycs || []
            );


        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }


    };





    useEffect(()=>{


        fetchAdminData();


    },[]);





    const handleLogout = ()=>{


        logout();

        navigate("/");


    };





    const handleKycAction = async(id,action)=>{


        try{


            await api.put(

                `/admin/kyc/${id}/${action}`

            );


            alert(
                action==="approve"
                ?
                "KYC Approved"
                :
                "KYC Rejected"
            );


            fetchAdminData();


        }

        catch(error){


            alert(
                error.response?.data?.message ||
                "Action Failed"
            );


        }


    };
    if(loading){


        return(

            <div className="loading">

                Loading Admin Dashboard...

            </div>

        );

    }





    return(


        <div className="dashboard">


            <div className="main">



                <h1>
                    🛡 CyberShield Admin Dashboard
                </h1>




                <button

                onClick={handleLogout}

                style={{

                    marginTop:"15px",

                    padding:"12px 25px",

                    borderRadius:"10px",

                    border:"none",

                    background:"#dc2626",

                    color:"white",

                    fontWeight:"bold",

                    cursor:"pointer"

                }}

                >

                    🚪 Logout

                </button>







                <div className="cards">


                    <div className="card">

                        <h3>
                            Total Users
                        </h3>

                        <h2>
                            {data.totalUsers}
                        </h2>

                    </div>





                    <div className="card">

                        <h3>
                            ✅ Verified KYC
                        </h3>

                        <h2>
                            {data.verifiedUsers}
                        </h2>

                    </div>





                    <div className="card">

                        <h3>
                            🚨 Threat Alerts
                        </h3>

                        <h2 style={{
                            color:"red"
                        }}>

                            {data.threatAlerts}

                        </h2>

                    </div>





                    <div className="card">

                        <h3>
                            ⚠ High Risk Users
                        </h3>

                        <h2>
                            {data.highRiskUsers}
                        </h2>

                    </div>





                    <div className="card">

                        <h3>
                            Active Sessions
                        </h3>

                        <h2>
                            {data.activeSessions}
                        </h2>

                    </div>





                    <div className="card">

                        <h3>
                            System Status
                        </h3>

                        <h2>
                            Secure
                        </h2>

                    </div>



                </div>








                {/* Pending KYC */}


                <div
                className="card"
                style={{
                    marginTop:"20px",
                    width:"100%"
                }}
                >


                    <h2>
                        🪪 Pending KYC Verification
                    </h2>



                    {
                    pendingKyc.length===0

                    ?

                    (

                        <p>
                            No Pending KYC
                        </p>

                    )

                    :

                    pendingKyc.map((kyc,index)=>(


                        <div
                        key={index}
                        style={{
                            padding:"15px",
                            marginBottom:"15px",
                            border:"1px solid #ddd",
                            borderRadius:"10px"
                        }}
                        >


                            <p>
                                <b>User:</b>
                                {" "}
                                {kyc.user?.name}
                            </p>


                            <p>
                                <b>Email:</b>
                                {" "}
                                {kyc.user?.email}
                            </p>



                            <p>
                                <b>Aadhaar:</b>
                                {" "}
                                {maskAadhaar(kyc.aadhaar)}
                            </p>



                            <p>
                                <b>PAN:</b>
                                {" "}
                                {maskPan(kyc.pan)}
                            </p>





                            <button

                            onClick={()=>handleKycAction(
                                kyc._id,
                                "approve"
                            )}

                            style={{

                                background:"green",

                                color:"white",

                                padding:"10px",

                                borderRadius:"8px",

                                border:"none",

                                marginRight:"10px"

                            }}

                            >

                                ✅ Approve

                            </button>





                            <button

                            onClick={()=>handleKycAction(
                                kyc._id,
                                "reject"
                            )}

                            style={{

                                background:"red",

                                color:"white",

                                padding:"10px",

                                borderRadius:"8px",

                                border:"none"

                            }}

                            >

                                ❌ Reject

                            </button>




                        </div>


                    ))

                    }



                </div>






                {/* Recent Security Activity */}



                <div
                className="card"
                style={{
                    marginTop:"20px",
                    width:"100%"
                }}
                >


                    <h2>
                        Recent Security Activity
                    </h2>



                    {
                    data.recentLogs.map((log,index)=>(


                        <div key={index}>


                            <p>
                                <b>
                                    {log.eventType}
                                </b>
                            </p>


                            <p>
                                {log.description}
                            </p>


                            <p>
                                Risk:
                                {" "}
                                {log.risk}
                            </p>


                            <hr/>


                        </div>


                    ))

                    }



                </div>







                {/* User Management */}



                <div
                className="card"
                style={{
                    marginTop:"20px",
                    width:"100%"
                }}
                >


                    <h2>
                        User Management
                    </h2>



                    <table
                    style={{
                        width:"100%"
                    }}
                    >


                    <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>KYC Status</th>

                    </tr>

                    </thead>



                    <tbody>


                    {
                    data.usersList.map((user,index)=>(


                        <tr key={index}>


                            <td>
                                {user.name}
                            </td>


                            <td>
                                {user.email}
                            </td>


                            <td>
                                {user.role}
                            </td>


                            <td>
                                {user.kycStatus}
                            </td>


                        </tr>


                    ))

                    }


                    </tbody>


                    </table>



                </div>




            </div>


        </div>


    );


}


export default AdminDashboard;
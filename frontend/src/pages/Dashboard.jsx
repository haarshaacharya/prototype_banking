import "../styles/dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Dashboard(){


    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();



    const [me,setMe] = useState(null);



    const [kycStatus,setKycStatus] = useState("PENDING");



    const [security,setSecurity] = useState({

        riskScore:0,

        riskLevel:"LOW"

    });




    const [logs,setLogs] = useState([]);



    const [threats,setThreats] = useState(0);


    const [highThreats,setHighThreats] = useState(0);



    const [activeSessions,setActiveSessions] = useState(0);



    const [loading,setLoading] = useState(true);






    const handleLogout = ()=>{

        logout();

        navigate("/");

    };






    const getRiskColor=(level)=>{


        if(level==="LOW")

            return "green";


        if(level==="MEDIUM")

            return "orange";


        return "red";


    };







    const getRiskBadgeColor=(risk)=>{


        if(risk==="HIGH")

            return "red";


        if(risk==="MEDIUM")

            return "orange";


        return "green";


    };







    useEffect(()=>{


        const fetchData = async()=>{


            try{


                setLoading(true);




                const meRes = await api.get(
                    "/auth/me"
                );



                const logRes = await api.get(
                    "/security/"
                );



                const sessionRes = await api.get(
                    "/sessions"
                );






                setMe(
                    meRes.data.user
                );





                setKycStatus(
                    meRes.data.user.kycStatus || "PENDING"
                );





                setSecurity(
                    meRes.data.security
                );





                setLogs(
                    logRes.data.logs || []
                );





                setThreats(
                    logRes.data.threats || 0
                );





                setHighThreats(
                    logRes.data.highThreats || 0
                );





                setActiveSessions(
                    sessionRes.data.count || 0
                );





            }
            catch(error){


                console.log(error);


            }
            finally{


                setLoading(false);


            }


        };



        fetchData();



    },[]);






    if(loading){


        return(

            <div className="loading">

                Loading Dashboard...

            </div>

        );

    }





    return(


        <div className="dashboard">



            <div className="sidebar">



                <h2>
                    🛡 CyberShield
                </h2>



                <p>
                    Welcome
                </p>



                <h3>
                    {me?.name || user?.name}
                </h3>



                <p>
                    {me?.email || user?.email}
                </p>




                <button onClick={handleLogout}>

                    Logout

                </button>




            </div>





            <div className="main">



                <h1>
                    Security Dashboard 🔐
                </h1>




                <div className="card"
                style={{
                    marginBottom:"20px",
                    width:"100%"
                }}
                >


                    <h2>
                        👤 Security Profile
                    </h2>


                    <p>
                        Name:
                        {" "}
                        {me?.name}
                    </p>


                    <p>
                        Email:
                        {" "}
                        {me?.email}
                    </p>


                    <p>
                        KYC Status:
                        {" "}
                        {kycStatus}
                    </p>


                    <p>
                        Account Created:
                        {" "}
                        {
                        new Date(
                            me?.createdAt
                        )
                        .toLocaleDateString()
                        }
                    </p>



                </div>

                <div className="cards">



                    <div className="card">

                        <h3>
                            AI Risk Score
                        </h3>


                        <p className="score">

                            {security.riskScore}%

                        </p>


                    </div>





                    <div className="card">

                        <h3>
                            Risk Level
                        </h3>


                        <p
                        style={{
                            color:getRiskColor(
                                security.riskLevel
                            ),
                            fontWeight:"bold"
                        }}
                        >

                            {security.riskLevel}

                        </p>


                    </div>






                    <div className="card">

                        <h3>
                            KYC Verification
                        </h3>



                        {
                            kycStatus === "VERIFIED" ?


                            (

                                <h2
                                style={{
                                    color:"green"
                                }}
                                >

                                    ✅ Verified

                                </h2>


                            )


                            :


                            kycStatus === "REQUIRED" ?


                            (

                                <button
                                onClick={()=>navigate("/kyc")}
                                style={{
                                    background:"red",
                                    color:"white"
                                }}
                                >

                                    ⚠ Verify Now

                                </button>


                            )


                            :


                            (

                                <button
                                onClick={()=>navigate("/kyc")}
                                >

                                    Complete KYC

                                </button>


                            )

                        }



                    </div>







                    <div className="card">


                        <h3>
                            Active Sessions
                        </h3>


                        <h2>
                            {activeSessions}
                        </h2>


                    </div>







                    <div className="card">


                        <h3>
                            🚨 Threat Alerts
                        </h3>



                        <h2
                        style={{
                            color:
                            threats > 0
                            ?
                            "red"
                            :
                            "green"
                        }}
                        >

                        {
                            threats > 0
                            ?
                            `${threats} Threats`
                            :
                            "No Threats"
                        }


                        </h2>



                        <p>

                            High Risk:
                            {" "}
                            {highThreats}

                        </p>


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








                <div
                className="card"
                style={{
                    marginTop:"20px",
                    width:"100%"
                }}
                >


                    <h3>
                        💻 Device Security
                    </h3>




                    {

                    me?.devices?.length === 0 || !me?.devices ?

                    (

                        <p>
                            No trusted devices found
                        </p>

                    )


                    :


                    (

                        me.devices.map((device,index)=>(


                            <div
                            key={index}
                            style={{
                                padding:"10px",
                                marginBottom:"10px",
                                borderRadius:"10px"
                            }}
                            >


                                <p>

                                    <b>
                                        Device ID:
                                    </b>

                                    {" "}

                                    {device.deviceId}

                                </p>



                                <p>

                                    IP:

                                    {" "}

                                    {device.ip}

                                </p>



                                <p>

                                    Browser:

                                    {" "}

                                    {device.userAgent}

                                </p>



                                <hr/>


                            </div>


                        ))

                    )

                    }



                </div>









                <div
                className="card"
                style={{
                    marginTop:"20px",
                    width:"100%"
                }}
                >


                    <h3>

                        🔐 Security Activity Logs

                    </h3>





                    {
                        logs.length === 0 ?


                        (

                            <p>
                                No security activity detected
                            </p>


                        )


                        :


                        (


                        logs.map((log,index)=>(


                            <div

                            key={index}

                            style={{

                                padding:"15px",

                                marginBottom:"15px",

                                borderRadius:"10px",

                                borderLeft:
                                `5px solid ${getRiskBadgeColor(log.risk)}`

                            }}

                            >



                                <p>

                                    <b>

                                        {log.eventType}

                                    </b>

                                </p>




                                <p>

                                    {log.description}

                                </p>





                                <p
                                style={{
                                    color:getRiskBadgeColor(log.risk),
                                    fontWeight:"bold"
                                }}
                                >

                                    Risk:
                                    {" "}
                                    {log.risk}

                                </p>





                                <p>

                                {
                                    new Date(
                                        log.createdAt
                                    )
                                    .toLocaleString()

                                }

                                </p>




                                <hr/>


                            </div>


                        ))


                        )

                    }



                </div>



            </div>



        </div>


    );


}

export default Dashboard;
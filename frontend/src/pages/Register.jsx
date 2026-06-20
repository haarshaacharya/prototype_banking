import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);



    const handleRegister = async()=>{

        try{

            setLoading(true);


            const res = await api.post("/auth/register",{
                name,
                email,
                password
            });


            alert("Registration Successful 🚀");

            navigate("/");


        }
        catch(error){

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }
        finally{

            setLoading(false);

        }

    };




    return (

        <div style={styles.container}>


            <div style={styles.card}>


                <h2 style={styles.title}>
                    🛡 CyberShield Register
                </h2>



                <input

                    style={styles.input}

                    placeholder="Name"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                />



                <input

                    style={styles.input}

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />



                <input

                    style={styles.input}

                    placeholder="Password"

                    type="password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />




                <button

                    style={styles.button}

                    onClick={handleRegister}

                    disabled={loading}

                >

                    {loading ? "Creating Account..." : "Register"}

                </button>




                <p style={styles.text}>

                    Already have account?

                    <span

                    style={styles.link}

                    onClick={()=>navigate("/")}

                    >

                        Login

                    </span>

                </p>



            </div>


        </div>

    );

}




const styles = {


    container:{

        minHeight:"100vh",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        padding:"40px 20px",

        background:"linear-gradient(135deg,#020617,#1e3a8a)"

    },



    card:{


        width:"380px",

        padding:"35px",

        borderRadius:"20px",

        background:"rgba(15,23,42,0.85)",

        backdropFilter:"blur(15px)",

        boxShadow:"0 0 30px rgba(0,0,0,0.5)",

        display:"flex",

        flexDirection:"column",

        gap:"18px"


    },




    title:{


        color:"#38bdf8",

        textAlign:"center",

        fontSize:"26px",

        fontWeight:"bold",

        marginBottom:"15px"


    },




    input:{


        padding:"14px",

        borderRadius:"10px",

        border:"none",

        outline:"none",

        fontSize:"15px",

        background:"#f8fafc",

        color:"#0f172a"


    },




    button:{


        padding:"14px",

        borderRadius:"10px",

        border:"none",

        background:"linear-gradient(90deg,#2563eb,#06b6d4)",

        color:"white",

        fontSize:"16px",

        fontWeight:"bold",

        cursor:"pointer"


    },




    text:{


        textAlign:"center",

        color:"#cbd5e1",

        fontSize:"14px"


    },



    link:{


        color:"#38bdf8",

        marginLeft:"5px",

        cursor:"pointer",

        fontWeight:"bold"


    }


};


export default Register;
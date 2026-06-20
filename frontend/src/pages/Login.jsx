import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Login(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);



const navigate = useNavigate();


const {login}=useContext(AuthContext);





const handleLogin = async()=>{


try{


setLoading(true);



const res = await api.post(

"/auth/login",

{
email,
password
}

);





login(

res.data.user,

res.data.token

);




alert("Login Successful 🚀");




// ADMIN REDIRECT

if(

res.data.user.role === "admin"

){


    navigate("/admin-dashboard");


}



// KYC CHECK

else if(

res.data.user.kycStatus === "REQUIRED"

){


    navigate("/kyc");


}



// NORMAL USER

else{


    navigate("/dashboard");


}




}
catch(err){


alert(

err.response?.data?.message ||

"Login Failed"

);


}
finally{


setLoading(false);


}


};






return(


<div style={styles.container}>


<div style={styles.card}>


<h2 style={styles.title}>

🛡 CyberShield Login

</h2>



<p style={styles.subtitle}>

Secure Identity Access Portal

</p>




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


onClick={handleLogin}


disabled={loading}


>


{
loading

?

"Authenticating..."

:

"Login"

}


</button>
<p style={styles.text}>

Don't have account?


<span

style={styles.link}

onClick={()=>navigate("/register")}

>

 Register

</span>


</p>


</div>


</div>


);


}





const styles={



container:{


minHeight:"100vh",


display:"flex",


justifyContent:"center",


alignItems:"center",


padding:"40px 20px",


background:

"linear-gradient(135deg,#020617,#1e3a8a)"


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


fontSize:"28px",


fontWeight:"bold",


marginBottom:"5px"


},





subtitle:{


color:"#cbd5e1",


textAlign:"center",


fontSize:"14px",


marginBottom:"10px"


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


background:

"linear-gradient(90deg,#2563eb,#06b6d4)",


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

export default Login;

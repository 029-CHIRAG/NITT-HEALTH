import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom'
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const CLIENT_ID=import.meta.env.VITE_DAUTH_CLIENT_ID
const CLIENT_NAME=import.meta.env.VITE_DAUTH_CLIENT_NAME

const Login = () => {
  const {token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const auth_token = urlParams.get('token');
      if (auth_token) {
          setToken(auth_token);
          localStorage.setItem('token', auth_token);
          navigate("/")
      }
  }, []);
  const handleClick = () => {
    navigate("/loginNormal"); // 👈 goes to About page
  };


  async function loginHandler()
  {
    // window.location.href = `https://auth.delta.nitt.edu/authorize?client_id=lV8-LWmyrUbg6vcR&redirect_uri=${encodeURIComponent("http://localhost:3000/api/user/login")}&response_type=code&grant_type=authorization_code&state=statehai&scope=user&nonce=noncehai&clientName=NITTHealth`;
    window.location.href = `https://auth.delta.nitt.edu/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(`${REDIRECT_URI}`)}&response_type=code&grant_type=authorization_code&state=statehai&scope=user&nonce=noncehai&clientName=${CLIENT_NAME}`;

  }
  // loginHandler();

  return <div className="flex flex-col gap-3 items-center justify-center mt-[15%]">
<button onClick={ loginHandler} className=' bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Login With DAuth</button>  
<button onClick={handleClick} className=" bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">Login&SignUp as a normal User</button>
</div>
}

export default Login;

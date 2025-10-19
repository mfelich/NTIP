import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({onLogin}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
     e.preventDefault();
     setError('');
    try{
      const response = await fetch('http://localhost:8080/api/auth/login',{
        method:'POST',
         headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({username,password}),

      });

      const data = await response.json();
      console.log('Cijeli odgovor sa servera:', data);

      if(response.ok){

        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        onLogin(data.user,data.token);
        navigate('/');  
      }
      else{
        setError(data.message ||  'Invalid email or password');
      }
    }

    catch(err){
      setError('Error while connecting with server');
    }
  };

  return (
    <>
      {/*Login form */}
      <div
        tabindex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen flex"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Sign in to{" "}
                <strong className="text-purple-600 font-semibold">
                  Biddora
                </strong>
              </h3>

              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                  
                >

                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div className=""><h1 className="text-error text-center">{error}</h1></div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                        required
                      />
                    </div>
                    <label
                      htmlFor ="remember"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-purple-600 hover:underline "
                  >
                    Lost Password?
                  </a>
                </div>
                <button type="submit" className="w-full primary-button">
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 ">
                  Not registered?{" "}
                  <a href="#" className="text-purple-400 hover:underline ">
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

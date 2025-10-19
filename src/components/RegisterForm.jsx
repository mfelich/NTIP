import React from 'react'

const RegisterForm = ({setShowRegister}) => {
  return (
    <>
    {/*Register form */}

    <div className="flex items-center justify-center w-full h-screen">
    <div className="w-[520px] register-form px-4 py-4 bg-white rounded-lg">

      <h1 className="component-title mb-4">Create new account</h1>

    {/*Register first name and last name inputs */}
      <div className="flex items-center justify-center mb-4 space-x-2">
        <div className="w-6/12">
        <h1 className="text-base text-left">First Name</h1>
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
        </div>

        <div className="w-6/12">
        <h1 className="text-base text-left">Last Name</h1>
         <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Matt" required />
        </div>
      </div>
      
      {/*Register username input */}
        <div className="mb-4">
            <h1 className="text-base text-left">Username</h1>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="JohnMatt23" required />
        </div>

        {/*Register password inputs */}
        <div className="mb-4">
            <h1 className="text-base text-left">Password</h1>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required />
        </div>

        <div className="mb-8">
            <h1 className="text-base text-left">Enter password again</h1>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required />
        </div>

        {/*Register button */}
        <div className="">
            <button className="primary-button w-full">Create new account</button>
        </div>
    </div>
    </div>
    </>
  )
}

export default RegisterForm

/* eslint-disable */
'use client'
import { React, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { FaGoogle } from "react-icons/fa";
import getGoogleAuthURL from "../../../utils/Auth"

const signup = gql`
  mutation  ($email:String!,$password:String!){
    signup(email:$email,password:$password){
      token
      user{
        _id
        email
      }
    }
  }
`
const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleSignUp] = useMutation(signup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSignUp({
        variables: {
          email, password
        }
      })
       ("this is response", response.data);
      router.push('/pages/profile')
    } catch (error) {
       (error);
    }
  }
  const handleGoogleAuth = () => {
    const authURL = getGoogleAuthURL();
    window.location.href = authURL; // Redirect to Google's OAuth screen
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-90vw p-4">
      <div className='flex flex-col space-y-8 w-full max-w-md border rounded-xl p-8 border-2'>
        <div className='flex flex-col mb-4 items-center space-y-2'>
          <h1 className="text-black text-3xl md:text-5xl font-bold text-center">Get Started</h1>
          <span className="font-semibold text-sm md:text-md text-center">Empower Collaboration and Build Together</span>
        </div>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-black border text-center rounded-2xl border-2 p-2'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-black border text-center rounded-2xl border-2 p-2 '
          />
          <button
            type='submit'
            className='p-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition duration-300'>
            Submit
          </button>
        </form>
        <div className='text-center space-y-4'>
          <span className='font-bold'>Or Sign Up with</span>
          <div className="flex flex-row justify-center space-x-4">
            <FaGoogle onClick={handleGoogleAuth} className='cursor-pointer text-3xl text-gray-500 hover:text-black transition 
            duration-300 border border-2 rounded-full p-1' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;

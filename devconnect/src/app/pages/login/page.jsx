'use client'
import { React, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const login = gql`
  mutation  ($email:String!,$password:String!){
    login(email:$email,password:$password)
  }
`
const verifyOTP = gql`
  mutation  ($email:String!,$otp:Int!){
    verifyOTP(email:$email,otp:$otp){
      token
      user{
        _id
        email
      }
    }
  }`
const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [state, setState] = useState("LOGIN");
  const [handleLogin] = useMutation(login);
  const [verify] = useMutation(verifyOTP);
  const handleOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await verify({
        variables: {
          email, otp:parseInt(otp)
        }
      })
      console.log(response.data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin({
        variables: {
          email, password
        }
      })
      console.log(response.data);
      setState("OTP");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {state === 'LOGIN' ? <div className='flex flex-col space-y-8 w-full max-w-md border rounded-xl p-8 border-2'>
        <div className='flex flex-col mb-4 items-center space-y-2'>
          <h1 className="text-black text-3xl md:text-5xl font-bold text-center">Welcome Back!</h1>
          <span className="font-semibold text-sm md:text-md text-center">Welcome Back! Let&apos;s continue building together</span>
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
          <span className='font-bold'>Or Login with</span>
          <div className="flex flex-row justify-between space-x-4">
            <FaGoogle className='cursor-pointer text-2xl hover:text-gray-500 transition duration-300' />
            <FaGithub className='cursor-pointer text-2xl hover:text-gray-500 transition duration-300' />
            <FaLinkedin className='cursor-pointer text-2xl hover:text-gray-500 transition duration-300' />
          </div>
        </div>
      </div> :
        <div>
          <div className='flex flex-col space-y-8 w-full max-w-md border rounded-xl p-8 border-2'>
            <div className='flex flex-col mb-4 items-center space-y-2'>
              <h1 className="text-black text-3xl md:text-5xl font-bold text-center">Welcome Back!</h1>
              <span className="font-semibold text-sm md:text-md text-center">Welcome Back! Let&apos;s continue building together</span>
            </div>
            <form className='flex flex-col space-y-4' onSubmit={handleOTP}>

              <input
                type='password'
                placeholder='OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='border-black border text-center rounded-2xl border-2 p-2 '
              />
              <button
                type='submit'
                className='p-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition duration-300'>
                Submit
              </button>
            </form>
          </div>
        </div>}

    </div>
  )
}

export default Login;

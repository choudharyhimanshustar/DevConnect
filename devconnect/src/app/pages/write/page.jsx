/* eslint-disable */
'use client'
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { Room } from './Room'
import { Editor } from "./Editor";
const IDENTITY_QUERY = gql`
    query  {
        identity
    }
`;
const PROFILE_QUERY = gql`
query {
    profile{
        _id
        name
        about
        dp
    }
}`;

const Page = () => {
    const router = useRouter();
    const { data, loading, error } = useQuery(IDENTITY_QUERY);
    const { data: profiledata, loading: profileloading, error: profileerror } = useQuery(PROFILE_QUERY);
    useEffect(() => {
        if (loading) console.log("Loading...");

        if (data?.identity === null) {
            toast("User not Authorized", {
                onClose: () => router.push('/pages/login'),
                position: "top-center",
                className: "center-toast"
            });
        }
    }, [data, loading, error, router]); // Add `router` dependency
    useEffect(() => {
        if (profileloading) console.log(" Profile Loading...");
        console.log("Profile: ", profiledata?.profile);
        if (profiledata?.profile === null) {
            toast("Profile Does not Exist", {
                onClose: () => router.push('/pages/profile'),
                position: "top-center",
                className: "center-toast"
            });
        }
    }, [profiledata, profileloading, profileerror, router]);

    return (
        <div>
            <ToastContainer />
            {
                profiledata?.profile &&
                <div className='flex flex-row justify-center'>
                    <div className='bg-gray-300 w-[30%] h-[100vh] flex flex-col items-center font-bold p-2 space-y-4'>
                        <Image src={profiledata?.profile.dp} alt='Profile Picture' width={200} height={200} className='rounded-full' />
                        <h1>{profiledata?.profile.name}</h1>
                        <p className='border-2 border-gray-500 rounded-lg p-2'>{profiledata?.profile.about}</p>
                    </div>
                    <div className='bg-gray-500 w-full h-[100vh] p-2 font-bold'>

                        <Room >

                        </Room>

                    </div>
                </div>}
        </div>
    );
};

export default Page;

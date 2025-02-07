/* eslint-disable */
'use client'
import { React, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
const page = () => {
    const router = useRouter();
    const identity = gql`
    query
    {
        identity
    }
`
    const { data, loading, error } = useQuery(identity);
    useEffect(() => {
        // if (data) console.log("Data:", data);
        if (loading) console.log("Loading...");
        // if (error) console.error("Error:", error);
        if (data?.identity === null) {

            toast("User not Authorized", {
                onClose: () => router.push('/pages/login'), position: "top-center",
                className: "center-toast"
            });
        }
    }, [data, loading, error]);
    return (
        <div>
            <ToastContainer />
            <h1>Write</h1>
        </div>
    )
}

export default page

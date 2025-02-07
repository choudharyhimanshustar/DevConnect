/* eslint-disable */
'use client'
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const IDENTITY_QUERY = gql`
    query Identity {
        identity
    }
`;

const Page = () => {
    const router = useRouter();
    const { data, loading, error } = useQuery(IDENTITY_QUERY);

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

    return (
        <div>
            <ToastContainer />
            <h1>Write</h1>
        </div>
    );
};

export default Page;

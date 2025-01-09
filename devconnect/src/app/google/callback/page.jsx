/* eslint-disable */
'use client'
import { React, useEffect,Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { gql, useMutation } from '@apollo/client'
const authfortoken = gql`
mutation ($code:String!){
    authfortoken(code:$code){
        success
        token
    }
}

`
const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const [exchangeAuthCodeForToken] = useMutation(authfortoken)
    const AuthCodeForToken = async (code) => {
         ("Called this function.")
        try {
            const response = await exchangeAuthCodeForToken({
                variables: {
                    code
                }
            })
            router.push('/');
        } catch (error) {
             ("Error  : ", error)
        }

    }
    useEffect(() => {
        if (code) {
             ("The code", code)
            AuthCodeForToken(code);
        }
    }, [code]);


    return (
        <div>
            "This is the authorization page"
        </div>
    )
}

export default function GoogleCallbackPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
       <Page/>
      </Suspense>
    );
  }

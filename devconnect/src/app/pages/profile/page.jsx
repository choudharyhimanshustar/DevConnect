/* eslint-disable */
'use client';
import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import { techSkills } from '../../../utils/skillsOptions'
import Image from 'next/image';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
const createUserProfile = gql`
mutation createUserProfile($name:String!,$skills:[String]!,$linkedin:String,$github:String,$about:String,$dp:String!){
    createUserProfile(name:$name,skills:$skills,linkedin:$linkedin,github:$github,about:$about,dp:$dp){
        _id
        name
        skills
        linkedin
        github
        about
        dp
    }

}
`
const identity = gql`
    query
    {
        identity
    }
`
const Profile = () => {
    // Hooks
    const [dp, setDp] = useState("https://i.pinimg.com/736x/27/da/dd/27dadd800cceb522fe16e092392ecb0e.jpg");
    const [name, setName] = useState('');
    const [skills, setSkills] = useState([]);
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [about, setAbout] = useState('');
    const router = useRouter();

    //Queries
    const { data, loading, error } = useQuery(identity);
    useEffect(() => {
        // if (data) console.log("Data:", data);
        if (loading) console.log("Loading...");
        // if (error) console.error("Error:", error);
        if (data?.identity === null)
            router.push('/pages/login');
    }, [data, loading, error]);

    // Mutation
    const [handleProfile] = useMutation(createUserProfile);

    // Functions
    const handleDpChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', 'DevConnect');
                const res = await fetch('https://api.cloudinary.com/v1_1/dbxf5bxud/image/upload', {
                    method: 'POST',
                    body: data
                });
                const response = await res.json();
                if (response.secure_url) {
                    setDp(response.secure_url);
                } else {
                    throw new Error('No secure URL returned from Cloudinary');
                }
            } catch (error) { ("Error in uploading image", error) }
        }
    }

    // JSX
    return (
        <div className='flex flex-col border border-2 w-[90vw] mx-auto mt-4 rounded-lg p-2 max-h-[90vh] space-y-4 text-black'>
            <ToastContainer />
            <h1 className='mx-auto font-bold  text-xl'>Create Your Profile</h1>
            <div className='space-y-4 flex flex-row min-w-[50vw] justify-between'>
                <div className='space-y-4 flex flex-col max-w-[50vw] lg:min-w-[50vw] min-h-[40vh] mt-[2vw] mb-[5vw]'>
                    <input type="text" placeholder="Name" className='border-black border rounded-lg border-2 p-2'
                        onChange={(e) => setName(e.target.value)} />
                    <CreatableSelect options={techSkills}
                        formatOptionLabel={(option) => {
                            return <div className='flex flex-row justify-between items-center'>
                                {option.label}
                                {option.icon}
                            </div>
                        }}
                        isMulti placeholder='Skills'
                        className='border-black border  rounded-lg border-2 max-w-[50vw] max-h-[30vh]'
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                border: "none",
                                boxShadow: "none",
                            })
                        }}
                        onChange={(selectedOptions) => {
                            const skillSet = selectedOptions.map((item) => item.label);
                            setSkills(skillSet);
                        }} />
                    <input type="url" placeholder='Linkedin' className='border border-2 border-black rounded-lg p-2'
                        onChange={(e) => setLinkedin(e.target.value)} />
                    <input type="url" placeholder='Github' className='border border-2 border-black rounded-lg p-2'
                        onChange={(e) => setGithub(e.target.value)} />
                    <textarea placeholder='About Me' className='border border-2 border-black rounded-lg p-2 min-h-[30vh] max-h-[30vh]'
                        onChange={(e) => setAbout(e.target.value)} />
                </div>
                <div className='w-[20vw] lg:max-w-fit h-[10vh] rounded-lg mx-auto flex flex-col'>
                    <Image src={dp} width='100' height='0' className="h-[45vh] w-[40vw] border border-2 object-cover rounded-full 
                    border-dashed"
                        alt='DP' />
                    <button className='border border-2 rounded-lg border-black cursor-pointer mt-4 p-2 text-xs lg:text-sm font-semibold
                    bg-black text-white'
                        onClick={() => { document.getElementById('dpUpload').click() }}>
                        Time to upload your face of fame!</button>
                    <input id='dpUpload' type='file' className='hidden' onChange={handleDpChange} />
                    <div className='flex flex-col items-center m-2 lg:hidden'>
                        <Image src={"https://i.pinimg.com/474x/5d/4b/33/5d4b332b154300903e3f82f0ae32a668.jpg"} width={100} height={0} alt='onlyForPhone'
                            className='rounded-lg mt-10' />
                        <span className='text-xs w-[30vw] m-2 mb-20 font-semibold'>It would be better if you do the professional shit on the laptop/desktop</span>
                    </div>
                    <button className='border border-2 px-2 rounded-md mt-30 lg:mt-20 border-black font-semibold text-white bg-black'
                        onClick={async () => {
                            try {
                                await handleProfile({
                                    variables: {
                                        name,
                                        skills,
                                        linkedin,
                                        github,
                                        about,
                                        dp,
                                    },
                                });

                            } catch (error) {
                                if (error.graphQLErrors) {
                                    console.log("Profile Already Exists");
                                    toast("Profile Already Exists");

                                }
                            }
                            router.push('/');
                        }
                        }>Submit</button>
                </div>

            </div>

        </div >
    )
}

export default Profile

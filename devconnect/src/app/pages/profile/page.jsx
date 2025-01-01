'use client';
import React, {useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import { techSkills } from '../../../utils/skillsOptions'
import Image from 'next/image';
import { useMutation, gql } from '@apollo/client';
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
const Profile = () => {
    // Hooks
    const [dp, setDp] = useState("https://i.pinimg.com/736x/27/da/dd/27dadd800cceb522fe16e092392ecb0e.jpg");
    const [name, setName] = useState('');
    const [skills, setSkills] = useState([]);
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [about, setAbout] = useState('');

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
                    console.log('Image uploaded successfully:', response.secure_url);
                    setDp(response.secure_url);
                } else {
                    throw new Error('No secure URL returned from Cloudinary');
                }
            } catch (error) { console.log("Error in uploading image", error) }
        }
    }

    // JSX
    return (
        <div className='flex flex-col border border-2 max-w-[90vw] mx-auto mt-[5vh] rounded-lg p-2 max-h-[93vh] space-y-4 text-black'>
            <h1 className='mx-auto font-bold  text-3xl'>Create Your Profile</h1>
            <div className='space-y-4 flex flex-row min-w-[50vw] justify-between'>
                <div className='space-y-10 flex flex-col min-w-[50vw] min-h-[40vh] mt-[2vw] mb-[5vw]'>
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
                    <div className='flex flex-row space-x-4 justify-between'>
                        <input type="url" placeholder='Linkedin' className='border border-2 border-black rounded-lg p-2'
                            onChange={(e) => setLinkedin(e.target.value)} />
                        <input type="url" placeholder='Github' className='border border-2 border-black rounded-lg p-2'
                            onChange={(e) => setGithub(e.target.value)} />
                    </div>
                    <textarea placeholder='About Me' className='border border-2 border-black rounded-lg p-2 h-[30vh]'
                        onChange={(e) => setAbout(e.target.value)} />
                </div>
                <div className='max-w-fit min-h-[40vh] rounded-lg mx-auto flex flex-col'>
                    <Image src={dp} width='100' height='0' className="h-[40vh] w-full border border-2 object-cover rounded-lg" alt='DP' />
                    <button className='border border-2 rounded-lg border-black cursor-pointer mt-2 p-2 text-sm font-semibold'
                        onClick={() => { document.getElementById('dpUpload').click() }}>
                        Time to upload your face of fame!</button>
                    <input id='dpUpload' type='file' className='hidden' onChange={handleDpChange} />
                    <button className='border border-2 px-2 rounded-md mt-20 border-black font-semibold'
                        onClick={() => handleProfile({
                            variables: {
                                name: name,
                                skills: skills,
                                linkedin: linkedin,
                                github: github,
                                about: about,
                                dp: dp
                            }
                        })}>Submit</button>
                    {console.log(name, skills, linkedin, github, about, dp)}
                </div>

            </div>

        </div>
    )
}

export default Profile

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws } from 'react-icons/fa';
import { SiDjango, SiGraphql, SiKubernetes, SiMongodb, SiMysql, SiPostgresql, SiTailwindcss, SiTypescript, SiFirebase, SiRedux, SiSass } from 'react-icons/si';

const techSkills = [
    { value: 'html', label: 'HTML', icon: <FaHtml5 /> },
    { value: 'css', label: 'CSS', icon: <FaCss3Alt /> },
    { value: 'javascript', label: 'JavaScript', icon: <FaJs /> },
    { value: 'react', label: 'React', icon: <FaReact /> },
    { value: 'nodejs', label: 'Node.js', icon: <FaNodeJs /> },
    { value: 'python', label: 'Python', icon: <FaPython /> },
    { value: 'django', label: 'Django', icon: <SiDjango /> },
    { value: 'graphql', label: 'GraphQL', icon: <SiGraphql /> },
    { value: 'docker', label: 'Docker', icon: <FaDocker /> },
    { value: 'kubernetes', label: 'Kubernetes', icon: <SiKubernetes /> },
    { value: 'mongodb', label: 'MongoDB', icon: <SiMongodb /> },
    { value: 'mysql', label: 'MySQL', icon: <SiMysql /> },
    { value: 'postgresql', label: 'PostgreSQL', icon: <SiPostgresql /> },
    { value: 'tailwindcss', label: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { value: 'typescript', label: 'TypeScript', icon: <SiTypescript /> },
    { value: 'git', label: 'Git', icon: <FaGitAlt /> },
    { value: 'aws', label: 'AWS', icon: <FaAws /> },
    { value: 'firebase', label: 'Firebase', icon: <SiFirebase /> },
    { value: 'redux', label: 'Redux', icon: <SiRedux /> },
    { value: 'sass', label: 'Sass', icon: <SiSass /> },
];

module.exports={techSkills}

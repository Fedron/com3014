'use client'

import Frame from '@/components/Frame';
import { useEffect, useState } from "react";

// async function getDataAnalytics() {
//     const response = await fetch("http://localhost:8000/getDataAnalytics-Json")
//     return response.json();
// }

export default function Page() {
    const [skillStudentCounts, setSkillStudentCounts] = useState('');
    const [skillJobCounts, setSkillJobCounts] = useState('');
    const [neededSkills, setNeededSkills] = useState('');
    const [wantedJobs, setWantedJobs] = useState('');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = '/sign-in';
        } else {
            const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:8000/getDataAnalytics-Json");
                const dataAnalytics = await result.json();
                setSkillStudentCounts(dataAnalytics.skillStudentCounts);
                setSkillJobCounts(dataAnalytics.skillJobCounts);
                setNeededSkills(dataAnalytics.neededSkills);
                setWantedJobs(dataAnalytics.wantedJobs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
            fetchData();
        }
    }, [])

    // const dataAnalytics = await getDataAnalytics();
    // const skillStudentCounts = dataAnalytics.skillStudentCounts;
    // const skillJobCounts = dataAnalytics.skillJobCounts;
    // const neededSkills = dataAnalytics.neededSkills;
    // const wantedJobs = dataAnalytics.wantedJobs;

    return (
        <Frame pageTitle="Admin Dashboard">
            <div className="m-[1%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                <div className="col-span-1">
                    <p className="font-heading text-sm mb-2">Skills Distribution Among Students</p>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-zebra table-pin-rows">
                            <thead>
                            <tr>
                                <th>Skill Name</th> 
                                <th>No. of Students</th> 
                            </tr>
                            </thead> 
                            <tbody>
                                {skillStudentCounts && skillStudentCounts.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.skillName}</td> 
                                        <td>{element.numStudents}</td> 
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                </div>

                <div className="col-span-1">
                    <p className="font-heading text-sm mb-2">Skills Demand in Job Listings</p>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-zebra table-pin-rows">
                            <thead>
                            <tr>
                                <th>Skill Name</th> 
                                <th>No. of Posts</th> 
                            </tr>
                            </thead> 
                            <tbody>
                                {skillJobCounts && skillJobCounts.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.skillName}</td> 
                                        <td>{element.numPosts}</td> 
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                </div>

                <div className="col-span-1">
                    <p className="font-heading text-sm mb-2">Needed Skills Disparity</p>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-zebra table-pin-rows">
                            <thead>
                            <tr>
                                <th>Skill Name</th> 
                                <th>Deficit</th> 
                            </tr>
                            </thead> 
                            <tbody>
                                {neededSkills && neededSkills.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.skillName}</td> 
                                        <td>{element.deficit}</td> 
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                </div>

                <div className="col-span-1">
                    <p className="font-heading text-sm mb-2">Wanted Jobs Disparity</p>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-zebra table-pin-rows">
                            <thead>
                            <tr>
                                <th>Skill Name</th> 
                                <th>Deficit</th> 
                            </tr>
                            </thead> 
                            <tbody>
                                {wantedJobs && wantedJobs.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.skillName}</td> 
                                        <td>{element.deficit}</td> 
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                </div>

            </div>
        </Frame>
    )
}
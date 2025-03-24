'use client'

import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
import Frame from '@/components/Frame';
import Tag from '@/components/Tag';
import OpportunitiesCard from '@/components/OpportunityCard';
import React, { useEffect } from 'react';

function getOpportunitiesJobList() {
    useEffect(() => {
        var jsonOutput = {}
        var checkboxFilters = ['opportunityType','subjectArea','salary','location']
        for (let filterTypeName in checkboxFilters){
            console.log(filterTypeName)
            console.log(checkboxFilters[filterTypeName])
            console.log(document.getElementById(checkboxFilters[filterTypeName]))
            console.log(document.getElementById("opportunityType"))
            for (let filterName in document.getElementById(checkboxFilters[filterTypeName]).children){
                if (filterName.checked) {
                    jsonOutput.filterTypeName[filterName.option] = 1
                } else {
                    jsonOutput.filterTypeName[filterName.option] = 0
                }
            }
        }
    
        const response = fetch('http://localhost:8000/getOpportunitiesJobList-Json',{body: JSON.stringify(jsonOutput)});
        /*return response.json();*/
      },[]);

  }

export default async function Opportunities() {
    return (
        <main className="flex-grow">
            <Frame imageUrl="opportunities.jpg" pageTitle="Opportunities">
                <div className="relative mx-[2%]">
                    <div className="join rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div>
                            <label className="input input-bordered flex items-center join-item gap-2 !outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>                
                                <input type="text" className="text-sm grow" placeholder="Search keywords"/>
                            </label>
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center join-item gap-2 !outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>               
                                <input type="text" className="text-sm grow" placeholder="Location"/>
                            </label>
                        </div>
                        <button className="btn join-item btn-primary justify-end" onClick={getOpportunitiesJobList()}>Find jobs</button>
                    </div>
                </div>
                
                <div className='mx-4 my-8 grid grid-cols-5 gap-4'>

                    <div className="col-span-1">
                        <div className="w-full text-sm font-medium">
                            <button className="btn btn-outline btn-accent btn-sm w-full">Apply filters</button>
                            <Filter id="opportunityType" filterName="Opportunity type">
                                <FilterOption option="Placement" />
                                <FilterOption option="Graduate job" />
                                <FilterOption option="Internship" />
                            </Filter>
                            <Filter id="subjectArea" filterName="Subject area">
                                <FilterOption option="Biology" />
                                <FilterOption option="Chemistry" />
                                <FilterOption option="Computer science" />
                                <FilterOption option="Mathematics" />
                            </Filter>
                            <Filter id="salary" filterName="Salary">
                                <FilterOption option="< £20,000" />
                                <FilterOption option="£20,000 - £30,000" />
                                <FilterOption option="£30,000 - £40,000" />
                                <FilterOption option="£40,000 - £50,000" />
                                <FilterOption option="£50,000 - £60,000" />
                                <FilterOption option="> £60,000" />
                            </Filter>
                            <Filter filterName="Date posted">
                                <label for="from">From: </label><input type="date" id="from" />
                                <label for="to">To: </label><input type="date" id="to" />
                            </Filter>
                            <Filter filterName="Date closing">
                                <label for="from">From: </label><input type="date" id="from" />
                                <label for="to">To: </label><input type="date" id="to" />
                            </Filter>
                            <Filter id="location" filterName="Location">
                                <FilterOption option="Bath" />
                                <FilterOption option="Cardiff" />
                                <FilterOption option="Edinburgh" />
                                <FilterOption option="Glasgow" />
                                <FilterOption option="London" />
                                <FilterOption option="Oxford" />
                                <FilterOption option="York" />
                            </Filter>
                        </div>   
                    </div>  

                    <div className='col-span-4'>
                        <div className='my-1 grid grid-cols-2 gap-4'>
                            <div className='font-heading text-sm'>1 to 50 of 1307 results</div>
                            <div className='text-right'>
                                <select className="select select-bordered select-sm max-w-xs">
                                    <option disabled selected>Sort by</option>
                                    <option>Recommended</option>
                                    <option>Skills matched</option>
                                </select>
                            </div>
                        </div>

                        <OpportunitiesCard imageUrl="default_company.png"jobTitle="Nintendo Communications Internship May/June 2024 - July 2025 (1 Year)"companyName="Nintendo UK"opportunityType="Placement"occupationalArea="Management and business; Marketing, advertising and PR; Sales"location="England - South West"closingDate="29-Mar-2024">
                            <Tag color="secondary" tagName="Recommended"/>
                            <Tag color="accent" tagName="Skills matched"/>
                        </OpportunitiesCard>

                        <OpportunitiesCard imageUrl="/default_company.png"jobTitle="Nintendo Communications Internship May/June 2024 - July 2025 (1 Year)"companyName="Nintendo UK"opportunityType="Placement"occupationalArea="Management and business; Marketing, advertising and PR; Sales"location="England - South West"closingDate="29-Mar-2024">
                            <Tag color="secondary" tagName="Recommended"/>
                        </OpportunitiesCard>
                        <OpportunitiesCard imageUrl="/default_company.png"jobTitle="Nintendo Communications Internship May/June 2024 - July 2025 (1 Year)"companyName="Nintendo UK"opportunityType="Placement"occupationalArea="Management and business; Marketing, advertising and PR; Sales"location="England - South West"closingDate="29-Mar-2024">
                            <Tag color="secondary" tagName="Recommended"/>
                        </OpportunitiesCard>
                    </div>

                </div>
            </Frame>
        </main>
    );
}

import CompanyCard from '@/components/CompanyCard';
import Frame from '@/components/Frame';
import Tag from '@/components/Tag';

export default function Page({ params }) {
    return (
        <main className="flex-grow">
            <Frame pageTitle="Nintendo Communications Internship May/June 2024 - July 2025 (1 Year)">

                <div className="mx-[2%]">
                    <div className='my-[2%] grid grid-cols-3 gap-4'>

                        <div className="col-span-1">
                            <div className="w-full">
                                <CompanyCard imageUrl="default_company.png" name="Nintendo UK" desc="Nintendo is an industry leader in entertainment and video games. We have created some of the best known and top selling video game franchises of all time, including Mario, The Legend of Zelda, Animal Crossing and Pokémon. All of which can be played on our great hardware – the original Nintendo Switch, Switch Lite and the latest Nintendo Switch OLED, with a vibrant 7inch OLED screen." sdgs={[7,12,13,14]} email="internship@nintendo.co.uk" />
                            </div>
                            <div className="bg-secondary w-full h-60"></div>
                        </div>

                        <div className="col-span-2 px-2 relative text-sm font-semibold">
                            <div className="absolute top-0 right-0">
                                <button className="btn btn-success text-base-100">
                                    APPLY NOW
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </button>
                            </div>

                            <div>
                                Closing date:&ensp;<span className="font-normal">29-Mar-2024</span><br /><br />
                                Opportunity type:&ensp;<span className="font-normal">Placement</span><br />
                                Subject areas:&ensp;<span className="font-normal">Management and business; Marketing, advertising and PR; Sales</span><br />
                                Locations:&ensp;<span className="font-normal">England - South West</span>
                            </div>
                            
                            <div className="my-4">
                                DESCRIPTION<br />
                                <span className="text-xs font-normal">
                                    Reporting to the Head of Communications, the role would act as support to the Nintendo UK Communications team which is responsible for all communications activities including PR / Influencer relations, social media, community engagement and events across the UK market. In addition to providing administrative support, day to day tasks would include:<br />
                                    • Supporting the Communications team with the formulation and implementation of wider Marketing & Communication plans.<br />
                                    • Providing a product rich perspective when joining briefs, planning sessions and brainstorms internally and externally.<br />
                                    • Working closely with PR, influencer and Social Media Managers on specific product launches.<br />
                                    • Implementing our journalist PR preview and reviews program which includes planning and distribution of PR materials to media including game codes.<br />
                                    • Assisting with social media / website activities with Social Media Manager, along with wider content creation across social platforms.<br />
                                    • Supporting the organisation of external facing events as necessary.<br />
                                    • Carrying out PR / influencer / social media analysis and tracking of key data including monitoring, compilation and distribution of coverage / social listening reports<br />
                                    • Responding to daily PR enquiries.• Providing general admin support to all team members including working on weekly Marketing and Communications reports.
                                </span>
                            </div>

                            <div className="my-4">
                                REQUIREMENTS<br />
                                <span className="text-xs font-normal">
                                    This is an undergraduate placement year opportunity. All applicants must be studying for an undergraduate degree, preferably in Marketing, Communications, Social media, Journalism or Advertising, and looking for an internship as part of their degree programme.
                                </span>
                            </div>

                            <div className="mt-4">
                                SKILLS<br />
                                <div className="flex flex-wrap mt-2">
                                    <Tag color="green" tagName="Marketing & Communications" />
                                    <Tag color="green" tagName="Time management" />
                                    <Tag color="green" tagName="Organisational skills" />
                                    <Tag color="red" tagName="PR / Influencer Marketing" />
                                    <Tag color="red" tagName="Social Media" />
                                    <Tag color="red" tagName="Presentation skills" />
                                    <Tag color="red" tagName="Microsoft Excel" />
                                    <Tag color="red" tagName="Adobe suite" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </Frame>
        </main>
    )
}
import Frame from '@/components/Frame';
import AppointmentCard from '@/components/AppointmentCard';

async function getAvailableMeetingsGE() {
    const response = await fetch('http://localhost:8000/getAvailableMeetingsGE-Json');
    return response.json();
}

async function getAvailableMeetingsPP() {
    const response = await fetch('http://localhost:8000/getAvailableMeetingsPP-Json');
    return response.json();
}

export default async function Appointments() {

    const availableMeetingsGE_data = await getAvailableMeetingsGE();
    const availableMeetingsPP_data = await getAvailableMeetingsPP();

    const [availableMeetingsGE, availableMeetingsPP] = await Promise.all([availableMeetingsGE_data, availableMeetingsPP_data])

    return (
        <main>
            <Frame imageUrl="/appointments.jpg" pageTitle="Appointments">
                <div className="mx-[2%]">
                    <AppointmentCard imageUrl="/general_enquiries.jpg" cardTitle="General Enquiries" cardDesc="15 minute help session">
                        {availableMeetingsGE.meetingList_GE ? (
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Duration</th>
                                        <th>Adviser</th>
                                        <th>Location</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='text-xs'>
                                    {availableMeetingsGE.meetingList_GE.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.date || 'N/A'}</td>
                                            <td>{element.duration || 'N/A'}</td>
                                            <td>{element.adviser || 'N/A'}</td>
                                            <td>{element.location || 'N/A'}</td>
                                            <td className="p-0 text-right pe-4">
                                                <button className="btn btn-outline btn-accent btn-sm w-full">Book</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (<p>No available meetings.</p>)
                        }
                    </AppointmentCard>
                    <AppointmentCard imageUrl="/professional_portfolio.jpg" cardTitle="Professional Portfolio Appointment" cardDesc="A CV, Cover Letter, Personal Statement or LinkedIn check">
                        
                    </AppointmentCard>
                </div>
            </Frame>
        </main>
    );
}
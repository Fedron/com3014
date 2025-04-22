import CommunityCreation from "@/components/CommunityCreation";
import Frame from "@/components/Frame";

export default function createcommunity() {
    return (
        <main>
            <Frame pageTitle="Create your own community!">
                <div className='ml-2'>
                <CommunityCreation></CommunityCreation>
                </div>
            </Frame>
        </main>
    );
}
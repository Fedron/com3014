import ChatMessage from "@/components/ChatMessage";
import ChatMessageBox from "@/components/ChatMessageBox";
import Frame from "@/components/Frame";
import UserCard from "@/components/UserCard";

export default function LiveChat() {
    return (
        <main>
            <Frame pageTitle="Live Chat" imageUrl="/live-chat_banner.png">
            <div className="relative mx-[2%]">
                <div className='my-4 grid grid-cols-5 gap-4  '>
                    {/* <div className='container '> */}
                        <UserCard name="A user" ></UserCard>
                    {/* </div> */}
                    <div className='col-span-4 rounded-none lg:card-side bg-base-100 shadow mx-32'>
                        <div className="chat chat-start ml-1 mt-1">
                            <ChatMessage></ChatMessage>
                        </div>
                        <div className="chat chat-end mr-1">
                            <ChatMessage></ChatMessage>
                        </div>
                        <ChatMessageBox></ChatMessageBox>
                    </div>  
                </div>
            </div>
            </Frame>
        </main>
    );
}
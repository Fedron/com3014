import ChatMessage from "@/components/ChatMessage";
import ChatMessageBox from "@/components/ChatMessageBox";
import Frame from "@/components/Frame";
import UserCard from "@/components/UserCard";

export default function LiveChat() {
    return (
        <main>
            <Frame pageTitle="Live Chat" imageUrl="/live-chat_banner.png">
                <div className="relative mx-[2%]">
                    <div className='my-4 flex gap-4  h-[50vh]'>
                        <div className='container w-1/4 space-y-2 overflow-auto'>
                            <h2 className="font-semibold mb-3">Friends</h2>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                            <UserCard name="Username" imageurl="default_profile.png" ></UserCard>
                        </div>
                        <div className='flex flex-col flex-1 h-full bg-base-300 shadow '>
                            <div className="flex-1 overflow-y-auto px-2 py-2">
                                <div className="chat chat-start ">
                                 <ChatMessage></ChatMessage>
                                </div>
                                <div className="chat chat-end mr-1 bottom-0">
                                    <ChatMessage></ChatMessage>
                                </div>
                            </div>
                            <ChatMessageBox></ChatMessageBox>
                        </div>
                    </div>
                </div>
            </Frame>
        </main>
    );
}
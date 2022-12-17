import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

function TeamChannelPreview({ setActiveChannel, setIsCreating, setIsEditing, channel, type }) {
    const { channel: activeChannel, client } = useChatContext();
    function DirectPreview() {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)
        return (
            <div className='flex mb-4 ml-3  items-center  '>
                <Avatar image={members[0]?.user?.image} name={members[0]?.user?.name} size={24} />
                <p className='text-lg '>{members[0]?.user?.name}</p>
            </div>
        )
    }
    function ChannelPreview() {
        return (
            <p className='ml-4 text-xl  mb-4'>
                # {channel?.data?.name || channel?.data?.id}
            </p>
        );
    }

    return (
        <div onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
        }}>
            {type === 'team' ? <ChannelPreview  /> : <DirectPreview />}
        </div>
    )
}


export default TeamChannelPreview;

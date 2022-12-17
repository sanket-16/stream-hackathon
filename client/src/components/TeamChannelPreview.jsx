import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

function TeamChannelPreview({ setActiveChannel, setIsCreating, setIsEditing, channel, type }) {
    const { channel: activeChannel, client } = useChatContext();
    function DirectPreview() {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)
        return (
            <div className='flex items-center m-2 p-2 bg-secondary rounded-lg text-lg hover:text-primary '>
                <Avatar image={members[0]?.user?.image} name={members[0]?.user?.name} size={24} />
                <p className='text-lg '>{members[0]?.user?.name}</p>
            </div>
        )
    }
    function ChannelPreview() {
        return (
            <p className='m-2 p-2 bg-secondary rounded-lg text-lg hover:text-primary'>
                 {channel?.data?.name || channel?.data?.id}
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

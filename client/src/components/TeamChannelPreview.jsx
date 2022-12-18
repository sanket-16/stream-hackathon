import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

function TeamChannelPreview({ setActiveChannel, setIsCreating, setIsEditing, channel, type }) {
    const { channel: activeChannel, client } = useChatContext();
    function DirectPreview() {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)
        return (
            <div className={
                     channel?.id===activeChannel?.id
                     ? 'bg-primary   flex items-center m-2 p-2  rounded-lg text-lg '
                     :' flex items-center m-2 p-2 bg-secondary rounded-lg text-lg hover:text-primary'
                 }>


                <Avatar image={members[0]?.user?.image} name={members[0]?.user?.name} size={24} />
                <p className='text-lg '>{members[0]?.user?.name !== undefined ? members[0]?.user?.name : 'Deleted User' }</p>
            </div>
        )
    }
    function ChannelPreview() {
        return (
            <p className={
                channel?.id===activeChannel?.id
                ? 'bg-primary   flex items-center m-2 p-2  rounded-lg text-lg '
                :' flex items-center m-2 p-2 bg-secondary rounded-lg text-lg hover:text-primary'
            }>
              <span className='0 mr-2'> # </span> { channel?.data?.name !== undefined && channel?.data?.id !== undefined ? channel?.data?.name || channel?.data?.id : 'Deleted Channel' }
            </p>
        );
    }

    return (
        <div

            onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
                setActiveChannel(channel);
            }}>
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}


export default TeamChannelPreview;



// className={
//     channel?.id===activeChannel?.id
//     ? 'bg-slate-500'
//     :'bg-slate-900'
// }



// className={
//     channel?.id===activeChannel?.id
//     ? 'bg-slate-500'
//     :'bg-slate-900'
// }
import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import UserList from './UserList'
import CloseCreateChannel from '../assets/CloseCreateChannel'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {



  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  }
  return (
    <>
      <p className='text-xl'>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="Channel Name" />
      <p>Add Member</p>
    </>
  )
}
function CreateChannel({ createType, setIsCreating }) {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID] || '');
  const [channelName, setChannelName] = useState('')

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }

  }
  return (


   
    <div className='col-span-4'>
      <div className='flex justify-between p-4'>
        <h2>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</h2>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>

      <div className='flex m-2 justify-between items-center'>
        {createType === 'team' && 
        <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}

        
        <button  className='bg-primary mx-6' onClick={createChannel}>
          <p>
            {createType === 'team' ? 'CreateChannel' : 'Create message Group'}

          </p>
        </button>
       


      </div>
      <UserList setSelectedUsers={setSelectedUsers} />

    </div>
  )
}

export default CreateChannel
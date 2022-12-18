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
    <div>
      <p className='text-xl ml-3'>Name</p>
      <input  type='text' value={channelName} onChange={handleChange} placeholder="Channel Name" />
    </div>
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
        <h1>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</h1>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>

      <div className='flex m-2 justify-between items-center'>
        {createType === 'team' && 
        <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}

        
        <button  className='bg-primary mx-6 hover:bg-blue-700 hover:scale-105  ' onClick={createChannel}>
          <p >
            {createType === 'team' ? 'Create Channel' : 'Create message Group'}

          </p>
        </button>
       


      </div>
      <UserList setSelectedUsers={setSelectedUsers} />

    </div>
  )
}

export default CreateChannel
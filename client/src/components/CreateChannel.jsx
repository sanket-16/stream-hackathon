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
    <div></div>
    <div className='flex gap-x-3 items-center mt-4 ml-4 '>

      <p className='text-2xl '>Name:</p>
      <input
      className='    p-2 pl-2  text-white   rounded-md bg-[#494949]'
       value={channelName} onChange={handleChange} placeholder="Channel Name" />
    </div>
      <p className='mt-7 text-2xl ml-4 text-center'>Add Member</p>
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
    <>
      <div className='flex justify-around items-center  w-full mt-6 border-b-4  border-y-[#494949] '>
        <p className='text-2xl items-end mb-4'>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</p>
        <span>

        <CloseCreateChannel  setIsCreating={setIsCreating} />
        </span>
      </div>

      <div>
        {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}

        <UserList
          setSelectedUsers={setSelectedUsers} />

        <button className='mt-5' onClick={createChannel}>
          <p>
            {createType === 'team' ? 'CreateChannel' : 'Create message Group'}

          </p>
        </button>

      </div>


    </>
  )
}

export default CreateChannel
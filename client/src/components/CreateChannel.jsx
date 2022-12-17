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
      <p>Name</p>
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
    <>
      <div>
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>

      <div>
        {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}

        <UserList
          setSelectedUsers={setSelectedUsers} />

        <div onClick={createChannel}>
          <p>
            {createType === 'team' ? 'CreateChannel' : 'Create message Group'}

          </p>
        </div>

      </div>


    </>
  )
}

export default CreateChannel
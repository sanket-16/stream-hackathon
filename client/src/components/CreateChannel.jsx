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
  const [channelName, setChannelName] = useState('')
  return (
    <>
      <div>
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>

      <div>
        {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}

        <UserList/>
      </div>


    </>
  )
}

export default CreateChannel
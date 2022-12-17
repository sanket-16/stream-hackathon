import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import UserList from './UserList'
import CloseCreateChannel from '../assets/CloseCreateChannel'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {



  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  }
  return (
    <>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="Channel Name" />
      <p>Add Member</p>
    </>
  )
}
function EditChannel({ setIsEditing }) {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const updateChannel = async (e) => {
    e.preventDefault();
    const nameChanged = channelName != (channel.data.name || channel.data.id);
    if (nameChanged) {
      await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}` });
    }
    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }
    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }

  return (
    <div>
      <div>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div onClick={updateChannel}>
        Save Changes
      </div>
    </div>

  )
}

export default EditChannel
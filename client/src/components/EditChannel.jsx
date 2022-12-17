import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
import CloseCreateChannel from '../assets/CloseCreateChannel';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
	const handleChange = (event) => {
		event.preventDefault();
		setChannelName(event.target.value);
	};
	return (
		<div>
			<h3 className='text-xl'>Name</h3>
			<input
				type='text'
				value={channelName}
				onChange={handleChange}
				placeholder='Channel Name'
			/>
		</div>
	);
};
function EditChannel({ setIsEditing }) {
	const { channel } = useChatContext();
	const [channelName, setChannelName] = useState(channel?.data?.name);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const updateChannel = async (e) => {
		e.preventDefault();
		const nameChanged =
			channelName != (channel.data.name || channel.data.id);
		if (nameChanged) {
			await channel.update(
				{ name: channelName },
				{ text: `Channel name changed to ${channelName}` }
			);
		}
		if (selectedUsers.length) {
			await channel.addMembers(selectedUsers);
		}
		setChannelName(null);
		setIsEditing(false);
		setSelectedUsers([]);
	};

	return (
		<div className='col-span-4'>
			<div className='flex justify-between p-4'>
				<h1>Edit Channel</h1>
				<CloseCreateChannel setIsEditing={setIsEditing} />
			</div>
			<div className='flex m-2 justify-between items-center'>
				<ChannelNameInput
					channelName={channelName}
					setChannelName={setChannelName}
				/>
				<button className='bg-primary mx-6' onClick={updateChannel}>Save Changes</button>
			</div>
			<UserList setSelectedUsers={setSelectedUsers} />
		</div>
	);
}

export default EditChannel;

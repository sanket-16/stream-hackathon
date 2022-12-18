import React from 'react';
import AddChannel from '../assets/AddChannel';

function TeamChannelList({ children, error = false, loading, type, isCreating, setIsCreating, isEditing, setIsEditing, setCreateType, }) {
	
	if (loading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}


	return (
		<div className=''>
			<div className='flex justify-between items-center'>
				<p className='text-white/50 font-semibold ml-4 mb-4 mt-4 '>{type === 'team' ? 'Channels' : 'Direct Messages'}</p>
				<AddChannel
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					setIsEditing={setIsEditing}
					setCreateType={setCreateType}
					type={type === 'team' ? 'team' : 'messaging'}
				/>
			</div>
			{children}
		</div>
	);
}

export default TeamChannelList;

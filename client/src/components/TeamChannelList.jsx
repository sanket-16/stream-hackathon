import React from 'react';
import AddChannel from '../assets/AddChannel';

function TeamChannelList({ children, error = false, loading, type, isCreating, setIsCreating, isEditing, setIsEditing, setCreateType, }) {
	// if (error) {
	// 	return type === 'team' ? (
	// 		<div>
	// 			<p>Connection error, please wait a moment and try again.</p>
	// 		</div>
	// 	) : null;
	// }
	if (loading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}
	return (
		<div>
			<div>
				<p>{type === 'team' ? 'Channels' : 'Direct Messages'}</p>
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

import React from 'react';

function TeamChannelList({ children, error = false, loading, type }) {
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
				{/* button */}
			</div>
			{children}
		</div>
	);
}

export default TeamChannelList;

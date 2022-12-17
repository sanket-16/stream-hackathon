import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import {IoMdSearch} from 'react-icons/io'
import { Client } from 'faye';
function ChannelSearch() {
	const {client , setActiveChannel} = useChatContext();
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [TeamChannels , setTeamChannels] = useState([]);
	const [directChannels , setDirectChnnels] = useState([]);



	async function getChannels(value) {
		try {
			 const channelRespone = 
		} catch (error) {
			setQuery('');
		}
	}

	return (
		<div>
			<div className='flex gap-2 items-center'>
				<IoMdSearch size={30}/>
				<input
					type='text'
					placeholder='Search'
					value={query}
					onChange={(event) => {
						event.preventDefault();
						setLoading(true);
						setQuery(event.target.value);
						getChannels(event.target.value);
					}}
				/>
			</div>
		</div>
	);
}

export default ChannelSearch;

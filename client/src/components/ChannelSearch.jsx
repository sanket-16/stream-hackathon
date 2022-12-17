import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { IoMdSearch } from 'react-icons/io'

function ChannelSearch() {
	const { client, setActiveChannel } = useChatContext();
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [teamChannels, setTeamChannels] = useState([]);
	const [directChannels, setDirectChnnels] = useState([]);

    useEffect(()=>{
        if(!query){
			setTeamChannels([]);
			setDirectChnnels([])
		}
	},[query])

	async function getChannels(value) {
		try {
			const channelRespone =  client.queryChannels({
				type: 'team',
				name: { $autocomplete: text },
				members: { $in: [client.userID] }
			}

			)
		const userResponse =  client.queryUsers({
			id:{$ne : client.userID},
			name: {$autocomplete:text}
		})

		const [channels, {users}] = await Promise.all([channelRespone , userResponse]);

		if (channels.length) setTeamChannels(channels);
		if (users.length) setDirectChnnels(users);
	}
		catch (error) {
			setQuery('');
		}
	}
	
	const setChannel = ( channel) =>{
		setQuery('');
		setActiveChannel(channel);

	}

	return (
		<div>
			<div className='flex m-4'>
				<IoMdSearch size={30} />
				<input
					className='search-input'
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
			{/* {query && (
				<ResultsDropDown 
				teamChannels = {teamChannels}
				directChannels = {directChannels}
				loading = {loading}
				setChannel = {setChannel}
				setQuery = {setQuery}


				
				/> */}
		</div>
	);
}

export default ChannelSearch;

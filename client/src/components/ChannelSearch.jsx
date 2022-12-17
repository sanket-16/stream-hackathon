import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { IoMdSearch } from 'react-icons/io'
import ResultsDropDown from './ResultsDropDown'
// import { text } from 'body-parser';
function ChannelSearch({setToggleContainer}) {
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

	async function getChannels(text) {
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
	const onSearch = (event) => {
        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value)
    }
	const setChannel = ( channel) =>{
		setQuery('');
		setActiveChannel(channel);

	}

	return (
		<div>
			<div className='flex gap-2 items-center'>
				<IoMdSearch size={30} />
				<input
					type='text'
					placeholder='Search'
					value={query}
					onChange={onSearch}
				/>
			</div>
			{query && (
				<ResultsDropDown 
				teamChannels = {teamChannels}
				directChannels = {directChannels}
				loading = {loading}
				setChannel = {setChannel}
				setQuery = {setQuery}
				setToggleContainer={setToggleContainer}

				
				/>



			)}
		</div>
	);
}

export default ChannelSearch;

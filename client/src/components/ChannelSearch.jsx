import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { IoMdSearch } from 'react-icons/io'
import ResultsDropDown from './ResultsDropDown'
// 
function ChannelSearch({ setToggleContainer }) {
	const { client, setActiveChannel } = useChatContext();
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [teamChannels, setTeamChannels] = useState([]);
	const [directChannels, setDirectChnnels] = useState([]);

	useEffect(() => {
		if (!query) {
			setTeamChannels([]);
			setDirectChnnels([])
		}
	}, [query])

	async function getChannels(text) {
		try {
			const channelRespone = client.queryChannels({
				type: 'team',
				name: { $autocomplete: text },
				members: { $in: [client.userID] }
			}

			)
			const userResponse = client.queryUsers({
				id: { $ne: client.userID },
				name: { $autocomplete: text }
			})

			const [channels, { users }] = await Promise.all([channelRespone, userResponse]);

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
	const setChannel = (channel) => {
		setQuery('');
		setActiveChannel(channel);

	}

	return (
		<div>

			{/* SearchBar  */}
			<div className='relative flex items-center w-52     h-12 rounded-lg focus-within:shadow-lg bg-[#494949] overflow-hidden '>
				<div className='grid place-items-center h-full w-12 text-gray-300 pl-4'><IoMdSearch size={30} /></div>
				<div className='peer h-full w-full outline-none   pr-2'><input
					className='search-input'
					type='text'
					placeholder='Search'
					value={query}
					onChange={onSearch}
				/></div>
			</div>
			{query && (
				<ResultsDropDown
					teamChannels={teamChannels}
					directChannels={directChannels}
					loading={loading}
					setChannel={setChannel}
					setQuery={setQuery}
					setToggleContainer={setToggleContainer}


				/>



			)}
		</div>
	);
}

export default ChannelSearch;

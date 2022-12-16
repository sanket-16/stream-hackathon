import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

function ChannelSearch() {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);

	async function getChannels(value) {
		try {
			//TODO
		} catch (error) {
			setQuery('');
		}
	}

	return (
		<div>
			<div>
				<div>Search Icon</div>
				<input
					type='text'
					placeholder='search'
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

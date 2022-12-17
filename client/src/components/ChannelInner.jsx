import React, { useState } from 'react';
import {
	MessageList,
	MessageInput,
	Thread,
	Window,
	useChannelActionContext,
	Avatar,
	useChannelStateContext,
	useChatContext,
} from 'stream-chat-react';
import {TbInfoCircle} from 'react-icons/tb'

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing,Message }) => {
	const [giphyState, setGiphyState] = useState(false);
	const { sendMessage } = useChannelActionContext();

	const overrideSubmitHandler = (message) => {
		let updatedMessage = {
			attachments: message.attachments,
			mentioned_users: message.mentioned_users,
			parent_id: message.parent?.id,
			parent: message.parent,
			text: message.text,
		};

		if (giphyState) {
			updatedMessage = {
				...updatedMessage,
				text: `/giphy ${message.text}`,
			};
		}

		if (sendMessage) {
			sendMessage(updatedMessage);
			setGiphyState(false);
		}
	};

	return (
		<GiphyContext.Provider value={{ giphyState, setGiphyState }}>
			<div className='w-full'>
				<Window>
					<TeamChannelHeader setIsEditing={setIsEditing} />
					<MessageList />

					<MessageInput
						overrideSubmitHandler={overrideSubmitHandler}
					/>
				</Window>
				<Thread />
			</div>
		</GiphyContext.Provider>
	);
};

const TeamChannelHeader = ({ setIsEditing }) => {
	const { channel, watcher_count } = useChannelStateContext();
	const { client } = useChatContext();

	const MessagingHeader = () => {
		const members = Object.values(channel.state.members).filter(
			({ user }) => user.id !== client.userID
		);
		const additionalMembers = members.length - 3;

		if (channel.type === 'messaging') {
			return (
				<div>
					{members.map(({ user }, i) => (
						<div key={i} className='flex  items-center gap-2 ml-4 mt-5'>
							<Avatar
								image={user.image}
								name={user.fullName || user.id}
								size={35}
							/>
							<p className='text-lg '>{user.name || user.id}</p>
						</div>
					))}

					{additionalMembers > 0 && (
						<p className=''>and {additionalMembers} more</p>
					)}
				</div>
			);
		}

		return (
			<div className='flex justify-between items-center px-2 pt-2'>
				<h2 > {channel.data.name}</h2>
				<span
					onClick={() => setIsEditing(true)}
				>
					<TbInfoCircle size={25}/>
				</span>
			</div>
		);
	};

	const getWatcherText = (watchers) => {
		if (!watchers) return 'No users online';
		if (watchers === 1) return '1 user online';
		return `${watchers} users online`;
	};

	return (
		<div  className=' shadow-2xl  '>
			<MessagingHeader />
			<div className='text-white/50 px-6 pb-2'>
				<p className=''>{getWatcherText(watcher_count)}</p>
			</div>
		</div>
	);
};

export default ChannelInner;

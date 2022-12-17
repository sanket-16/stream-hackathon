import React from 'react';
import { Channel, useChatContext, MessageList } from 'stream-chat-react';
import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';

function ChannelContainer({
	isCreating,
	setIsCreating,
	isEditing,
	setIsEditing,
	createType,
}) {
	const { channel } = useChatContext();

	if (isCreating) {
		return (
			<div>
				<CreateChannel
					createType={createType}
					setIsCreating={setIsCreating}
				/>
			</div>
		);
	}
	if (isEditing) {
		return (
			<div>
				<EditChannel setIsEditing={setIsEditing} />
			</div>
		);
	}

	function EmptyState() {
		return (
			<div>
				<p>This is the beginning of the chat history</p>
				<p>Send messages,attachments,links,images and more</p>
			</div>
		);
	}

	return (
		<div>
			<Channel
				EmptyStateIndicator={EmptyState}
				// Message={(messageProps, i) => <MessageText key={i} {...messageProps}/>}
			>
			<MessageList />
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
}

export default ChannelContainer;

// import React from 'react';
// import { ChannelList, useChatContext } from 'stream-chat-react';
// import ChannelSearch from './ChannelSearch';
// import TeamChannelList from './TeamChannelList';
// import TeamChannelPreview from './TeamChannelPreview';

// function Sidebar() {
// 	return <div>Sidebar</div>;
// }
// function Header() {
// 	return <div>Header</div>;
// }
// function ChannelContainer() {
// 	return (
// 		<>
// 			<Sidebar />
// 			<div>
// 				<Header />
// 				<ChannelSearch />
// 				<ChannelList
// 					filters={{}}
// 					channelRenderFilterFn={() => {}}
// 					List={(listProps) => (
// 						<TeamChannelList {...listProps} type='team' />
// 					)}
// 					Preview={(previewProps) => (
// 						<TeamChannelPreview {...previewProps} type='team' />
// 					)}
// 				/>
// 			</div>
// 		</>
// 	);
// }

// export default ChannelContainer;

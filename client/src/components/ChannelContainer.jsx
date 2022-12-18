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
			<CreateChannel
				createType={createType}
				setIsCreating={setIsCreating}
			/>
		);
	}
	if (isEditing) {
		return <EditChannel setIsEditing={setIsEditing} />;
	}

	function EmptyState() {
		return (
			<div className='m-4'>
				<h3 className='text-xl'>
					This is the beginning of the chat history
				</h3>
				<p className='text-white/50'>
					Send messages,attachments,links,images and more
				</p>
			</div>
		);
	}

	return (
		<div className='col-span-4'>
			<Channel
				EmptyStateIndicator={EmptyState}
				
			>
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
}

export default ChannelContainer;


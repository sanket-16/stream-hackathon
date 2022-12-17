import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { TbLogout } from 'react-icons/tb';
import { IoPersonCircleSharp } from 'react-icons/io5';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';

const cookies = new Cookies();
const userId = cookies.get('userId');
const name = cookies.get('username');
const image = cookies.get('avatarURL');
console.log(image);
const Navbar = ({ logout }) => (
	<div className='flex justify-between items-center px-4'>
		<div>
			<h1 className='text-primary'>Devcord </h1>
		</div>
		<div className=' p-2 rounded-lg bg-secondary dropdown inline-block relative m-2'>
			<div className='p-2 rounded inline-flex items-center'>
				{image !== undefined ? (
					<img src={image} alt='avatar' width={30} height={30} />
				) : (
					<IoPersonCircleSharp size={30} />
				)}
				{name}
			</div>
			<ul className='dropdown-menu absolute hidden'>
				<li
					className='flex px-4 py-2 rounded-b-lg bg-secondary w-full'
					onClick={logout}
				>
					<TbLogout size={30} /> Logout
				</li>
			</ul>
		</div>
	</div>
);

const ChannelListContainer = ({
	isCreating,
	setIsCreating,
	isEditing,
	setIsEditing,
	setCreateType,
}) => {
	const { client } = useChatContext();
	const filters = { members: { $in: [userId] } };
	const logout = () => {
		cookies.remove('token');
		cookies.remove('userId');
		cookies.remove('username');
		cookies.remove('fullName');
		cookies.remove('avatarURL');
		cookies.remove('hashedPassword');
		cookies.remove('phoneNumber');

		window.location.reload();
	};

	return (
		<div>
			<div>
				<Navbar logout={logout} />
				<ChannelSearch />
			</div>
			<div className='flex flex-col'>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={() => {}}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type='team'
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview {...previewProps} type='team' />
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={() => {}}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type='messaging'
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							type='messaging'
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default ChannelListContainer;

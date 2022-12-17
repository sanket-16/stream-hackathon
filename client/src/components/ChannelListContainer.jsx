import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { TbLogout } from 'react-icons/tb';
import { IoPersonCircleSharp } from 'react-icons/io5';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';
import { initialState } from 'stream-chat-react/dist/components/Channel/channelState';

const cookies = new Cookies();
const userId = cookies.get('userId');
const name = cookies.get('username');
const image = cookies.get('avatarURL');
console.log(image);

const Profile = ({ logout }) => {
	return (
		<div className='flex flex-col items-end justify-end h-full rounded-lg pb-4 '>
			<div className='p-2 '>
				{image !== undefined ? (
					<img
						className='rounded-full'
						src={image}
						alt='avatar'
						width={30}
						height={30}
					/>
				) : (
					<IoPersonCircleSharp size={30} />
				)}
			</div>
			<div className='flex items-center justify-center p-2'>
				<div
					className='flex items-center justify-center rounded-full bg-secondary p-2'
					onClick={logout}
				>
					<TbLogout size={20} />
				</div>
			</div>
		</div>
	);
};

const customChannelTeamFilter = (channels) => {
	return channels.filter((channel) => channel.type === 'team');
};
const customChannelMessagingFilter = (channels) => {
	return channels.filter((channel) => channel.type === 'messaging');
};

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
		<div className=' col-span-1 row-span-full grid grid-cols-2 grid-rows-6  '>
			<div className='col-span-2 row-span-1  '>
				<h1 className='text-primary w-full text-center font-bold py-5 '>Devcord </h1>
			</div>
			<div className='col-span-2  row-span-5 '>
				<div className='grid grid-cols-5 h-full'>
					<div className=' col-span-1 '>
						<Profile logout={logout} />
					</div>
					<div className='col-span-4 '>
						<div className='flex flex-col h-full mr-4'>
							<div className='mb-4'>
								<ChannelSearch />
							</div>

							<ChannelList
								filters={filters}
								channelRenderFilterFn={customChannelTeamFilter}
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
									<TeamChannelPreview
										{...previewProps}
										setIsCreating={setIsCreating}
										setIsEditing={setIsEditing}
										type='team'
									/>
								)}
							/>
							<ChannelList
								filters={filters}
								channelRenderFilterFn={
									customChannelMessagingFilter
								}
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
										setIsCreating={setIsCreating}
										setIsEditing={setIsEditing}
										type='messaging'
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
// const ChannelListContainer = ({setCreateType , setIsCreating , setIsEditing }) =>{
//       const [ toggleContainer , setToggleContainer] = useState(false)
// 	  return(
// 		<>
// 		<div>
// 			 <ChannelListContent

// 			  setIsCreating = {setIsCreating}
// 			  setIsEditing = {setIsEditing}
// 			  setCreateType = {setCreateType}
// 			 />
// 		</div>

// 		<div style={{left : toggleContainer ? "0%" : "-89%", backgroundColor:"black"}}>

// 			<div onClick={()=>
// 				setToggleContainer((prevToggleContainer)=> !prevToggleContainer)
// 			}>

// 			</div>
// 			<ChannelListContent

// 			  setIsCreating = {setIsCreating}
// 			  setIsEditing = {setIsEditing}
// 			  setCreateType = {setCreateType}
// 			  setToggleContainer={setToggleContainer}
// 			 />
// 		</div>
// 		</>
// 	  )
// }

export default ChannelListContainer;

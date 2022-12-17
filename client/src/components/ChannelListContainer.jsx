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
const Navbar = ({ logout }) => (
	<div className=''>
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

const customChannelTeamFilter = (channels)=>{
	return channels.filter((channel)=> channel.type === 'team');
}
const customChannelMessagingFilter = (channels)=>{
	return channels.filter((channel)=> channel.type === 'messaging');
}


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
		<div className=' col-span-1 '>
			<div>
				<Navbar logout={logout} />
				<ChannelSearch />
			</div>
			<div className='flex flex-col'>
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
						<TeamChannelPreview {...previewProps} 
						setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
						type='team' />
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={customChannelMessagingFilter}
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

import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';


const cookies = new Cookies();
const userId =  cookies.get('userId');

const SideBar = ({logout}) => (
	<div >
		<div >
			<div >
				Company logo
			</div>
		</div>
		<div >
			<div onClick={logout} >
				logout
			</div>
		</div>
	</div>
);

const CompanyHeader = () => (
	<div>
		<p >Stream </p>
	</div>
)



const ChannelListContainer = () => {
	const { client } = useChatContext();
	const filters = { members: { $in: [userId] }};
	const logout = () => {
			cookies.remove("token");
			cookies.remove('userId');
			cookies.remove('username');
			cookies.remove('fullName');
			cookies.remove('avatarURL');
			cookies.remove('hashedPassword');
			cookies.remove('phoneNumber');

			window.location.reload();
	}



	return (
		<>
			<SideBar logout={logout} />
			<div >
				<CompanyHeader />
				<ChannelSearch />
				<ChannelList
					filters={filters}
					channelRenderFilterFn={() => { }}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type="team"

						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}

							type="team"
						/>
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={() => { }}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type="messaging"

						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}

							type="messaging"
						/>
					)}
				/>
			</div>
		</>
	);
}


export default ChannelListContainer;
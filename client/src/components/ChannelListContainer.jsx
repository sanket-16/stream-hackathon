import React from 'react';
import { ChannelList } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';


const cookies = new Cookies();

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
					filters={{}}
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
					filters={{}}
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
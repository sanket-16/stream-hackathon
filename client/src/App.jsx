import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/index.css';
import '@stream-io/stream-chat-css/dist/css/index.css';
import ChannelContainer from './components/ChannelContainer';
import ChannelListContainer from './components/ChannelListContainer';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const cookies = new Cookies();
const apiKey = import.meta.env.VITE_API_KEY;
const authToken = cookies.get('token');
const client = StreamChat.getInstance(apiKey);
console.log(cookies,apiKey,authToken,client)
if (authToken) {
	client.connectUser(
		{
			id: cookies.get('userId'),
			name: cookies.get('username'),
			fullName: cookies.get('fullName'),
			image: cookies.get('avatarURL'),
			hashedPassword: cookies.get('hashedPassword'),
			phoneNumber: cookies.get('phoneNumber'),
		},
		authToken
	);
}
const App = () => {
	const [createType, setCreateType] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	if (!authToken) return <Auth />;
	return (
		<div className='h-screen'>
			<Chat client={client} theme='team dark'>
				<div className='grid grid-cols-4'>
				<ChannelListContainer
					isCreating = {isCreating}
					setIsCreating = {setIsCreating}
					isEditing = {isEditing}
					setIsEditing = {setIsEditing}
					setCreateType = {setCreateType}
				/>
				<ChannelContainer 
					isCreating = {isCreating}
					setIsCreating = {setIsCreating}
					isEditing = {isEditing}
					setIsEditing = {setIsEditing}
					createType = {createType}
					setCreateType = {setCreateType}
				/>
				</div>
			</Chat>
		</div>
	);
};

export default App;

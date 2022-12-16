import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import ChannelContainer from './components/ChannelContainer';
import ChannelListContainer from './components/ChannelListContainer';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const apiKey = import.meta.env.VITE_API_KEY;
const authToken = cookies.get('token');
const client = StreamChat.getInstance(apiKey);

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
	if (!authToken) return <Auth />;
	return (
		<div>
			<Chat client={client} theme='team dark'>
				<ChannelListContainer />
				<ChannelContainer />
			</Chat>
		</div>
	);
};

export default App;

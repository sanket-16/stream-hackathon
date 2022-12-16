import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import ChannelContainer from './components/ChannelContainer';
import ChannelListContainer from './components/ChannelListContainer';

const apiKey = import.meta.env.VITE_API_KEY 

const client = StreamChat.getInstance(apiKey);
const App = () => {
	return (
		<Chat client={client} theme='team dark'>
			<ChannelListContainer />
			<ChannelContainer />
		</Chat>
	);
};

export default App;

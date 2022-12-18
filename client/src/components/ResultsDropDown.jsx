import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
  
  setChannel(newChannel)

  return setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel, setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel)
          if(setToggleContainer) {
            setToggleContainer((prevState) => !prevState)   
          }
        }}
        className={focusedId === channel.id ? 'hover:scale-100' : 'hover:scale-100 ' }
      >
        <div className='  items-center'>
        <p className='bg-background rounded-lg  px-4 py-2 hover:bg-primary   '> {channel.data.name}</p>
        </div>
       
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel })
        if(setToggleContainer) {
            setToggleContainer((prevState) => !prevState)   
        }
      }}
      className={focusedId === channel.id ? ' hover:scale-100 ' : ' hover:scale-100 channel-search__result-container' }
    >
      <div className='flex items-center my-2  '>
      <div className='flex bg-background rounded-lg  px-4 py-2  w-full hover:bg-primary '>
      <Avatar  image={channel.image || undefined} name={channel.name} size={24} />
        <p className='text-xl ml-2   '>{channel.name}</p>
      </div>
       
      </div>
    </div>
  );
};

const ResultsDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

  return (
    <div className='relative'>
      <div className=' absolute bg-secondary w-full p-4 rounded-b-xl drop-shadow-xl '>
      <p className='font-semibold text-2xl mt-4 mb-3'>Channels</p>
      {loading && !teamChannels.length && (
        <p className=''>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className=''>
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p className='font-semibold text-2xl'>Users</p>
      {loading && !directChannels.length && (
        <p className=''>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className=''>
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
    </div>
  );
};

export default ResultsDropdown;
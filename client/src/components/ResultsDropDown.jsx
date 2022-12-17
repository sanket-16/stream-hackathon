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
        className={focusedId === channel.id ? 'hover:scale-100' : 'hover:scale-100 channel-search__result-container' }
      >
        <div className=' px-4 items-center'>
        <p className='bg-[#494949] rounded-md h-8 font-bold pl-5   '># {channel.data.name}</p>
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
      <div className='flex items-center gap-y-2 mt-2 px-4       '>
      <div className='bg-[#494949] flex rounded-md p-4 w-full'>
      <Avatar  image={channel.image || undefined} name={channel.name} size={24} />
        <p className='text-xl ml-2 '>{channel.name}</p>
      </div>
       
      </div>
    </div>
  );
};

const ResultsDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

  return (
    <div className='channel-search__results'>
      <p className='font-semibold text-2xl mt-4 mb-3'>Channels</p>
      {loading && !teamChannels.length && (
        <p className='channel-search__results-header'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className='channel-search__results-header'>
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
        <p className='channel-search__results-header'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className='channel-search__res ults-header'>
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
  );
};

export default ResultsDropdown;
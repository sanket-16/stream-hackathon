import React from 'react';

function TeamChannelList({ children, error = false, loading, type }) {
    if(error) {
        return <div><h1>Connection Error , Please wait and try again in a moment</h1></div>
    }
    if(loading) {
        return <div><h1>Loading...</h1></div>
    }
	return (
        <div>
            <div>
                <p>
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                {/* button */}
            </div>
            {children}
        </div>
    );
}

export default TeamChannelList;

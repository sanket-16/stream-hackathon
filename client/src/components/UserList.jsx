import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { TiTickOutline } from 'react-icons/ti';
import { BsCircle } from 'react-icons/bs';

const ListContainer = ({ children }) => {
	return (
		<div>
			<div>
				<h3 className='text-xl'>Invite User</h3>
			</div>
			<div className='grid grid-cols-4 m-4 gap-4'>{children}</div>
		</div>
	);
};

const UserItem = ({ user, setSelectedUsers }) => {
	const [selected, setSelected] = useState(false);

	const handleSelect = () => {
		if (selected) {
			setSelectedUsers((prevUsers) =>
				prevUsers.filter((prevUser) => prevUser !== user.id)
			);
		} else {
			setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
		}

		setSelected((prevSelected) => !prevSelected);
	};

	return (
		<div className='bg-secondary rounded-lg m-2 p-2' onClick={handleSelect}>
			<div className='flex items-center justify-between m-2'>
				<div className='flex items-center'>
                <Avatar
					image={user.image}
					name={user.fullName || user.id}
					size={32}
				/>
			<p>{user.name || user.fullName || user.id}</p>
                </div>
				{selected ? <TiTickOutline color='white' /> : <BsCircle />}
			</div>
		</div>
	);
};

function UserList({ setSelectedUsers }) {
	const { client } = useChatContext();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [listEmpty, setListEmpty] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			if (loading) return;

			setLoading(true);

			try {
				const response = await client.queryUsers(
					{ id: { $ne: client.userID } },
					{ id: 1 },
					{ limit: 8 }
				);

				if (response.users.length) {
					setUsers(response.users);
				} else {
					setListEmpty(true);
				}
			} catch (error) {
				setError(true);
			}
			setLoading(false);
		};

		if (client) getUsers();
	}, []);

	if (error) {
		return (
			<ListContainer>
				<div>Error loading, please refresh and try again.</div>
			</ListContainer>
		);
	}

	if (listEmpty) {
		return (
			<ListContainer>
				<div>No users found.</div>
			</ListContainer>
		);
	}

	return (
		<div className=''>
			<ListContainer>
				{loading ? (
					<div>Loading users...</div>
				) : (
					users?.map((user, i) => (
						<UserItem
							index={i}
							key={user.id}
							user={user}
							setSelectedUsers={setSelectedUsers}
						/>
					))
				)}
			</ListContainer>
		</div>
	);
}
export default UserList;

import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs'





const ListContainer = ({ children }) => {
    return (
        <div >
            <div className='grid grid-cols-2 text-xl border-b-2 text-center' >
                <p>User</p>
                <p className=''>Invite</p>
            </div>
            {children}
        </div>
    )
}



const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        // <div className='grid grid-cols-2 text-center space-x-8  '  onClick={handleSelect}>
        //     <div className='flex overflow-hidden mt-5' >
        //         <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        //         <p >{user.name || user.fullNameu || user.id}</p>
        //     </div>
        //     <span className='mt-5 px-10'>
        //     {selected ? <BsFillCheckCircleFill size={30} color="#45AD17" /> : <BsCircle size={30}/>}

        //     </span>
        // </div>

        <div  onClick={handleSelect}>
            <div className=' overflow-hidden  bg-[#494949] flex items-start  mt-5 rounded-md justify-between px-2 py-3   '>
                <div className=' items-center' >
                    <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                    <p >{user.name || user.fullNameu || user.id}</p>
                </div>

                <span className=''>
                    {selected ? <BsFillCheckCircleFill size={20} color="#45AD17" /> : <BsCircle size={20} />}

                </span>
            </div>

        </div>
    )
}



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
        }

        if (client) getUsers()
    }, []);

    if (error) {
        return (
            <ListContainer>
                <div >
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <div >
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div >
                Loading users...
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    )
}
export default UserList;
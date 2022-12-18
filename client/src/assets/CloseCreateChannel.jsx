import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
function CloseCreateChannel({ setIsCreating, setIsEditing }) {
    return (
        <>
        
            <AiOutlineClose
                size={30}
                className="bg-red-600 rounded-sm hover:scale-105 hover:bg-red-400 duration-300"
                onClick={() => {
                    if (setIsCreating) setIsCreating(false);
                    if (setIsEditing) setIsEditing(false);
                }}
            />
        </>
    )
}

export default CloseCreateChannel;

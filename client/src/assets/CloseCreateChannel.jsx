import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
function CloseCreateChannel({ setIsCreating, setIsEditing }) {
    return (
        <>
        
            <AiOutlineClose
                size={30}
                className="bg-red-500 rounded-sm"
                onClick={() => {
                    if (setIsCreating) setIsCreating(false);
                    if (setIsEditing) setIsEditing(false);
                }}
            />
        </>
    )
}

export default CloseCreateChannel;

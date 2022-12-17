import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
function CloseCreateChannel({ setIsCreating, setIsEditing }) {
    return (
        <>
            <AiOutlineClose
                size={30}
                onClick={() => {
                    if (setIsCreating) setIsCreating(false);
                    if (setIsEditing) setIsEditing(false);
                }}
            />
        </>
    )
}

export default CloseCreateChannel;

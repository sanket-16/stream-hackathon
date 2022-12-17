import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
function CloseCreateChannel({ setIsCreating, setIsEditing }) {
    return (
        <>
            <AiOutlineClose
                onClick={() => {
                    if (setIsCreating) setIsCreating(false);
                    if (setIsEditing) setIsEditing(false);
                }}
            />
        </>
    )
}

export default CloseCreateChannel

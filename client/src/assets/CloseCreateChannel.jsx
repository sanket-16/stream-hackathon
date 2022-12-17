import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
function CloseCreateChannel({ setIsCreating, setIsEditing }) {
    return (
        <>
            <AiOutlineClose
            className=' hover:scale-110  '
            size={25}
                onClick={() => {
                    if (setIsCreating) setIsCreating(false);
                    if (setIsEditing) setIsEditing(false);
                }}
            />
        </>
    )
}

export default CloseCreateChannel;

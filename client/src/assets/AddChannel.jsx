import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
function AddChannel({setCreateType,setIsCreating,setIsEditing,setToggleContainer,type}) {
    return (
        <>
            <AiOutlinePlus
                onClick={() => {
                    setCreateType(type);
                    setIsCreating((prevState) => !prevState);
                    setIsEditing(false);
                    if (setToggleContainer) setToggleContainer((prevState) => !prevState)
                }}
            />
        </>
    )
}

export default AddChannel

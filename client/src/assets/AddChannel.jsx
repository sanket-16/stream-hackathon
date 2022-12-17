import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
function AddChannel({setCreateType,setIsCreating,setIsEditing,setToggleContainer,type}) {
    return (
        <>
        <div className='mr-5'>

       
            <AiOutlinePlus size={15}
                onClick={() => {
                    setCreateType(type);
                    setIsCreating((prevState) => !prevState);
                    setIsEditing(false);
                    if (setToggleContainer) setToggleContainer((prevState) => !prevState)
                }}
            />
             </div>
        </>
    )
}

export default AddChannel

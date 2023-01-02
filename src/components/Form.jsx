import { CreateButton } from 'components';
import React, { useState } from 'react';

const Form = ( props ) => {
    const [inputValue, setInputValue] = useState("");
    const isEmpty = inputValue === "";

    const handleChange = ( event ) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = () => {
        props.onSubmit(inputValue);
        setInputValue("");
    }

    return (
        <div className='py-5 w-full flex flex-row justify-center mt-5'>
            <input type='text' className='input-primary mr-5 basis-1/2' placeholder="What will you do today?" onChange={handleChange} value={inputValue} />
            {/* <button className='button button-primary' disabled={isEmpty} onClick={handleSubmit}>Add</button> */}
            <CreateButton text="Add" onClick={handleSubmit} disabled={isEmpty} />
        </div>
    )
}

export default Form
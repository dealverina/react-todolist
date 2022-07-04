import React, { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

export const ListItem = ( props ) => {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(props.title)

    useEffect(() => {
        setValue(props.title)
    }, [props.title]) //Update props.title when there's a change
    

    return (
        <div className={`2xl:w-1/2 xl:w-1/2 lg:w-1/2 w-full flex lg:flex-row flex-col py-4 px-10 bg-slate-50 hover:bg-slate-200 hover:${isEdit ? 'cursor-pointer' : 'cursor-grab'} transition duration-300 rounded-md`} 
            draggable={isEdit ? false : true} 
            onDragStart={props.onDragStart}
            onDrop={props.onDrop}
            onDragOver={(event) => event.preventDefault()}>
                {isEdit ? <ReactTextareaAutosize className='input-primary w-full mr-5' value={value} onChange={(e) => {
                    setValue(e.target.value)
                }} /> : <span className='flex-1 flex items-center w-full pr-5'>
                    <p className='hover:cursor-text' onClick={() => {
                        setIsEdit(true)
                    }}>{props.title}</p>
                </span>}
                {isEdit ? 
                <div className='flex lg:flex-col sm:flex-row'>
                    <button className='button button-save h-10 mr-5 mt-5 w-32 lg:mt-0 lg:w-auto' onClick={() => {
                        props.onSave(props.id, value)
                        setIsEdit(false)
                    }}>Save</button>
                    <button className='button button-delete h-10 w-32 mt-5 lg:w-auto' onClick={() => {
                        setIsEdit(false)
                    }}>Cancel</button>
                </div> : 
                <button className='button button-delete h-10 mt-5 w-32 lg:mt-0 lg:w-auto' onClick={() => {
                    props.onDelete(props.id)
                }}>Delete</button>}
                
        </div>
    )
}

const List = ( props ) => {
    const [dragItem, setDragItem] = useState(null);
    const isEmpty = props.items.length === 0
    const listItems = props.items.map((item, index) => (
        <ListItem 
            key={index} 
            title={item.title} 
            id={item.id} 
            onDelete={props.onDelete} 
            onSave={props.onSave}
            onDragStart={() => setDragItem(item)}
            onDrop={() => props.onSwap(dragItem, item)} />
    ));

    return (
        <div className='w-full flex flex-col items-center space-y-5 mt-5'>
            {isEmpty ? <div><p>You have no activity to do.</p></div> : listItems}
        </div>
    )
}

export default List
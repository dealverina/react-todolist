import React, { useState } from 'react';

export const ListItem = ( props ) => {
    return (
        <div className='w-1/2 flex flex-row py-4 px-10 bg-slate-50 hover:bg-slate-200 hover:cursor-grab transition duration-300 rounded-md' 
            draggable 
            onDragStart={props.onDragStart}
            onDrop={props.onDrop}
            onDragOver={(event) => event.preventDefault()}>
                <span className='flex-1 h-10 flex items-center w-full pr-5'>
                    <p className='w-full'>{props.title}</p>
                </span>
                <button className='button button-delete' onClick={() => {
                    console.log(props.id)
                    props.onDelete(props.id)
                }}>Delete</button>
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
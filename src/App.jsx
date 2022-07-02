import { useEffect, useState } from 'react';
import { Form, List } from './components';

function App() {
	const [items, setItems] = useState(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [])

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	const addItem = (title) => {
		const newItem = { title: title, id: items.length > 0 ? items[items.length - 1].id + 1 : 1 };
		setItems([...items, newItem])
	}

	const deleteItem = (targetId) => {
		const newItems = items.filter((item) => item.id !== targetId);
		setItems(newItems);
	}
	
	const swapItem = (firstItem, secondItem) => {
		const newItems = items.map((item) =>
		  item.id === firstItem.id
			? secondItem
			: item.id === secondItem.id
			? firstItem
			: item
		);
		console.log(newItems)
		setItems(newItems);
	}
	
	return (
		<div className="container m-auto flex flex-col items-center">
			<h1 className="text-3xl font-medium mt-10">Todo List</h1>
			<Form onSubmit={addItem} />
			<List items={items} onDelete={deleteItem} onSwap={swapItem} />
		</div>
	);
}

export default App;

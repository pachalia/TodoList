// import styles from './app.module.css';
import Todo from './components/Todo/todo.tsx';
import AddTodoForm from './components/Todo/addTodoForm.tsx';
import FindForm from './components/Todo/findForm.tsx';
import { useEffect, useState } from 'react';
import { TodoService } from './services/todo.service.ts';
import { ITodo } from './interfaces/interfaces.ts';


const App: React.FC = () => {

	const [todo, setTodo] = useState<ITodo[]>([])
	const [isFindTodo, setIsFindTodo] = useState<boolean>(false)

	const handleStatus = (id:string) => {
		TodoService.updateStatus(id).then(async () => {
			const newTodos =await TodoService.getTodos()
			setTodo(newTodos)
		})
	}

	const handleDelete = (id:string) => {
		TodoService.deleteTodo(id).then((res) => {
			if(res){
				const newTodo = todo.filter((val) => val.id != id)
				setTodo(newTodo)
			}
		})
	}

	useEffect(() => {
		console.log(1)
		!isFindTodo ? TodoService.getTodos().then((res) => setTodo(res)): null
	}, [isFindTodo]);

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Todo List</h1>
			<h3 style={{ textAlign: 'center' }}>Чтобы изменить статус todo кликните на заголовке todo </h3>
			<FindForm setIsFindTodo={setIsFindTodo} setTodo={setTodo}/>
			<Todo todo={todo} handleStatus={handleStatus} handleDelete={handleDelete}/>
			{!isFindTodo && <AddTodoForm setTodo={setTodo}/>}
		</>
	);
};

export default App;

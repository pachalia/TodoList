// import styles from './app.module.css';
import Todo from './components/Todo/todo.tsx';
import AddTodoForm, { IAddFormValue } from './components/AddTodoForm/addTodoForm.tsx';
import FindForm from './components/FindForm/findForm.tsx';
import { useEffect, useState } from 'react';
import { TodoService } from './services/todo.service.ts';
import { ITodo } from './interfaces/interfaces.ts';
import TodoDescriptionEdit from './components/TodoDescriptionEdit/todoDescriptionEdit.tsx';


const App: React.FC = () => {

	const [todo, setTodo] = useState<ITodo[]>([])
	const [isFindTodo, setIsFindTodo] = useState<boolean>(false)
	const [descriptionEdit, setDescriptionEdit] = useState<Pick<ITodo, 'id' | 'title' | 'description'> | null>(null)

	const handleStatus = (id:string) => {
		TodoService.updateStatus(id).then(async (res) => {
			const todos = todo
			const index = todos.findIndex((val) =>val.id ===res.id)
			todos[index] = res
			setTodo(() => [...todos])
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

	const handleAdd = (data:IAddFormValue) => {
		TodoService.addTodo(data).then( (newTodo) =>{
			const newTodos = [newTodo, ...todo]
			setTodo(newTodos)
		})
	}

	const handleDescription = (id: string, title: string,description:string)=> {
		setDescriptionEdit({id, title, description})
	}

	const handleDescriptionSubmit = ({description}:Pick<ITodo, 'description'>) =>{
		if (descriptionEdit!.description ===description) {
			setDescriptionEdit(null)
		}else{
			TodoService.updateTodoDescription(descriptionEdit!.id,description).then((res) =>{
				const todos = todo
				const index = todos.findIndex((val) =>val.id===res.id)
				todos[index] ={...res}
				setTodo(() =>[...todos])
				setDescriptionEdit(null)
			})
		}
	}


	useEffect(() => {
		!isFindTodo ? TodoService.getTodos().then((res) => setTodo(res)): null
	}, [isFindTodo, descriptionEdit]);

	return (
		<>
		{!descriptionEdit ? <h1 style={{ textAlign: 'center' }}>Todo List</h1> : <h1 style={{textAlign: 'center'}}>Редактирование Todo description</h1>}
		{!descriptionEdit && <h3 style={{ textAlign: 'center' }}>Чтобы изменить статус todo кликните на заголовке todo </h3>}
			{!descriptionEdit && <FindForm setIsFindTodo={setIsFindTodo} setTodo={setTodo}/>}
			{!descriptionEdit && <Todo todo={todo} handleStatus={handleStatus} handleDelete={handleDelete} handleDescription={handleDescription}/>}
			{!isFindTodo && !descriptionEdit && <AddTodoForm onSubmit={handleAdd}/>}
			{descriptionEdit &&
				<TodoDescriptionEdit
				description={descriptionEdit.description}
				title={descriptionEdit.title}
				onSubmit={handleDescriptionSubmit}/>}
		</>
	);
};

export default App;

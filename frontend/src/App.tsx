import { Todos, AddTodoForm, FindForm, FindFormValue } from './components';
import { useTodos } from './hooks/use-todos.ts';
import { useState } from 'react';
import { ITodo } from './interfaces/interfaces.ts';
import { TodoService } from './services/todo.service.ts';

export const App: React.FC = () => {
	const { handleDelete, updateTodo, todos, handleAdd } = useTodos();

	const [isFind, setIsFind] = useState<boolean>(false);
	const [findTodo, setFindTodo] = useState<ITodo[]>([]);

	const handleFindTodo = (data: FindFormValue) => {
		TodoService.findTodo(data.todo).then((res) => {
			setFindTodo(() => [...res]);
			setIsFind(true);
		});
	};

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Todo List</h1>
			<h3 style={{ textAlign: 'center' }}>
				Чтобы изменить статус todo кликните на заголовке todo
			</h3>
			<FindForm onSubmit={handleFindTodo} setIsFind={setIsFind} />
			<Todos
				handleDelete={handleDelete}
				handleUpdate={updateTodo}
				todos={isFind ? findTodo : todos}
			/>
			{!isFind && <AddTodoForm onSubmit={handleAdd} />}
		</>
	);
};

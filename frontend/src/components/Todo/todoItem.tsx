import { useState } from 'react';
import { ITodo } from '../../interfaces/interfaces.ts';

interface ITodoItemProps {
	val: ITodo;
	index: number;
	handleDelete: () => void;
	updateTodo: (params: Partial<ITodo>) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = ({
	val,
	index,
	handleDelete,
	updateTodo,
}) => {
	const [initialTodo, setInitialTodo] = useState(() => val);
	const [isEditing, setIsEditing] = useState(false);

	const handleUpdate = async () => {
		if (!initialTodo.description) return;
		updateTodo({ id: initialTodo.id, description: initialTodo.description });
		setIsEditing(false);
	};

	const handleStatus = async () => {
		updateTodo({ id: initialTodo.id, status: initialTodo.status });
		setInitialTodo({ ...initialTodo, status: !initialTodo.status });
	};

	return (
		<tr>
			<td className={initialTodo.status ? 'status' : undefined}>{index + 1}</td>
			<td
				className={initialTodo.status ? 'status' : undefined}
				onClick={handleStatus}
				style={{ cursor: 'pointer', width: '20%' }}
			>
				{val.title}
			</td>
			<td
				className={initialTodo.status ? 'status' : undefined}
				style={{ width: '40%' }}
			>
				{isEditing ? (
					<input
						value={initialTodo.description}
						onChange={(e) =>
							setInitialTodo((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
					/>
				) : (
					initialTodo.description
				)}
				<button onClick={!isEditing ? () => setIsEditing(true) : handleUpdate}>
					{isEditing ? 'Сохранить' : 'Редактировать'}
				</button>
			</td>
			<td className={initialTodo.status ? 'status' : undefined}>
				{initialTodo.status ? 'Выполнен' : 'Не выполнен'}
			</td>
			<td className={initialTodo.status ? 'status' : undefined}>
				{new Date(initialTodo.createdAt).toLocaleDateString('ru', {
					day: 'numeric',
					month: 'numeric',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				})}
			</td>
			<td
				className={initialTodo.status ? 'status' : undefined}
				onClick={handleDelete}
				style={{ cursor: 'pointer' }}
			>
				Удалить
			</td>
		</tr>
	);
};

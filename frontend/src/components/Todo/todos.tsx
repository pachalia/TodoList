import './todos.css';
import { TodoItem } from './todoItem.tsx';
import { ITodo } from '../../interfaces/interfaces.ts';

const lineTable = [
	'№',
	'Заголовок Todo',
	'Описание',
	'Статус',
	'Дата создания',
	'Удалить',
];

interface ITodosProps {
	handleDelete: (id: string) => void;
	handleUpdate: (data: Partial<ITodo>) => void;
	todos: ITodo[];
}

export const Todos: React.FC<ITodosProps> = ({ handleUpdate, handleDelete, todos }) => {
	return (
		<>
			{todos.length !== 0 && (
				<table style={{ width: '90%', margin: '0 auto', marginBottom: 40 }}>
					<thead>
						<tr>
							{lineTable.map((val, i) => (
								<th
									style={{
										border: '1px solid black',
										width: i === 1 ? '30%' : 'inherit',
									}}
									key={i}
								>
									{val}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{todos.map((val, i) => (
							<TodoItem
								key={val.id}
								val={val}
								index={i}
								handleDelete={() => handleDelete(val.id)}
								updateTodo={handleUpdate}
							/>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

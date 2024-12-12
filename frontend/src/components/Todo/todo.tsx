import './todo.css';
import {ITodoProps } from '../../interfaces/interfaces.ts';

const Todo:React.FC<ITodoProps> = ({todo, handleStatus, handleDelete}) => {

	const lineTable = ['№', 'Заголовок Todo', 'Описание', 'Статус', 'Дата создания', 'Удалить']


	return (
		<>
			{todo.length !==0 &&
				<table style={{width: '90%', margin: '0 auto', marginBottom: 40}}>
					<thead>
					<tr>{lineTable.map((val,i)=>
						<th
							style={{border: '1px solid black', width: i===1 ? '30%': 'inherit'}}
							key={i}>{val}
						</th>
					)}
					</tr>
					</thead>
					<tbody>
					{todo.map((val,i) =>
						<tr key={i}>
							<td className={val.status ? "status" : undefined}>{i+1}</td>
							<td className={val.status ? "status" : undefined}
								onClick={()=> handleStatus(val.id)}
								style={{cursor: 'pointer', width: '20%'}}>{val.title}
							</td>
							<td className={val.status ? "status" : undefined} style={{width:'40%'}}>{val.description}</td>
							<td className={val.status ? "status" : undefined}>{val.status ? 'Выполнен' : 'Не выполнен'}</td>
							<td className={val.status ? "status" : undefined}>{new Date(val.createdAt).toLocaleDateString('ru',{
								day:"numeric",
								month: "numeric",
								year: "numeric",
								hour:"2-digit",
								minute:"2-digit"
							})}</td>
							<td className={val.status ? "status" : undefined}
								onClick={()=>handleDelete(val.id)}
								style={{cursor: 'pointer'}}>Удалить</td>
						</tr>)}
					</tbody>
				</table>
			}
		</>
	)
}

export default Todo

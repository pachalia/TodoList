import { TodoService } from '../../services/todo.service.ts';
import { useController, useForm } from 'react-hook-form';
import { IProps } from '../../interfaces/interfaces.ts';
import { useEffect } from 'react';


type FindFormValue = {
	todo: string
}

interface IFindTodosProps extends Pick<IProps, 'setIsFindTodo' | 'setTodo'>{}

const FindForm: React.FC<IFindTodosProps> = ({setTodo, setIsFindTodo}) => {

	const {control, handleSubmit,formState:{isValid}} = useForm<FindFormValue>({mode: 'onChange'})

	const { field } = useController({
		name: 'todo',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно'
		}
	});



	const onSubmit = (data:FindFormValue) => {
		setIsFindTodo(true)
		TodoService.findTodo(data.todo).then((res) => setTodo(res))
	}

	useEffect(() => {
		setIsFindTodo(false)
	}, [isValid]);

	return <>
		<form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', justifyContent: 'center'}}>
			<input {...field} type="text" />
			<button type={'submit'} disabled={!isValid}>Искать</button>
		</form>
	</>
}

export default FindForm

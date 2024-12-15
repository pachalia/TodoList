import { ITodo } from '../../interfaces/interfaces.ts';
import './todoDescriptionEdit.css';
import { SubmitHandler, useController, useForm } from 'react-hook-form';

interface ITodoDescriptionEditProps extends Pick<ITodo, 'title' | 'description'>{
	onSubmit:  SubmitHandler<Pick<ITodo, 'description'>>
}

const TodoDescriptionEdit:React.FC<ITodoDescriptionEditProps> = ({title,description, onSubmit}) =>{


	const {control, handleSubmit,formState:{isValid}} = useForm<Pick<ITodo, 'description' | 'id'>>({mode: 'onChange'})

	const { field } = useController({
		name: 'description',
		control,
		defaultValue: description,
		rules: {
			required: 'Поле обязательно'
		}
	});


	return <>
		<div className={'modal'}>
			<h1 style={{textAlign: 'center'}}>{title}</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={'form'}>
				<input className={'input'} placeholder={'description'} {...field}/>
				<div className={'button'}>
					<button type={'submit'} disabled={!isValid}>Отправить</button>
					<button type={'button'}>Отмена</button>
				</div>
			</form>
		</div>
	</>
}

export default TodoDescriptionEdit

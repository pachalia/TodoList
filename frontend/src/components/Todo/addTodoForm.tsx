import { useController, UseControllerProps, useForm } from 'react-hook-form';
import { TodoService } from '../../services/todo.service.ts';
import { IAddFormProps, IAddFormValue } from '../../interfaces/interfaces.ts';



const Input = (props:UseControllerProps<IAddFormValue>) => {
	const {field} = useController(props)
	return (
		<div style={{width:"100%"}}>
			<input {...field} placeholder={props.name === "title" ? "Введите заголовок Todo": "Введите описание Todo"} style={{width:"100%", padding:"10px 0", marginBottom:20}} />
		</div>
	)
}

const AddTodoForm:React.FC<IAddFormProps> = ({setTodo}) => {

	const {control, handleSubmit,reset,formState:{isValid}} = useForm<IAddFormValue>({
		defaultValues:{title: "", description:""},
	})
	const onSubmit = (data:IAddFormValue) => {
		TodoService.addTodo(data).then(async () =>{
			const newTodos =await TodoService.getTodos()
			setTodo(newTodos)
		})
		reset()
	}
	return <>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div style={{ display: "flex", width: '60%', margin: '0 auto', flexDirection: 'column' }}>
				<label htmlFor="Title"> Поле обязательно для заполнения</label>
				<Input control={control} name={"title"} rules={{ required: true }} />
				<label htmlFor="Description"> Поле обязательно для заполнения</label>
				<Input control={control} name="description" rules={{ required: true }} />
				<button disabled={!isValid} type={"submit"}
						style={{ cursor: "pointer", width: '30%', margin: '0 auto', padding: '5px 0' }}>Добавить
				</button>
			</div>
		</form>
	</>
}

export default AddTodoForm

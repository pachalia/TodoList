export interface ITodo {
	id: string
	title:string
	description: string
	status: boolean
	createdAt:string
}

export interface IAddFormValue  {
	title: string,
	description:string
}

export interface IProps  {
	todo: ITodo[]
	setTodo: React.Dispatch<React.SetStateAction<ITodo[]>>
	setIsFindTodo: React.Dispatch<React.SetStateAction<boolean>>
	handleStatus: Function
	handleDelete: Function
}

export interface IAddFormProps {
	setTodo: React.Dispatch<React.SetStateAction<ITodo[]>>
}

export interface ITodoProps extends Pick<IProps, 'todo' | 'handleStatus' | 'handleDelete'> {}
export interface IFindTodosProps extends Pick<IProps, 'setIsFindTodo' | 'setTodo'>{}

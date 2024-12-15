export interface ITodo {
	id: string
	title:string
	description: string
	status: boolean
	createdAt:string
}


export interface IProps  {
	todo: ITodo[]
	setTodo: React.Dispatch<React.SetStateAction<ITodo[]>>
	setIsFindTodo: React.Dispatch<React.SetStateAction<boolean>>
	handleStatus: Function
	handleDelete: Function
	handleDescription: Function
}

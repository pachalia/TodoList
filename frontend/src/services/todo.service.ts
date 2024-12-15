import axios from 'axios'

import { ITodo } from '../interfaces/interfaces.ts';
import { IAddFormValue } from '../components/AddTodoForm/addTodoForm.tsx';

const url = 'https://andreypachalia.ru/todoapi/api'


export class TodoService {
	static getTodos ():Promise<ITodo[]> {
		return axios.get<ITodo[]>(url).then((res)=> res.data)
	}

	static updateStatus (id:string):Promise<ITodo> {
		return axios.put(`${url}/${id}`).then((val) =>val.data)
	}

	static deleteTodo (id:string): Promise<boolean> {
		return axios.delete(`${url}/${id}`).then((val) => val.data)
	}

	static addTodo(todo:IAddFormValue) {
		return axios.post<ITodo>(url, todo).then((val) => val.data)
	}

	static findTodo(todo:string):Promise<ITodo[]> {
		return axios.get<ITodo[]>(`${url}/find?todo=${todo}`).then((val) =>val.data)
	}

	static updateTodoDescription (id: string, description:string):Promise<ITodo> {

		return axios.put(`${url}/description`, {id, description}).then((val) => val.data)
	}
}

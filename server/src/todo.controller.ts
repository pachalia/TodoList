import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';

interface CreateTodoDto {
  title: string;
  description:string
}

@Controller('api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('')
  getTodos () {
    return this.todoService.getTodos()
  }

  @Get('find')
  findTodo (@Query('todo')todo:string) {
    return this.todoService.findTodos(todo)
  }

  @Put(':id')
  updateTodo(@Param('id') id:string ){
    return this.todoService.update(id)
  }

  @Delete(':id')
  deleteTodo(@Param('id') id:string){
    return this.todoService.delete(id)
  }

  @Post()
  addTodo(@Body() {title, description}:CreateTodoDto) {
    return this.todoService.add(title, description)
  }
}

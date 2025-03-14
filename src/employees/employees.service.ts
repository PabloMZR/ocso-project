import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
    id: uuid(),
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "123456789"
    },
    {
    id: uuid(),
    name: "Jose",
    lastName: "Casas",
    phoneNumber: "213456789"
    },
    {
    id: uuid(),
    name: "Juan",
    lastName: "Perez",
    phoneNumber: "312456789"
    }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //hacer que retorne todos los empleados
    return this.employees;

  }

    findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    if (!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate = {
      ... employeeToUpdate,
      ... updateEmployeeDto
    }
    if (employeeToUpdate) throw new NotFoundException();
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        employee = employeeToUpdate;
      }
      return employee;
    })
    return employeeToUpdate;
  }
  //comenzamos aqui!
  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
  return this.employees;    
  }
}

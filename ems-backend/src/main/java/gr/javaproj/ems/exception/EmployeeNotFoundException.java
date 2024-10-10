package gr.javaproj.ems.exception;

import gr.javaproj.ems.model.Employee;

public class EmployeeNotFoundException extends Exception {

    public EmployeeNotFoundException (Class<Employee> employee) {
        System.out.println("Employee " + employee.getSimpleName() + " not found!");
    }
}

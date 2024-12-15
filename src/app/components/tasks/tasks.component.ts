import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
   mockTasks: any[] = [
    {
      id: 1,
      userId: 101,
      userName: 'Alice Johnson',
      status: 'Pending',
      createdAt: new Date('2024-12-01T10:00:00'),
    },
    {
      id: 2,
      userId: 102,
      userName: 'Bob Smith',
      status: 'Pending',
      createdAt: new Date('2024-12-02T14:30:00'),
    },
    {
      id: 3,
      userId: 103,
      userName: 'Charlie Brown',
      status: 'Pending',
      createdAt: new Date('2024-12-03T09:15:00'),
    },
    {
      id: 4,
      userId: 104,
      userName: 'Dana White',
      status: 'Pending',
      createdAt: new Date('2024-12-04T11:45:00'),
    },
    {
      id: 5,
      userId: 105,
      userName: 'Ethan Hunt',
      status: 'Pending',
      createdAt: new Date('2024-12-05T13:20:00'),
    },
  ];
  
  tasks: any = [];

  constructor(private  userService:UserService, private authService:AuthService) {}

  ngOnInit() {
    this.userService.getUserTasks(this.authService.getUserEmail()).subscribe((tasks) => {
      this.tasks = tasks;      
    });
  }

  updateTask(taskId: number, status: 'Approved' | 'Rejected') {
    // this.adminTaskService.updateTaskStatus(taskId, status);
  }



}

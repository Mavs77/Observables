import { Routes } from '@angular/router';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TasksComponent } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '', // <your-domain>/user/<uid>/''
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', // <your-domain>/user/<uid>/tasks
    component: TasksComponent,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];

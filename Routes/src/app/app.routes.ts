import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '', // <your-domain>
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <your-domain>/users/<userId>
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      resolve: {
        userName: resolveUserName,
      },
    },
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

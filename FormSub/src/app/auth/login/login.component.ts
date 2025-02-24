import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription, debounceTime, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedFrom = window.localStorage.getItem('saved-login-form');

      if (savedFrom) {
        const loadedFormData = JSON.parse(savedFrom);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }

      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(formData.form);
    console.log(`Email:${enteredEmail}, Password:${enteredPassword}`);

    formData.form.reset();
  }
}

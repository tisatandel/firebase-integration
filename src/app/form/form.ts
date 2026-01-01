import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Form as FormService } from './service/form'; 
 import { Student } from './interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form { 
  private fb = inject(FormBuilder);
  private formService = inject(FormService); 

  isLoading = signal(false);
  statusMessage = signal('');

  studentForm = this.fb.group({
    name: ['', [Validators.required]],
    rollNo: ['', Validators.required],
    course: ['', Validators.required]
  });

  async addStudent() {
    if (this.studentForm.valid) {
      this.isLoading.set(true);
      this.statusMessage.set('');

      
      const newStudent = this.studentForm.getRawValue() as Student;

      try {
        await this.formService.createStudent(newStudent);
        this.statusMessage.set('Student added successfully! ✅');
        this.studentForm.reset();
      } catch (error) {
        console.error("Firebase Error:", error);
        this.statusMessage.set('Error adding student. ❌');
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
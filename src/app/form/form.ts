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
    rollNo: ['', [Validators.required]],
    course: ['', [Validators.required]]
  });

  async addStudent() {
    if (this.studentForm.valid) {
      this.isLoading.set(true);
      
      const rawData = this.studentForm.getRawValue();

      // STRICT MAPPING: Sirf ye 3 fields hi jayengi
      const cleanStudentData: Student = {
        name: String(rawData.name),
        rollNo: String(rawData.rollNo),
        course: String(rawData.course)
      };

      try {
        await this.formService.createStudent(cleanStudentData);
        this.statusMessage.set('Student added successfully! ✅');
        this.studentForm.reset();
      } catch (error) {
        this.statusMessage.set('Error: Could not add student. ❌');
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
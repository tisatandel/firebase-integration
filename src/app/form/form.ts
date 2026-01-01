import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);

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
      try {
        const studentRef = collection(this.firestore, 'students');
        await addDoc(studentRef, this.studentForm.value);
        
        this.statusMessage.set('Student added successfully! ✅');
        this.studentForm.reset();
      } catch (error) {
        this.statusMessage.set('Error adding student. ❌');
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
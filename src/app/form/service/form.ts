import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Student } from './../interface';

@Injectable({
  providedIn: 'root'
})
export class Form { 
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private studentCollection = collection(this.firestore, 'students');

  async createStudent(student: Student) {
    return runInInjectionContext(this.injector, () => {
      // Sirf wahi data jayega jo component ne filter karke bheja hai
      return addDoc(this.studentCollection, student);
    });
  }
}
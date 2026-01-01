import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Student } from '../interface'; // Aapki interface file ka sahi path

@Injectable({
  providedIn: 'root'
})
export class Form { // Service class ka naam 'Form'
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private studentCollection = collection(this.firestore, 'students');

  async createStudent(student: Student) {
    // Ye wrapper warning ko aane se rokta hai
    return runInInjectionContext(this.injector, () => {
      return addDoc(this.studentCollection, student);
    });
  }
}
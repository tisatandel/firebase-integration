import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('firebase-integration');
  private firestore = inject(Firestore);

  connectionStatus = signal('Connecting...');
  isSuccess = signal(false);

  ngOnInit() {
    if (this.firestore) {
      this.connectionStatus.set('Firebase Connection Successful! ✅');
      this.isSuccess.set(true);
    }
  }

}

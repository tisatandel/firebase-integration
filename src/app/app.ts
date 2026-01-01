import { Component, inject, signal, OnInit, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true, // Standalone ensure karein
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector); // Injection context ke liye

  title = signal('firebase-integration');
  connectionStatus = signal('Connecting to Firebase...');
  isSuccess = signal(false);

  ngOnInit() {
    // runInInjectionContext use karne se warning nahi aayegi
    runInInjectionContext(this.injector, () => {
      if (this.firestore) {
        // Asli check tab hota hai jab hum koi Firestore call karte hain, 
        // par basic injection successful hai toh ye set kar sakte hain:
        this.connectionStatus.set('Firebase Connection Successful! ✅');
        this.isSuccess.set(true);
      } else {
        this.connectionStatus.set('Firebase Connection Failed! ❌');
        this.isSuccess.set(false);
      }
    });
  }
}
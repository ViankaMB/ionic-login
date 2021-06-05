import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
 
  async resetPassword(email: string): Promise<void> { 
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error -> ', error)
    }
  }


  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      return user;
    } catch (error) {
      console.log('Error -> ', error)
    }
  }


  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log('Error -> ', error)
    }
  }


  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log('Error -> ', error)
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error -> ', error)
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error -> ', error)
    }
  }



}

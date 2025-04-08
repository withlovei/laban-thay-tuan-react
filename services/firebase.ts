import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, update } from 'firebase/database';
import { User } from '../types/user';
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export class FirebaseServices {
  static instance = database;

  /**
   * Update user information in Firebase
   */
  static async updateUser({
    user,
    verifiedAt,
  }: {
    user: User;
    verifiedAt: string;
  }): Promise<void> {
    try {
      // const usersDataRef = ref(database, `users/${user.phoneNumber}`);
      // const dataToUpdate = {
      //   name: user.fullName,
      //   phone: user.phoneNumber,
      //   gender: user.gender,
      //   yearOfBirth: user.birthYear,
      //   verifiedAt,
      // };
      
      // await update(usersDataRef, dataToUpdate);
    } catch (error) {
      throw error;
    }
  }
} 
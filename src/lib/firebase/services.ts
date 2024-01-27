import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "./init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  AuthError,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

interface UserData {
  id: string;
  email: string;
  nama: string;
  token: string;
}

export const register = async (email: string, password: string, confirmationPassword: string) => {
  if (password !== confirmationPassword) {
    throw new Error("Passwords do not match.");
  }

  const auth = getAuth(app);

  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    const userdata = {
      id: user?.uid,
      email: user?.email,
      displayName: user?.displayName,
      token: token,
    };
    return {
      success: true,
      data: userdata,
    };
  } catch (error) {
    // Assuming error is of type FirebaseError, which is typically the case with Firebase operations
    if (error instanceof Error) {
      const errorCode = (error as AuthError).code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
      // Consider re-throwing the error or handling it according to your application's needs
      return {
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      };
    } else {
      // Handle unexpected errors that are not Error instances
      console.error("An unexpected error occurred", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const login = async (email: string, password: string): Promise<string> => {
  const auth = getAuth(app);

  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    // Assuming error is of type FirebaseError, which is typically the case with Firebase operations
    if (error instanceof Error) {
      const errorCode = (error as AuthError).code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
      // Consider re-throwing the error or handling it according to your application's needs
      throw error;
    } else {
      // Handle unexpected errors that are not Error instances
      console.error("An unexpected error occurred", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const loginWithGoogle = async () => {
  try {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    let userExists;
    try {
      userExists = await checkUserInFirestore(user.uid);
    } catch (error) {
      console.error("Error checking user in Firestore", error);
      // Menangani error atau mengembalikan nilai default
      userExists = false; // atau mengembalikan error, tergantung kasus penggunaanmu
    }

    const userData = {
      id: user.uid,
      email: user.email || "",
      nama: user.displayName || "",
      token: token,
    };

    if (!userExists) {
      try {
        await createUserInFirestore(userData);
      } catch (error) {
        console.error("Error creating user in Firestore", error);
        // Menangani error atau melempar kembali jika perlu
        throw error;
      }
    }

    return {
      success: true,
      data: userData,
    };
  } catch (error: any) {
    console.error("Error during Google login", error);
    return {
      success: false,
      error: error.message as string, // Pastikan ini adalah string
    };
  }
};

const checkUserInFirestore = async (uid: string) => {
  const db = getFirestore(app);
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking user in database", error);
    throw error;
  }
};

const createUserInFirestore = async (user: UserData) => {
  try {
    const userData = {
      id: user.id,
      email: user.email,
      nama: user.nama,
    };
    await axios.post("http://localhost:3344/api/auth/signup", userData);
    console.log("User created in Firestore");
  } catch (error) {
    console.error("Error creating user in Firestore", error);
    throw error;
  }
};

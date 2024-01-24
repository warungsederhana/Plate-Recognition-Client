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

export const register = async (
  email: string,
  password: string,
  confirmationPassword: string
): Promise<void> => {
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
    console.log(`Token: ${token}`);
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
    // Dapat menggunakan Google Access Token dan user info di sini
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    console.log(`Token: ${token}`);
    console.log(`User: ${user}`);
  } catch (error) {
    // Handle Errors here
    console.error("Error during Google login", error);
  }
};

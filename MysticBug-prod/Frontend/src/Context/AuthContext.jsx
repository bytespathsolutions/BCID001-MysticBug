import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyA97dsWIcAg4JBqAZOnAoPiFRcSxkD_sMo",
  authDomain: "medih-ee6b5.firebaseapp.com",
  projectId: "medih-ee6b5",
  storageBucket: "medih-ee6b5.firebasestorage.app",
  messagingSenderId: "95219626247",
  appId: "1:95219626247:web:f631614fbe897c300015a2",
  measurementId: "G-P2DBT8BTM1",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// --- Context ---
const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // --- Email/Password ---
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logout = () => {
    setRole(null);
    return signOut(firebaseAuth);
  };

  // --- Google Login ---
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  // --- Apple Login ---
  const appleLogin = async () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    provider.setCustomParameters({
      locale: "en",
    });
    return signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // User info
        const credential = OAuthProvider.credentialFromResult(result);
        const token = credential?.idToken;
        const user = result.user;

        console.log("Apple login success:", user);
        return { user, token };
      })
      .catch((error) => {
        console.error("Apple login error:", error);
        throw error;
      });
  }

  // --- Track User State ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // try {
        //   // Fetch role from MongoDB
        //   const res = await axios.get(`http://localhost:5000/api/user/${currentUser.uid}`);
        //   setRole(res.data.userType);
        // } catch (err) {
        //   console.error("Error fetching role:", err);
        //   setRole(null);
        // }
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{ user, role, signup, login, logout, googleLogin, appleLogin }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// --- Custom Hook ---
export const useAuth = () => {
  return useContext(FirebaseContext);
};

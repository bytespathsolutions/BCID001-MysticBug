import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

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
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_API_BASE_URL;

  // --- Email/Password ---
  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const idToken = await res.user.getIdToken(true);
    setToken(idToken);
    const userName = res.user.displayName || "User";
    setUser(userName);
    return res;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const idToken = await res.user.getIdToken(true);
    setToken(idToken);
    const userName = res.user.displayName || "User";
    setUser(userName);
    return res;
  };

  const logout = async () => {
    setRole(null);
    setToken(null);
    setUser(null);
    await signOut(firebaseAuth);
    navigate("/"); // redirect to home or login after logout
  };

  // --- Google Login ---
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken(true);
    const userName = result.user.displayName || "User";
    setUser(userName);
    setToken(idToken);
    return { user: result.user, token: idToken };
  };

  // --- Apple Login ---
  const appleLogin = async () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    provider.setCustomParameters({ locale: "en" });

    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken(true);
    const userName = result.user.displayName || "User";
    setUser(userName);
    setToken(idToken);
    return { user: result.user, token: idToken };
  };

  // --- Track Auth State & Fetch Role ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        // Only set user if not already set
        const userName = currentUser.displayName || "User";
        setUser(userName);

        const idToken = await currentUser.getIdToken(true);
        setToken(idToken);

        // Fetch role
        try {
          const res = await fetch(`${BASEURL}/users/getUserRole?uid=${currentUser.uid}`);
          const data = await res.json();
          const fetchedRole = data.userType;

          // Only navigate if role is being set for the first time
          setRole(prevRole => {
            if (!prevRole && fetchedRole) {
              // Role is being set for first time, navigate based on role
              if (fetchedRole === "patient") navigate("/patient-dashboard");
              else if (fetchedRole === "admin") navigate("/admin-dashboard");
              else if (fetchedRole === "doctor") navigate("/doctor-dashboard");
              else if (fetchedRole === "staff") navigate("/staff-dashboard");
              else navigate("/");
            }
            return fetchedRole;
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUser(null);
        setRole(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [BASEURL]);
  return (
    <FirebaseContext.Provider
      value={{
        user,
        role,
        token,
        setUser,
        signup,
        login,
        logout,
        googleLogin,
        appleLogin,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// --- Custom Hook ---
export const useAuth = () => useContext(FirebaseContext);

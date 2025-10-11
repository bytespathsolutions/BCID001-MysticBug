import { createContext, useContext, useEffect, useState, useRef } from "react";
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
  const [uid, setUid] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track if we should navigate after role is set
  const shouldNavigateToRole = useRef(false);

  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_API_BASE_URL;

  // --- Email/Password ---
  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const idToken = await res.user.getIdToken(true);
    setToken(idToken);
    setUid(res.user.uid);
    const userName = res.user.displayName || "User";
    setUser(userName);
    shouldNavigateToRole.current = true; // Mark for navigation after role fetch
    return res;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const idToken = await res.user.getIdToken(true);
    setToken(idToken);
    setUid(res.user.uid);
    const userName = res.user.displayName || "User";
    setUser(userName);
    shouldNavigateToRole.current = true; // Mark for navigation after role fetch
    return res;
  };

  const logout = async () => {
    setRole(null);
    setToken(null);
    setUser(null);
    setUid(null);
    shouldNavigateToRole.current = false;
    await signOut(firebaseAuth);
    navigate("/");
  };

  // --- Google Login ---
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken(true);
    const userName = result.user.displayName || "User";
    setUser(userName);
    setUid(result.user.uid);
    setToken(idToken);
    shouldNavigateToRole.current = true; // Mark for navigation after role fetch
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
    setUid(result.user.uid);
    setToken(idToken);
    shouldNavigateToRole.current = true; // Mark for navigation after role fetch
    return { user: result.user, token: idToken };
  };

  // --- Track Auth State & Fetch Role ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        const userName = currentUser.displayName || "User";
        setUser(userName);
        setUid(currentUser.uid);

        const idToken = await currentUser.getIdToken(true);
        setToken(idToken);

        // Fetch role
        try {
          const res = await fetch(`${BASEURL}/users/getUserRole?uid=${currentUser.uid}`);
          const data = await res.json();
          const fetchedRole = data.userType;
          setRole(fetchedRole);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUser(null);
        setRole(null);
        setToken(null);
        setUid(null);
        shouldNavigateToRole.current = false;
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [BASEURL]);

  // --- Handle Navigation Based on Role (separate effect) ---
  useEffect(() => {
    // Only navigate if we have a role AND the flag is set
    if (role && shouldNavigateToRole.current) {
      shouldNavigateToRole.current = false; // Reset flag immediately

      if (role === "patient") navigate("/patient-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else if (role === "doctor") navigate("/doctor-dashboard");
      else if (role === "investor") navigate("/investor-dashboard");
      else navigate("/");
    }
  }, [role, navigate]);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        uid,
        role,
        token,
        loading,
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
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
// firebase config 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
  const [userName, setUserName] = useState(null);

  // Track if we should navigate after role is set
  const shouldNavigateToRole = useRef(false);
  // Track expected role for validation
  const expectedRole = useRef(null);

  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_API_BASE_URL;

  // Function to manually set role directly (for when we already have the data)
  const setRoleDirectly = (userRole, name) => {
    setRole(userRole);
    setUserName(name);
  };

  // Function to manually fetch and set role
  const fetchAndSetRole = async (userId) => {
    try {
      const res = await fetch(`${BASEURL}/users/getUserRole?uid=${userId}`);
      const data = await res.json();
      const fetchedRole = data.userType;

      setRole(fetchedRole);
      setUserName(data.name);
      return fetchedRole;
    } catch (error) {
      throw error;
    }
  };

  // --- SMS/Mobile Login 
  const loginWithMobile = async (userData) => {
    setUid(userData.uid);
    setUser(userData.name);
    setUserName(userData.name);
    setRole(userData.userType);
    setToken(null);
    shouldNavigateToRole.current = true;

    await setUserActive(userData.uid, true);
  };

  // --- Email/Password ---
  const signup = async (email, password, intendedRole = null) => {
    expectedRole.current = intendedRole;
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const idToken = await res.user.getIdToken(true);
    setToken(idToken);
    setUid(res.user.uid);
    const userName = res.user.displayName || "User";
    setUser(userName);
    await setUserActive(res.user.uid, true);
    shouldNavigateToRole.current = true;
    return res;
  };

  const login = async (email, password, intendedRole = null) => {
    expectedRole.current = intendedRole;
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const idToken = await res.user.getIdToken(true);
    setToken(idToken);
    setUid(res.user.uid);
    const userName = res.user.displayName || "User";
    setUser(userName);
    await setUserActive(res.user.uid, true);
    shouldNavigateToRole.current = true;
    return res;
  };

  const setUserActive = async (userId, status) => {
    try {
      const response = await fetch(`${BASEURL}/users/set-active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userId,
          isActive: status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error setting user active status:", error);
    }
  };

  const logout = async () => {
    ;

    // Set user as inactive before logging out
    if (uid) {
      await setUserActive(uid, false);
    }

    setRole(null);
    setToken(null);
    setUser(null);
    setUid(null);
    setUserName(null);
    shouldNavigateToRole.current = false;
    expectedRole.current = null;

    // Only sign out from Firebase if user was using Firebase auth
    if (firebaseAuth.currentUser) {
      await signOut(firebaseAuth);
    }

    navigate("/login");
  };

  // --- Google Login ---
  const googleLogin = async (intendedRole = null) => {
    expectedRole.current = intendedRole;
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken(true);
    const userName = result.user.displayName || "user";
    setUser(userName);
    setUid(result.user.uid);
    setToken(idToken);
    shouldNavigateToRole.current = true;
    return { user: result.user, token: idToken };
  };

  // --- Apple Login ---
  const appleLogin = async (intendedRole = null) => {
    expectedRole.current = intendedRole;
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    provider.setCustomParameters({ locale: "en" });

    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken(true);
    const userName = result.user.displayName || "user";
    setUser(userName);
    setUid(result.user.uid);
    setToken(idToken);
    shouldNavigateToRole.current = true;
    return { user: result.user, token: idToken };
  };

  // --- Track Auth State & Fetch Role ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        const displayName = currentUser.displayName || "User";
        setUser(displayName);
        setUid(currentUser.uid);

        const idToken = await currentUser.getIdToken(true);
        setToken(idToken);

        // Fetch role
        try {
          const res = await fetch(`${BASEURL}/users/getUserRole?uid=${currentUser.uid}`);
          const data = await res.json();
          const fetchedRole = data.userType;

          setRole(fetchedRole);
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        if (!uid) {
          setUser(null);
          setRole(null);
          setToken(null);
          setUid(null);
          setUserName(null);
          shouldNavigateToRole.current = false;
          expectedRole.current = null;
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [BASEURL, uid]);

  // --- Handle Navigation Based on Role (separate effect) ---
  useEffect(() => {
    // Only navigate if we have a role AND the flag is set
    if (role && shouldNavigateToRole.current) {
      shouldNavigateToRole.current = false;

      // If we have an expected role, validate it
      if (expectedRole.current && expectedRole.current !== role) {
        // Role mismatch - sign out and show error
        const attemptedRole = expectedRole.current;
        expectedRole.current = null;

        const message = `You are registered as a ${role}. Please use the ${role} login instead of ${attemptedRole} login.`;
        alert(message);

        if (firebaseAuth.currentUser) {
          signOut(firebaseAuth).then(() => {
            setRole(null);
            setToken(null);
            setUser(null);
            setUid(null);
          });
        } else {
          // Mobile login - just clear state
          setRole(null);
          setUser(null);
          setUid(null);
          setUserName(null);
        }
        return;
      }

      // Reset expected role after validation
      expectedRole.current = null;

      if (role === "patient") {
        navigate("/patient-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (role === "investor") {
        navigate("/investor-dashboard");
      } else {
        navigate("/");
      }
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
        userName,
        setUser,
        signup,
        login,
        logout,
        googleLogin,
        appleLogin,
        fetchAndSetRole,
        setRoleDirectly,
        setUserActive,
        loginWithMobile, // New function for SMS login
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// --- Custom Hook ---
export const useAuth = () => useContext(FirebaseContext);
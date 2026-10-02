'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  FirebaseUser 
} from './firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  getDocs, 
  addDoc, 
  query, 
  where,
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { Book, INITIAL_BOOKS } from './mock-data';

export type { Book };

export interface Annotation {
  id: string;
  userId: string;
  bookId: string;
  chapterId: string;
  highlightedText: string;
  note: string;
  createdAt: any;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'PUBLISHING' | 'AUDIOBOOK' | 'SALE';
  title: string;
  message: string;
  read: boolean;
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'CUSTOMER' | 'EDITOR' | 'ADMIN' | 'FOUNDER';
  createdAt?: any;
}

export interface Order {
  id: string;
  userId: string;
  bookId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentProvider: string;
  transactionId: string;
  createdAt?: any;
}

export interface Entitlement {
  id: string;
  userId: string;
  bookId: string;
  grantedAt?: any;
  sourceOrderId: string;
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  text: string;
  createdAt: any;
}

interface FirebaseContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  books: Book[];
  myEntitlements: string[]; // bookIds
  orders: Order[];
  notifications: Notification[];
  annotations: Annotation[];
  reviews: Review[];
  readingProgress: Record<string, number>; // bookId -> percentage 0-100
  audioProgress: Record<string, number>; // bookId -> seconds
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  seedBooks: () => Promise<void>;
  purchaseBook: (bookId: string, amount: number, currency: string) => Promise<boolean>;
  updateReadingProgress: (bookId: string, percent: number) => Promise<void>;
  updateAudioProgress: (bookId: string, seconds: number) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  addAnnotation: (annotation: Omit<Annotation, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
  deleteAnnotation: (annotationId: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [myEntitlements, setMyEntitlements] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({});
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        let profile: UserProfile;
        const isAdminEmail = firebaseUser.email === 'girmahb1979@gmail.com';

        if (userSnap.exists()) {
          profile = userSnap.data() as UserProfile;
          if (isAdminEmail && profile.role !== 'FOUNDER') {
            profile.role = 'FOUNDER';
            await setDoc(userRef, { role: 'FOUNDER' }, { merge: true });
          }
        } else {
          profile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Girmaic Scholar',
            role: isAdminEmail ? 'FOUNDER' : 'CUSTOMER',
            createdAt: new Date().toISOString()
          };
          await setDoc(userRef, profile);
        }
        setUserProfile(profile);

        // Fetch user entitlements
        const entQuery = query(collection(db, 'entitlements'), where('userId', '==', firebaseUser.uid));
        const entSnap = await getDocs(entQuery);
        setMyEntitlements(entSnap.docs.map(d => d.data().bookId));

        // Fetch user orders
        const ordQuery = query(collection(db, 'orders'), where('userId', '==', firebaseUser.uid));
        const ordSnap = await getDocs(ordQuery);
        setOrders(ordSnap.docs.map(d => ({ id: d.id, ...d.data() } as Order)));

        // Fetch user notifications
        const notifQuery = query(collection(db, 'notifications'), where('userId', '==', firebaseUser.uid), orderBy('createdAt', 'desc'));
        const notifSnap = await getDocs(notifQuery);
        setNotifications(notifSnap.docs.map(d => ({ id: d.id, ...d.data() } as Notification)));

        // Fetch user annotations
        const annQuery = query(collection(db, 'annotations'), where('userId', '==', firebaseUser.uid), orderBy('createdAt', 'desc'));
        const annSnap = await getDocs(annQuery);
        setAnnotations(annSnap.docs.map(d => ({ id: d.id, ...d.data() } as Annotation)));

        // Fetch all reviews
        const revQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const revSnap = await getDocs(revQuery);
        setReviews(revSnap.docs.map(d => ({ id: d.id, ...d.data() } as Review)));

        // Fetch progress doc
        const progRef = doc(db, 'progress', firebaseUser.uid);
        const progSnap = await getDoc(progRef);
        if (progSnap.exists()) {
          const data = progSnap.data();
          setReadingProgress(data.reading || {});
          setAudioProgress(data.audio || {});
        }
      } else {
        setUserProfile(null);
        setMyEntitlements([]);
        setOrders([]);
        setNotifications([]);
        setAnnotations([]);
        setReadingProgress({});
        setAudioProgress({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const seedBooks = async () => {
    try {
      if (!auth.currentUser) {
        setBooks(INITIAL_BOOKS);
        return;
      }
      for (const b of INITIAL_BOOKS) {
        const docRef = doc(db, 'books', b.id);
        await setDoc(docRef, b);
      }
      setBooks(INITIAL_BOOKS);
    } catch (err) {
      console.warn("Seeding books skipped or insufficient permissions:", err);
      setBooks(INITIAL_BOOKS);
    }
  };

  // Fetch books from Firestore
  useEffect(() => {
    async function fetchBooks() {
      try {
        const q = query(collection(db, 'books'), orderBy('title'));
        const snap = await getDocs(q);
        if (snap.empty) {
          await seedBooks();
        } else {
          const fetched = snap.docs.map(d => d.data() as Book);
          setBooks(fetched.length > 0 ? fetched : INITIAL_BOOKS);
        }
      } catch (err) {
        console.error("Error fetching books from Firestore, using initial books:", err);
        setBooks(INITIAL_BOOKS);
      }
    }
    fetchBooks();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google sign in error:", err);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: name });
        const userRef = doc(db, 'users', cred.user.uid);
        const isAdminEmail = email === 'girmahb1979@gmail.com';
        const profile: UserProfile = {
          uid: cred.user.uid,
          email,
          displayName: name,
          role: isAdminEmail ? 'FOUNDER' : 'CUSTOMER',
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, profile);
        setUserProfile(profile);
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.error("Password reset error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const purchaseBook = async (bookId: string, amount: number, currency: string) => {
    if (!user) throw new Error("Must be signed in to purchase.");
    try {
      const orderRef = doc(collection(db, 'orders'));
      const orderData: Order = {
        id: orderRef.id,
        userId: user.uid,
        bookId,
        amount,
        currency,
        status: 'PAID',
        paymentProvider: 'Ye-Buna Secure Checkout',
        transactionId: `TXN-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      await setDoc(orderRef, orderData);

      const paymentRef = doc(collection(db, 'payments'));
      await setDoc(paymentRef, {
        id: paymentRef.id,
        orderId: orderRef.id,
        userId: user.uid,
        amount,
        currency,
        status: 'SUCCESS',
        createdAt: new Date().toISOString()
      });

      const entRef = doc(collection(db, 'entitlements'));
      const entData = {
        id: entRef.id,
        userId: user.uid,
        bookId,
        sourceOrderId: orderRef.id,
        grantedAt: new Date().toISOString()
      };
      await setDoc(entRef, entData);

      setMyEntitlements(prev => [...prev, bookId]);
      setOrders(prev => [orderData, ...prev]);

      // Add sale notification
      const notifRef = doc(collection(db, 'notifications'));
      await setDoc(notifRef, {
        userId: user.uid,
        type: 'SALE',
        title: 'Purchase Confirmed',
        message: `Thank you for your purchase! "${bookId}" has been added to your library.`,
        read: false,
        createdAt: new Date().toISOString()
      });

      return true;
    } catch (err) {
      console.error("Purchase error:", err);
      throw err;
    }
  };

  const updateReadingProgress = async (bookId: string, percent: number) => {
    if (!user) return;
    const newProg = { ...readingProgress, [bookId]: percent };
    setReadingProgress(newProg);
    try {
      const progRef = doc(db, 'progress', user.uid);
      await setDoc(progRef, { reading: newProg, audio: audioProgress }, { merge: true });
    } catch (err) {
      console.error("Error saving reading progress:", err);
    }
  };

  const updateAudioProgress = async (bookId: string, seconds: number) => {
    if (!user) return;
    const newProg = { ...audioProgress, [bookId]: seconds };
    setAudioProgress(newProg);
    try {
      const progRef = doc(db, 'progress', user.uid);
      await setDoc(progRef, { reading: readingProgress, audio: newProg }, { merge: true });
    } catch (err) {
      console.error("Error saving audio progress:", err);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const notifRef = doc(db, 'notifications', notificationId);
      await updateDoc(notifRef, { read: true });
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const addAnnotation = async (ann: Omit<Annotation, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error("Must be signed in to add annotations.");
    try {
      const annRef = doc(collection(db, 'annotations'));
      const newAnn: Annotation = {
        ...ann,
        id: annRef.id,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };
      await setDoc(annRef, newAnn);
      setAnnotations(prev => [newAnn, ...prev]);
      return annRef.id;
    } catch (err) {
      console.error("Error adding annotation:", err);
      throw err;
    }
  };

  const deleteAnnotation = async (annotationId: string) => {
    try {
      await deleteDoc(doc(db, 'annotations', annotationId));
      setAnnotations(prev => prev.filter(a => a.id !== annotationId));
    } catch (err) {
      console.error("Error deleting annotation:", err);
      throw err;
    }
  };

  const addReview = async (review: Omit<Review, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error("Must be signed in to add a review.");
    try {
      const revRef = doc(collection(db, 'reviews'));
      const newReview: Review = {
        ...review,
        id: revRef.id,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };
      await setDoc(revRef, newReview);
      setReviews(prev => [newReview, ...prev]);
      return revRef.id;
    } catch (err) {
      console.error("Error adding review:", err);
      throw err;
    }
  };

  return (
    <FirebaseContext.Provider value={{
      user,
      userProfile,
      loading,
      books,
      myEntitlements,
      orders,
      notifications,
      annotations,
      reviews,
      readingProgress,
      audioProgress,
      signInWithGoogle,
      signUpWithEmail,
      loginWithEmail,
      resetPassword,
      logout,
      seedBooks,
      purchaseBook,
      updateReadingProgress,
      updateAudioProgress,
      markNotificationAsRead,
      addAnnotation,
      deleteAnnotation,
      addReview
    }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error("useFirebase must be used within a FirebaseProvider");
  return context;
}

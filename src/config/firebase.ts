import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Configuração do Firebase - Use variáveis de ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug: Verificar se as variáveis estão carregadas (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? '✅ Configurado' : '❌ Não configurado',
    authDomain: firebaseConfig.authDomain ? '✅ Configurado' : '❌ Não configurado',
    projectId: firebaseConfig.projectId ? '✅ Configurado' : '❌ Não configurado',
    storageBucket: firebaseConfig.storageBucket ? '✅ Configurado' : '❌ Não configurado',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Configurado' : '❌ Não configurado',
    appId: firebaseConfig.appId ? '✅ Configurado' : '❌ Não configurado',
    measurementId: firebaseConfig.measurementId ? '✅ Configurado' : '❌ Não configurado',
  });
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Functions
export const functions = getFunctions(app);

export default app; 
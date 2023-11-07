import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'; // Specify the .tsx extension
import 'bootstrap/dist/css/bootstrap.css';
import { PostsContextProvider } from './context/PostsContext.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

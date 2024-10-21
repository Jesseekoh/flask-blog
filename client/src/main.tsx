import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserContextProvider } from './contexts/CurrentuserContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <>
            <CurrentUserContextProvider>
                <BrowserRouter>
                    <App />
                    <ToastContainer />
                </BrowserRouter>
            </CurrentUserContextProvider>
        </>
    </StrictMode>
);

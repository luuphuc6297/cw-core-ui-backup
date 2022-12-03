import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'app/routes';
import theme from 'configs/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/store';
import { AVAILABLE_LANGUAGES } from 'utils';
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => {
    const { i18n } = useTranslation();

    return (
        <React.Fragment>
            <Provider store={store}>
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <PersistGate persistor={persistor}>
                            <ThemeProvider
                                theme={{
                                    ...theme,
                                    direction:
                                        AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)?.dir ?? 'ltr',
                                }}
                            >
                                <CssBaseline />
                                <Router />
                            </ThemeProvider>
                        </PersistGate>
                    </QueryClientProvider>
                </BrowserRouter>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Provider>
        </React.Fragment>
    );
};

export default App;

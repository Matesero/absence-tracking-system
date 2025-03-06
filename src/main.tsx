import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App.tsx';

import { makeStore } from '~/shared/store/store';
const store = makeStore();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);

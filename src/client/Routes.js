import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';

export default [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: '/',
                exact: true
            },
            {
                path: '/movies/:type',
                ...Home
            },
            {
                path: '/details/:id',
                ...Detail
            },
            {
                ...NotFoundPage
            }
        ]
    }
];

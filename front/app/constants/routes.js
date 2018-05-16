import DemoPage from 'components/pages/demoPage/DemoPage';
import SecondDemoPage from 'components/pages/secondDemoPage/SecondDemoPage';
import LoginPage from '../components/pages/loginPage/LoginPage';

export default [
    {
        path: '/',
        component: LoginPage,
        title: 'Login'
    },
    {
        path: '/login',
        component: LoginPage,
        title: 'Login'
    },
    {
        path: '/demo',
        component: DemoPage,
        title: 'DemoPage'
    }
];

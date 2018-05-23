import DemoPage from 'components/pages/demoPage/DemoPage';
import SecondDemoPage from 'components/pages/secondDemoPage/SecondDemoPage';
import LoginPage from '../components/pages/loginPage/LoginPage';
import RegisterPage from '../components/pages/registerPage/RegisterPage';
import SuccessRegisterPage from '../components/pages/successRegisterPage/SuccessRegisterPage';
import StartSettingsPage from '../components/pages/startSettingsPage/StartSettingsPage';

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
        path: '/register',
        component: RegisterPage,
        title: 'RegisterPage'
    },
    {
        path: '/register/success',
        component: SuccessRegisterPage,
        title: 'SuccessRegisterPage'
    },{
        path: '/start-settings',
        component: StartSettingsPage,
        title: 'StartSettingsPage'
    },
    {
        path: '/demo',
        component: DemoPage,
        title: 'DemoPage'
    }
];

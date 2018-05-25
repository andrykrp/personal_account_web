import DemoPage from 'components/pages/demoPage/DemoPage';
import SecondDemoPage from 'components/pages/secondDemoPage/SecondDemoPage';
import LoginPage from '../components/pages/loginPage/LoginPage';
import RegistrationPage from '../components/pages/registrationPage/RegistrationPage';
import SuccessRegisterPage from '../components/pages/successRegisterPage/SuccessRegisterPage';
import StartSettingsPage from '../components/pages/startSettingsPage/StartSettingsPage';

export default [
    {
        path: '/',
        component: HomePage,
        title: 'HomePage'
    },
    {
        path: '/login',
        component: LoginPage,
        title: 'Login'
    },
    {
        path: '/register',
        component: RegistrationPage,
        title: 'RegistrationPage'
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

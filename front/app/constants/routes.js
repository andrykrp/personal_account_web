import HomePage from '../components/pages/homePage/HomePage';
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
        path: '/register/:step',
        component: RegistrationPage,
        title: 'RegistrationPage'
    },{
        path: '/start-settings',
        component: StartSettingsPage,
        title: 'StartSettingsPage'
    },
    {
        path: '/demo',
        component: HomePage,
        title: 'HomePage'
    }
];

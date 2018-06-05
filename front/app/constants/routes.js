import HomePage from '../components/pages/homePage/HomePage';
import LoginPage from '../components/pages/loginPage/LoginPage';
import RegistrationPage from '../components/pages/registrationPage/RegistrationPage';
import SuccessRegisterPage from '../components/pages/successRegisterPage/SuccessRegisterPage';
import StartSettingsPage from '../components/pages/startSettingsPage/StartSettingsPage';

export default [
    {
        path: '/',
        component: HomePage,
        title: 'titlePage.homePage',
        showHeader: true,
        menuAvailable: true
    },
    {
        path: '/login',
        component: LoginPage,
        title: 'titlePage.loginPage',
        showHeader: false,
        menuAvailable: false
    },
    {
        path: '/register',
        component: RegistrationPage,
        title: 'titlePage.registrationPage',
        showHeader: false,
        menuAvailable: false
    },
    {
        path: '/register/success',
        component: SuccessRegisterPage,
        title: 'titlePage.registrationPage',
        showHeader: false,
        menuAvailable: false
    },
    {
        path: '/register/:step',
        component: RegistrationPage,
        title: 'titlePage.registrationPage',
        showHeader: false,
        menuAvailable: false
    },
    {
        path: '/start-settings',
        component: StartSettingsPage,
        title: 'titlePage.startSettingsPage',
        showHeader: false,
        menuAvailable: false
    },
    {
        path: '/demo',
        component: HomePage,
        title: 'titlePage.homePage',
        showHeader: true,
        menuAvailable: true
    }
];

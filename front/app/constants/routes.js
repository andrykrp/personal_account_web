import DemoPage from 'components/pages/demoPage/DemoPage';
import SecondDemoPage from 'components/pages/secondDemoPage/SecondDemoPage';

export default [
    {
        path: '/',
        component: DemoPage,
        title: 'Демо'
    },
    {
        path: '/2',
        component: SecondDemoPage,
        title: 'Демо 2'
    }
];

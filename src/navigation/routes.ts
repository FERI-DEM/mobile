export enum Routes {
    LANDING = 'Landing',
    REGISTER = 'Register',
    ADD_POWER_PLANT = 'AddPowerPlant',
    DASHBOARD = 'Dashboard',
    SETTINGS = 'Settings',
    NOTIFICATIONS = 'Notifications',
    CALIBRATION = 'Calibration',
    ORGANIZATION = 'Organization',
    LOGIN = 'Login',
    FORGOT_PASSWORD = 'ForgotPassword',
    ADD_COMMUNITY = 'AddCommunity',
}
export const noUserStackInitialRoute = Routes.LANDING;
export const userStackInitialRoute = Routes.DASHBOARD;

export type RoutesParams = {
    [Routes.LANDING]: undefined;
    [Routes.REGISTER]: undefined;
    [Routes.ADD_POWER_PLANT]: undefined;
    [Routes.DASHBOARD]: undefined;
    [Routes.NOTIFICATIONS]: undefined;
    [Routes.ORGANIZATION]: undefined;
    [Routes.LOGIN]: undefined;
    [Routes.SETTINGS]: undefined;
    [Routes.FORGOT_PASSWORD]: undefined;
    [Routes.CALIBRATION]: undefined;
    [Routes.ADD_COMMUNITY]: undefined;
};
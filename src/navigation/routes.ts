export enum Routes {
    LANDING = 'Landing',
    REGISTER = 'Register',
    REGISTER_DETAILS = 'RegisterDetails',
    DASHBOARD = 'Dashboard',
    SETTINGS = 'Settings',
    NOTIFICATIONS = 'Notifications',
    CALIBRATION = 'Calibration',
    ORGANIZATION = 'Organization',
    LOGIN = 'Login',
}
export const noUserStackInitialRoute = Routes.LANDING;
export const userStackInitialRoute = Routes.DASHBOARD;
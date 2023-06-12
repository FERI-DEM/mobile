export enum Routes {
  LANDING = 'Landing',
  REGISTER = 'Registracija',
  ADD_POWER_PLANT = 'Dodaj elektrarno',
  DASHBOARD = 'Nadzorna plošča',
  SETTINGS = 'Nastavitve',
  NOTIFICATIONS = 'Obvestila',
  CALIBRATION = 'Kalibracija',
  ORGANIZATION = 'Organizacija',
  LOGIN = 'Prijava',
  FORGOT_PASSWORD = 'Pozabljeno geslo',
  ADD_COMMUNITY = 'Dodaj skupnost',
  JOIN_COMMUNITY = 'Pridruži se skupnosti',
  STORES_INITIALIZER = 'Stores initializer',
}
export const noUserStackInitialRoute = Routes.LANDING;
export const userStackInitialRoute = Routes.STORES_INITIALIZER;

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
  [Routes.CALIBRATION]: {
    id: string;
  };
  [Routes.ADD_COMMUNITY]: undefined;
  [Routes.JOIN_COMMUNITY]: undefined;
    [Routes.STORES_INITIALIZER]: undefined;
};

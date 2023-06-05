export enum QueryKey {
    'FORWARD_GEOCODING_BY_ADDRESS' = 'forwardGeocodingByAddress',
    'USER_GEOCODED_LOCATION' = 'userGeocodedLocation',
    'POWER_PLANT_POWER_PREDICTION' = 'powerPlantPowerPrediction',
    'POWER_PLANT_POWER_PREDICTION_BY_DAYS' = 'powerPlantPowerPredictionByDays',
    'COMMUNITIES' = 'communities',
    'COMMUNITY' = 'community',
    'POWER_PLANTS' = 'powerPlants',
    'POWER_PLANT' = 'powerPlant',
}

export enum MutationKey {
    'CALIBRATION' = 'calibration',
    'CREATE_COMMUNITY' = 'createCommunity',
    'DELETE_COMMUNITY' = 'deleteCommunity',
    'CREATE_POWER_PLANT' = 'createPowerPlant',
    'UPDATE_POWER_PLANT' = 'updatePowerPlant',
    'DELETE_POWER_PLANT' = 'deletePowerPlant',
    'REMOVE_MEMBER_FROM_COMMUNITY' = 'removeMemberFromCommunity',
    'SIGN_OUT' = 'signOut',
    'UPDATE_PASSWORD' = 'updatePassword',
    'CREATE_JOIN_COMMUNITY_REQUEST' = 'createJoinCommunityRequest',
    'PROCESS_JOIN_COMMUNITY_REQUEST' = 'processJoinCommunityRequest',

}
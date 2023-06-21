import React from 'react';
import CommunityPieChart from './CommunityPieChart';
import CommunityBarChart from './CommunityBarChart';
import ScrollViewWithViewportTracker from './ScrollViewWithViewportTracker';
import CommunityPowerDisplays from './CommunityPowerDisplays';
import CommunityMembersCurrentProduction from './CommunityMembersCurrentProduction';
import {QueryKey} from '../types/keys.types';
import RefreshControlView from "./RefreshControlView";
import CommunityProductionLineChart from "./CommunityProductionLineChart";
import Section from "./Section";

const CommunityDashboardTab = () => {

  return (
    <RefreshControlView queryKeysForInvalidation={[
      QueryKey.COMMUNITIES_POWER_PREDICTION_BY_DAYS,
      QueryKey.COMMUNITY_MONTHLY_POWER_PRODUCTION,
      QueryKey.COMMUNITY_MEMBERS_POWER_SHARE,
      QueryKey.COMMUNITIES_MEMBERS_CURRENT_PRODUCTION,
        QueryKey.COMMUNITY_POWER_HISTORY,
        QueryKey.COMMUNITY_POWER_PRODUCTION,
    ]}>
      <ScrollViewWithViewportTracker classNames="mb-5 mx-4 flex">
        <>
          <Section>
            <CommunityPowerDisplays />
          </Section>
          <Section heading='Graf proizvodnje'>
            <CommunityProductionLineChart/>
          </Section>
          <Section heading='Trenutna proizvodnja članov'>
            <CommunityMembersCurrentProduction />
          </Section>
          <Section heading='Proizvodnja trenutni mesec'>
            <CommunityBarChart />
          </Section>
          <Section heading='Delež velikosti elektrarn'>
            <CommunityPieChart />
          </Section>
        </>
      </ScrollViewWithViewportTracker>
    </RefreshControlView>
  );
};
export default CommunityDashboardTab;

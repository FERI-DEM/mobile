import {usePowerPlantStore} from '../store/power-plant-store';
import HeaderBar from "../navigation/HeaderBar";

const HeaderBarPowerPlants = () => {
  const selectedPowerPlant = usePowerPlantStore((state) => state.selectedPowerPlant);

  return (
      <HeaderBar title={selectedPowerPlant?.name || ''}/>
  );
};
export default HeaderBarPowerPlants;

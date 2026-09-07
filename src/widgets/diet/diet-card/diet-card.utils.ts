import { IDietRingStat, IDietStat } from 'shared/types';

const statLabel = {
  cal: 'ккал',
  proteins: 'Белки',
  fats: 'Жиры',
  carb: 'Углеводы',
};

const statColor = {
  cal: 'teal',
  proteins: 'blue',
  fats: 'red',
  carb: 'violet',
};

export const calculateStats = (target: IDietStat, fact: IDietStat): IDietRingStat[] => {
  if (!target || !fact) {
    return Object.keys(statLabel).map((tk) => ({
      label: statLabel[tk],
      stat: '0',
      progress: 0,
      color: statColor[tk],
    }));
  }
  return Object.keys(statLabel).map((tk) => ({
    label: statLabel[tk],
    stat: Math.round((fact[tk] * 100) / target[tk]).toString(),
    progress: (fact[tk] * 100) / target[tk],
    color: statColor[tk],
  }));
};

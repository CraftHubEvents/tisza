import countryCodes from '../lib/countrycodes';
import { Buyer } from '../szamlazzhu/types';

export const NON_VAT_ACT = 'Falling outside the territorial scope of the VAT Act.';
export const REVERSE_CHARGE_VAT = 'Reverse charge VAT.';

export default (buyer: Buyer) => {
  const isHU = countryCodes(buyer.country).isHungarian();
  const isEU = countryCodes(buyer.country).isEuropean();

  if (isHU) return '';

  if (buyer.taxNumber === '' && isEU) return NON_VAT_ACT;

  if (isEU && buyer.isTEHK) return REVERSE_CHARGE_VAT;

  if (!isHU && !isEU) return NON_VAT_ACT;

  return '';
};

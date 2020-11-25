import getTaxSubject from './get-tax-subject';
import getTaxNumber from './get-tax-number';
import { Buyer } from '../szamlazzhu/types';

export default (order) : Buyer => {
  const {
    name,
    email,
    company_name,
    billing_address: {
      address,
      city,
      zip_postal_code: zip = '',
      country_name: country,
      state_province_region: state = '',
    },
  } = order;

  const buyerName = company_name || name;
  const addressWithState = `${address.replace(/[\r]?\n/g, ' ')} ${state}`;

  const data : Buyer = {
    name: buyerName,
    email,
    sendEmail: true,
    country,
    taxNumber: getTaxNumber(order),
    taxSubject: getTaxSubject(order),
    zip,
    city,
    address: addressWithState,
    postAddress: {
      name: buyerName,
      zip,
      city,
      address: addressWithState,
    },
    identifier: 1,
    phone: '',
    issuerName: name,
  };

  return data;
};

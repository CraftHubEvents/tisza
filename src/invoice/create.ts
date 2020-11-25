import yaml from 'yaml';

import szamlazz from '@jssc/szamlazz.js';
import getBuyer from './get-buyer';
import getSeller from './get-seller';
import getItems from './get-items';
import getPaymentMethod from './get-payment-method';

export default async (
  order: any,
  config: any,
  Seller: any = szamlazz.Seller,
  Buyer: any = szamlazz.Buyer,
  Item: any = szamlazz.Item,
  Invoice: any = szamlazz.Invoice
) => {
  const seller = new Seller(getSeller(config));
  const buyer = new Buyer(getBuyer(order));
  const items = getItems(config, order).map(item => new Item(item));

  if (process.env.DEBUG) {
    console.log(yaml.stringify(order));
  }

  const currency = config.invoice.currency;
  const orderNumber = order.reference;
  const invoiceIdPrefix = config.invoice['id-prefix'];
  const logoImage = config.invoice['logo-image'];
  const comment = config.invoice.comment;

  return new Invoice({
    paymentMethod: getPaymentMethod(order),
    currency: szamlazz.Currency[currency],
    language: szamlazz.Language.English,
    invoiceIdPrefix,
    logoImage,
    comment,
    orderNumber,
    seller,
    buyer,
    items,
    paid: true,
  });
};

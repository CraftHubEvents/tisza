import szamlazz from '@jssc/szamlazz.js';
import getBuyer from './get-buyer';
import getSeller from './get-seller';
import getItems from './get-items';

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

  const currency = config.invoice.currency;
  const orderNumber = order.reference;
  const invoiceIdPrefix = config.invoice['id-prefix'];
  const logoImage = config.invoice['logo-image'];
  const comment = config.invoice.comment;

  return new Invoice({
    paymentMethod: szamlazz.PaymentMethod.PayPal,
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

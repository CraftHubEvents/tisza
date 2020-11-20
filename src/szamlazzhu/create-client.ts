import szamlazz from '@jssc/szamlazz.js';

export default config => new szamlazz.Client({
    authToken: process.env.SZAMLAZZ_TOKEN,
    eInvoice: config.invoice['e-invoice'],
  });

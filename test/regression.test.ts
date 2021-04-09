import MockDate from 'mockdate'
import createInvoice from '../src/invoice/create'
import createClient from '../src/szamlazzhu/create-client'

import mockOrder from './mocks/createOrder'
import mockConfig from './mocks/createConfig'


const token = 'ABCDEFGHIJK'



beforeEach(() => {
  MockDate.set('2021-03-22')
});

afterEach(() => {
  MockDate.reset();
});

describe('vat info line is undefined if vat contains whitespace', () => {

  test('fr', async () => {
    const order = mockOrder("eu-company", "tickets")
    const config = mockConfig("single", "single")

    order.company_name = 'Teads France SAS',
    order.billing_address =  {
      address: '97 rue du Cherche-midi',
      city: 'Paris',
      state_province_region: 'Paris',
      zip_postal_code: '75006',
      country: 'FR',
      country_name: 'France',
      vat_number: 'FR 40 483 813 861',
      company_name: 'Teads France SAS'
    }

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })


  test('at', async () => {
    const order = mockOrder("eu-company", "tickets")
    const config = mockConfig("single", "single")

    order.company_name = 'TechTalk GmbH',
    order.billing_address =  {
      address: 'Leonard-Bernstein-Strasse 10',
      city: 'Vienna',
      state_province_region: 'Vienna',
      zip_postal_code: '1220',
      country: 'AT',
      country_name: 'Austria',
      vat_number: 'ATU 161 52 400',
      company_name: 'TechTalk GmbH'
    }

    const invoice = await createInvoice(order, config);
    const client = createClient(config, token)
    const xml = client._generateInvoiceXML(invoice)
    expect(xml).toMatchSnapshot();
  })

})


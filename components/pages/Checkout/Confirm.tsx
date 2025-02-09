"use client";

import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Space,
  Card,
  Collapse,
  Radio,
} from "antd";

import card from "@/public/images/smallCard.svg";
import Image from "next/image";

const ConfirmComponent = () => {
  const { Title, Paragraph } = Typography;
  const { Panel } = Collapse;

  return (
    <div>
      <section className="">
        <Row gutter={[32, 16]}>
          <Col xl={16} sm={24} xs={24}>
            <Title level={2} className="font-normal">
              Review Your Order
            </Title>

            <Title level={3} className="font-normal">
              Billing Address
              <span className="text-purple-50 text-sm pl-2">Change</span>
            </Title>

            <Paragraph>Ahamefula Udume Utom</Paragraph>

            <Paragraph>Ahamefula Udume Utom</Paragraph>

            <Paragraph>Stormstr 17</Paragraph>
            <Paragraph>Koln, NordRhein-Westfalen 50997</Paragraph>

            <Paragraph>Germany</Paragraph>

            <hr />

            <Title level={3} className="font-normal pt-2">
              Payment Method
              <span className="text-purple-50 text-sm pl-2">Change</span>
            </Title>

            <div className="flex space-x-3">
              <Image src={card} alt="card" />
              <Paragraph className="pt-2">Ending in 4242</Paragraph>
            </div>

            <hr />

            <Title level={3} className="font-normal pt-2">
              Shipping Address
              <span className="text-purple-50 text-sm pl-2">Change</span>
            </Title>

            <Paragraph>Ahamefula Udume Utom</Paragraph>

            <Paragraph>Ahamefula Udume Utom</Paragraph>

            <Paragraph>Stormstr 17</Paragraph>
            <Paragraph>Koln, NordRhein-Westfalen 50997</Paragraph>

            <Paragraph>Germany</Paragraph>

            <hr />

            <Title level={3} className="font-normal pt-2">
              Add a Gift, Promotion Code, Or Voucher
            </Title>
            <Space>
              <Input placeholder="Enter Code" size="large" className="mr-20" />
              <Button size="large">Apply</Button>
            </Space>

            <Title level={3} className="font-normal pt-2">
              Items & Shipping
            </Title>

            <Paragraph className="leading-loose">
              Why has sales tax been applied ?
              <span className="text-purple-50 pl-2">
                See tax and teller information.
              </span>
              <br />
              Need help? Check our
              <span className="text-purple-50 "> Help pages</span> or
              <span className="text-purple-50 pl-2">contact us </span>
            </Paragraph>

            <Paragraph>
              For an item sold by Unifaires.com Export Sales LLC . When you
              click the “place your under” button we’ll send you an email
              message acknowledging receipt of your order. Your contract to
              purchase an item will not be completed until we send you an email
              notifying you that then item has been shipped.
              <br /> <br />
              All item in ths order are sold by unifaires export sales LLC.
              Unless otherwise noted. By placing your other, you authorize
              unifaires to designated carrier to clear the package and pay the
              import fees on you(or the recipients) behalf. Customs declarations
              will be made in the name and the behalf of your (or the
              recipients) behalf by the designated carrier. You can find the
              complete terms and conditions of your order
              <span className="text-purple-50 pl-1">here</span>.
            </Paragraph>

            <Paragraph>
              <span className="text-purple-50">
                Important informations about sales tax you may owe in your state
              </span>
              <br />
              <br />
              You may return new, unopened merchandise in original conditions
              within 30 days of delivery. Exceptions and restrictions apply. See
              Unifaires.com
              <span className="text-purple-50">returns policy</span> . Need to
              add more items to your order ? Continue shopping on the
              <span className="text-purple-50">unifaires.com homepage.</span>
            </Paragraph>
          </Col>

          <Col xl={8}>
            <Card>
              <Row gutter={[4, 16]}>
                <Col xl={24}>
                  <Button type="primary" size="large" block>
                    Place your order in EUR
                  </Button>
                </Col>

                <Col xl={24}>
                  <Paragraph>
                    By clicking to place your order, you agree to unifaires
                    terms of use and privacy policy.
                  </Paragraph>
                </Col>

                <Col xl={24}>
                  <hr />
                </Col>

                <Col xl={24}>
                  <Title level={5} className="font-normal">
                    ORDER SUMMARY
                  </Title>
                </Col>

                <Col xl={18}>
                  <Paragraph className="font-semibold text-[#495057]">
                    Items:
                  </Paragraph>
                </Col>

                <Col xl={6}>
                  <Paragraph className="text-purple-50">$100.20</Paragraph>
                </Col>

                <Col xl={18}>
                  <Paragraph className="font-semibold text-[#495057]">
                    Shopping & Handling:
                  </Paragraph>
                </Col>

                <Col xl={6}>
                  <Paragraph className="text-purple-50">$0.00</Paragraph>
                </Col>

                <Col xl={18}>
                  <Paragraph className="font-semibold text-[#495057]">
                    Total before tax:
                  </Paragraph>
                </Col>

                <Col xl={6}>
                  <Paragraph className="text-purple-50">$100.20</Paragraph>
                </Col>

                <Col xl={18}>
                  <Paragraph className="font-semibold text-[#495057]">
                    Estimated tax to be collected:
                  </Paragraph>
                </Col>

                <Col xl={6}>
                  <Paragraph className="text-purple-50">$2.80</Paragraph>
                </Col>

                <Col xl={24} className="">
                  <Row>
                    <Col xl={16}>
                      <Paragraph className="font-semibold text-[#E30613]">
                        Payment Total:
                      </Paragraph>
                    </Col>

                    <Col xl={8}>
                      <Paragraph className="font-semibold text-purple-50">
                        EUR 400.80
                      </Paragraph>
                    </Col>

                    <Col xl={24} className="-ml-4">
                      <Collapse ghost expandIconPosition="end">
                        <Panel header="Selected payment currency" key="1">
                          <Radio defaultChecked={false}>Eur</Radio>
                          <Radio defaultChecked>USD</Radio>
                        </Panel>
                        <Panel header="Applicable Exchange Rate" key="2">
                          <p>gwhdwqhdhkqbhw</p>
                        </Panel>
                      </Collapse>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default ConfirmComponent;

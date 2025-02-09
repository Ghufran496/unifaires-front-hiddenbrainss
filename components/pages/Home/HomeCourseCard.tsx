'use client'
import React, { Fragment } from 'react';
// ants and icons
import { Card, Rate, Typography } from 'antd';
import { BankOutlined, GlobalOutlined } from '@ant-design/icons';
// app components
import ImageComponent from '@/components/shared/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/redux/hooks';

const HomeCourseCard = (props: any) => {
  const cookies = getCookie('ipInfo');
  const info = typeof cookies === 'string' && JSON.parse(cookies);
  const userCountry = info && info.data.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie('currency');
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const taxes = useAppSelector((state: any) => state.tax.taxes);

  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return 'N/A';
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const image =
    props && props.image ? props.image : JSON.parse(props.meta).image;
  const video =
    props && props.video ? props.video : JSON.parse(props.meta).video;

  const salesPrice =
    props?.pricing &&
    props?.pricing?.amount -
    props?.pricing?.amount * (props?.pricing?.discount / 100);

  const estimatedTax =
    salesPrice && salesPrice * (getTaxForCountry(userCountry) / 100);
  // // Sales Price Plus Tax
  const finalSalesPrice = salesPrice && salesPrice + estimatedTax;

  const deadlineString = new Date(props.applicationDeadline);
  const applicationDeadline = deadlineString.toLocaleDateString();

  const currencyRate = useAppSelector(
    (state: any) => state.currency.currencyRate
  );
  const convertedPrice = finalSalesPrice && finalSalesPrice * currencyRate;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: `${currencyRate ? currency : 'USD'}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  // console.log("here is the rate", currencyRate);
  return (
    <Fragment>
      <Link href={`/courses/${props.slug}`} rel='noopener noreferrer' passHref>
        <Card
          className='h-full lg:w-[230px] md:w-[230px] w-full rounded-xl overflow-hidden [&>div.ant-card-body]:p-0'
          hoverable
        >
          <div className='flex lg:flex-col md:flex-col flex-row'>
            <div className='flex lg:justify-center md:justify-center justify-start lg:items-center md:items-center items-start p-2 rounded-t-xl aspect-[4/3] relative lg:bg-grey-200 md:bg-grey-200 bg-none lg:h-[200px] md:h-[200px]'>
              <ImageComponent
                width={100}
                height={100}
                objectPosition='center'
                src={image}
                alt='course imgae'
                className='lg:w-full md:w-full'
              // objectFit="cover"
              />
            </div>
            <div className='relative p-4 mt-0 bg-white rounded-xl lg:w-full md:w-full w-3/4'>
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                className='capitalize text-[14px] m-0 font-bold'
              >
                {props.name || props.title}
              </Typography.Paragraph>
              <Typography.Paragraph
                ellipsis
                className='flex items-center gap-1 mb-1'
              >
                <BankOutlined className='text-purple-300 pr-2 font-semibold' />{' '}
                {props.company ? props.company : props.organizationName}
              </Typography.Paragraph>

              <div className=''>
                <div className='flex flex-col items-start gap-0 mb-1'>
                  <div>
                    <Rate
                      disabled
                      defaultValue={props.averageRating || 0}
                      className='[&>li]:mr-1'
                      style={{
                        color: '#F59E0B',
                        fontSize: 15,
                      }}
                    />
                    <Typography.Text type='warning' className='pt-1'>
                      {props.averageRating || '0'}
                    </Typography.Text>
                  </div>
                  <Typography.Text className='m-0'>
                    <span className='text-purple-600 font-semibold'>
                      Enrolled:
                    </span>{' '}
                    ({props.students || '0'})
                  </Typography.Text>
                </div>

                <Typography.Text className='flex items-center gap-1 capitalize'>
                  <GlobalOutlined className='text-grey-400 ' /> {props?.level}
                </Typography.Text>

                <Typography.Title level={5} className='flex m-0 font-bold'>
                  {props?.pricing?.type === 'free' || !props?.pricing
                    ? 'Free'
                    : `${formatCurrency(convertedPrice || salesPrice)}`}
                </Typography.Title>
                {props.applicationDeadline && (
                  <div className='flex gap-1 italic'>
                    <Typography.Paragraph className='m-0 font-bold text-sm'>
                      Deadline:
                    </Typography.Paragraph>

                    <div>
                      <Typography.Paragraph className='text-center m-0 '>
                        {props.applicationDeadline
                          ? applicationDeadline
                          : 'Anytime'}
                      </Typography.Paragraph>
                    </div>
                  </div>
                )}
                {/* <div className="flex items-center justify-between gap-2">
                  <div className="flex-grow">
                    <Tag className="rounded-full " color="processing">
                      Bestseller
                    </Tag>
                    <Tag className="rounded-full " color="processing">
                      Part-Time
                    </Tag>
                  </div>
                  <Button
                    type="text"
                    size="large"
                    shape="circle"
                    icon={<TagOutlined />}
                    className="flex-shrink-0"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </Fragment>
  );
};

export default HomeCourseCard;

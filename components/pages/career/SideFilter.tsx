"use client";

import { LeftOutlined } from "@ant-design/icons";
import {
  Col,
  Typography,
  Collapse,
  Row,
  Radio,
  Checkbox,
  Button,
  DatePicker,
  Select,
  Slider,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";
import { fetchCountryStates, fetchStateCities } from "@/redux/features/CountrySlice";

const { Link } = Typography;

const SideFilter = ({
  categoryId,
  hideFilter,
  selectedFilters,
  setSelectedFilters,
  categoryOptions,
  selectedCategory,
  catBreadcrumbs,
  currentPage,
  fetchJobs,
  handleAllCategoriesClick,
  getCurrencySymbol,
  convertCurrency,
  serverCurrency,
  formatCurrency,
}: any) => {
  // States
  const [datePicker, setDatePicker] = useState(false);
  const [minSalary, setMinSalary] = useState<any>();
  const [maxSalary, setMaxSalary] = useState<any>();
  const [salarySlider, setSalarySlider] = useState<{ min: any; max: any }>({ min: 0, max: 0 });
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState<{ label: string; value: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ label: string; value: string }[]>([]);
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  // Functions
  const dispatch: any = useAppDispatch();
  const countries = useAppSelector((state: any) => state.country.countries);
  const states = useAppSelector((state: any) => state.country.states);
  const cities = useAppSelector((state: any) => state.country.cities);
  const { Title } = Typography;
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;

  const handleSelectedCountry = (countryName: string) => {
    dispatch(fetchCountryStates(countryName));
    const newFilters = {
      ...selectedFilters,
      country: countryName,
    };
    countryName === undefined && delete newFilters.country;
    delete newFilters.state;
    delete newFilters.city;
    setCountry(countryName === undefined ? "" : countryName);
    setState("");
    setSelectedFilters(newFilters);

    const findStateArr = countryName && selectedCategory?.filters.find((f: { title: string }) => f.title === "state")?.option;
    if (findStateArr.length > 0) {
      const options: { label: any; value: any; }[] = [];
      findStateArr.forEach((s: any) => {
        if (s.country_name === countryName) {
          options.push({
            label: s.state_name,
            value: s.state_name,
          })
        }
      });
      setStateOptions(options)
    } else {
      const options = states.map((s: any) => {
        return {
          label: s.name,
          value: s.name,
        };
      });
      setStateOptions(options)
    }
  };

  const handleSelectedState = (stateName: any) => {
    dispatch(fetchStateCities(stateName));
    const newFilters = {
      ...selectedFilters,
      state: stateName,
    };
    delete newFilters.city;
    setState(stateName);
    setSelectedFilters(newFilters);

    const findStateArr = stateName && selectedCategory?.filters.find((f: { title: string }) => f.title === "city")?.option;
    if (findStateArr.length > 0) {
      const options: { label: any; value: any; }[] = [];
      findStateArr.forEach((c: any) => {
        if (c.state_name === stateName) {
          options.push({
            label: c.city_name,
            value: c.city_name,
          })
        }
      });
      setCityOptions(options)
    } else {
      const options = cities.map((c: any) => {
        return {
          label: c.name,
          value: c.name,
        };
      });
      setCityOptions(options)
    }
  };

  const handleSelectedCity = (cityName: any) => {
    const newFilters = {
      ...selectedFilters,
      city: cityName,
    };
    setCity(cityName);
    setSelectedFilters(newFilters);
  };

  const handleSalaryFilter = () => {
    const newFilters = {
      ...selectedFilters,
      minSalary,
      maxSalary,
    };
    setSelectedFilters(newFilters);
  };

  const handleRadioClick = (filterName: string, value: any) => {
    const newFilters = {
      ...selectedFilters,
      [filterName]: value,
    };
    setSelectedFilters(newFilters);
  };

  const removeSelectedFilter = (deleteKey: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[deleteKey]
    setSelectedFilters(newFilters);
  }

  const showSelectedRadioFilter = (key: string) => {
    return (
      <Row gutter={[16, 4]} justify="start" className="flex">
        <Col>
          <Button type="primary">{selectedFilters[key]}</Button>
        </Col>
        <Col>
          <Button
            type="text"
            onClick={() => removeSelectedFilter(key)}
          >
            X
          </Button>
        </Col>
      </Row>
    )
  }

  const renderRadioFilter = (panelTitle: string, panelKey: string, objKey: string, radioOptions: []) => {
    return (
      <Panel
        header={
          <Title level={5} className="text-black">
            {panelTitle}
          </Title>
        }
        key={panelKey}
      >
        {objKey in selectedFilters ? (
          showSelectedRadioFilter(objKey)
        ) : (
          <Row gutter={[16, 4]} className="flex md:flex-col">
            <Radio.Group
              onChange={(e) =>
                handleRadioClick(objKey, e.target.value)
              }
            >
              {radioOptions.map((option: { name: string, count: string }, index) => (
                <Col xl={24} key={index}>
                  <Radio value={option.name}>{`${option.name} (${option.count})`}</Radio>
                </Col>
              ))}
            </Radio.Group>
          </Row>
        )}
      </Panel>
    )
  }

  const renderCheckboxFilter = (panelTitle: string, panelKey: string, objKey: string, checkboxOptions: []) => {
    return (
      <Panel
        header={
          <Title level={5} className="text-black">
            {panelTitle}
          </Title>
        }
        key={panelKey}
      >
        <Row gutter={[16, 4]} className="flex md:flex-col">
          <Checkbox.Group onChange={(e: any) => handleRadioClick(objKey, e)}>
            <Row>
              {checkboxOptions.map((opt: { name: string, count: string }, i) => (
                <Col span={24} key={`${opt.name}-${i}`}>
                  <Checkbox value={opt.name}>{`${opt.name} (${opt.count})`}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Row>
      </Panel>
    )
  }

  // Hooks
  useEffect(() => {
    if (Object.keys(selectedCategory).length > 0) {
      const findCountryArr = selectedCategory?.filters?.find((f: { title: string }) => f.title === "country").option;
      if (findCountryArr.length > 0) {
        const options = findCountryArr.map((c: any) => {
          return {
            label: c.country_name,
            value: c.country_name,
          };
        });
        setCountryOptions(options);
      } else {
        const options = countries.map((c: any) => {
          return {
            label: c.name,
            value: c.name,
          };
        });
        setCountryOptions(options);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (Object.keys(selectedCategory).length > 0) {
      const salaryMinMax = selectedCategory?.filters?.find((f: { title: string }) => f.title === "salary").option;
      if (salaryMinMax.length > 0) {
        const sliderVal = { min: 0, max: 0 };
        salaryMinMax.map((s: { name: string, value: number }) => {
          if (s.name === "min") {
            sliderVal.min = s.value;
            setMinSalary(s.value);
          } else if (s.name === "max") {
            sliderVal.max = s.value;
            setMaxSalary(s.value);
          }
        });
        setSalarySlider(sliderVal);
      }
    }
  }, [categoryId])

  return (
    <Fragment>
      <Col xl={6} sm={24} xs={24} className="lg:pr-10 md:pr-6 pr-4">
        <div>
          <Title level={3} className="pl-2 pt-2 ms-2 text-black">
            Filters
          </Title>
        </div>
        <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
          {/* Categories */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Job Category
              </Title>
            }
            key="1"
          >
            {Object.keys(selectedCategory).length === 0 ? categoryOptions.map((cat: any) => (
              <div key={cat.id} className="ml-4">
                <Link
                  className="text-black hover:font-semibold"
                  onClick={() => fetchJobs(currentPage, cat.id)}
                >
                  {`${cat.name} (${cat.totalJobCount})`}
                </Link>
              </div>
            )) :
              (
                <div>
                  <Link
                    className="text-black hover:font-semibold"
                    onClick={() => handleAllCategoriesClick()}
                  >
                    <LeftOutlined /> All Categories
                  </Link>
                  <br />
                  {catBreadcrumbs.length > 0 && catBreadcrumbs.map((cat: any, index: number) => (
                    <>
                      {catBreadcrumbs.length - 1 === index ? (
                        <b className="ml-4" style={{ cursor: "text" }}>
                          {cat.name}
                        </b>
                      ) : (
                        <Link
                          className="text-black hover:font-semibold"
                          onClick={() => fetchJobs(currentPage, cat.id)}
                        >
                          <LeftOutlined /> {cat.name}
                        </Link >
                      )}
                      <br />
                    </>
                  ))}
                  {selectedCategory?.children?.map((cat: any) => (
                    <div key={cat.id} className="ml-4">
                      <Link
                        className="text-black hover:font-semibold ml-4"
                        onClick={() => fetchJobs(currentPage, cat.id)}
                      >
                        {`${cat.name} (${cat.totalJobCount})`}
                      </Link>
                    </div>
                  ))}
                </div>
              )
            }
          </Panel>

          {selectedCategory?.filters?.map((filter: any) => {
            if (filter.title === "appDeadlineType"  && !hideFilter) {
              return (
                <Panel
                  header={
                    <Title level={5} className="text-black">
                      Application Deadline
                    </Title>
                  }
                  key="2"
                >
                  <Row gutter={[16, 4]} className="flex md:flex-col ms-1">
                    <Radio.Group>
                      <Radio value={"Anytime"} onClick={() => {
                        setDatePicker(false);
                        removeSelectedFilter("deadline")
                      }
                      }>
                        Anytime
                      </Radio>
                      <Radio value={"Fixed"} onClick={() => setDatePicker(true)}>
                        Fixed
                      </Radio>
                    </Radio.Group>
                    {datePicker && (
                      <RangePicker
                        onChange={(e: any) => {
                          const formattedDates = [dayjs(e[0]).format('YYYY-MM-DD'), dayjs(e[1]).format('YYYY-MM-DD')];
                          handleRadioClick("deadline", formattedDates);
                        }}
                        size="middle"
                      />
                    )}
                  </Row>
                </Panel>
              )
            }

            if (filter.title === "salary") {
              return (
                <Panel
                  header={
                    <Title level={5} className="text-black">
                      {`Estimated Yearly Salary (${getCurrencySymbol()})`}
                    </Title>
                  }
                  key="3"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <b>
                        {`${formatCurrency(convertCurrency(salarySlider.min))}  -  ${formatCurrency(convertCurrency(salarySlider.max))}`}
                      </b>
                    </Col>
                    <Col md={18}>
                      <Slider
                        range
                        min={convertCurrency(salarySlider.min)}
                        max={convertCurrency(salarySlider.max)}
                        value={[convertCurrency(minSalary), convertCurrency(maxSalary)]}
                        included={true}
                        onChange={(value) => {
                          // Handle the slider movement
                          setMinSalary(serverCurrency(value[0]));
                          setMaxSalary(serverCurrency(value[1]));
                        }}
                        onChangeComplete={(value) => {
                          setMinSalary(serverCurrency(value[0]));
                          setMaxSalary(serverCurrency(value[1]));
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Button
                        type="primary"
                        shape="round"
                        size="small"
                        onClick={handleSalaryFilter}
                        className="mt-1"
                      >
                        Go
                      </Button>
                    </Col>
                  </Row>
                </Panel>
              )
            }

            if (filter.title === "country" && !hideFilter) {
              return (
                <Panel
                  header={
                    <Title level={5} className="text-black">
                      Country & City
                    </Title>
                  }
                  key="4"
                >
                  <Row gutter={[16, 4]} className="flex md:flex-col">
                    <Col xl={24}>
                      <Select
                        allowClear
                        showSearch
                        value={country || null}
                        popupMatchSelectWidth={false}
                        placeholder="Select Country"
                        onChange={handleSelectedCountry}
                        optionFilterProp="children"
                        filterOption={(input: any, option: any) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={countryOptions}
                        style={{ width: 200 }}
                      />
                      {country && (
                        <Select
                          allowClear
                          showSearch
                          value={state || null}
                          popupMatchSelectWidth={false}
                          placeholder="Select State"
                          onChange={handleSelectedState}
                          optionFilterProp="children"
                          filterOption={(input: any, option: any) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={stateOptions}
                          style={{ width: 200 }}
                          className="mt-4"
                        />
                      )}
                      {state && (
                        <Select
                          allowClear
                          showSearch
                          value={city || null}
                          placeholder="Select City"
                          onChange={handleSelectedCity}
                          optionFilterProp="children"
                          filterOption={(input: any, option: any) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={cityOptions}
                          style={{ width: 200 }}
                          className="mt-4"
                        />
                      )}
                    </Col>
                  </Row>
                </Panel>
              )
            }

            if (filter.title === "levelOfEducation" && !hideFilter) {
              let panelTitle = "Levels of Education"
              let panelKey = "5"
              let objKey = "levelOfEducation"
              let radioOptions = filter.option
              return (renderRadioFilter(panelTitle, panelKey, objKey, radioOptions))
            }

            if (filter.title === "experienceLevel" && !hideFilter) {
              let panelTitle = "Experience Level"
              let panelKey = "6"
              let objKey = "experienceLevel"
              let radioOptions = filter.option
              return (renderRadioFilter(panelTitle, panelKey, objKey, radioOptions))
            }

            if (filter.title === "organizationName" && !hideFilter) {
              let panelTitle = "Company or Institution"
              let panelKey = "7"
              let objKey = "organizationName"
              let radioOptions = filter.option
              return (renderRadioFilter(panelTitle, panelKey, objKey, radioOptions))
            }

            if (filter.title === "workingStyle" && !hideFilter) {
              let panelTitle = "Work Style"
              let panelKey = "8"
              let objKey = "workingStyle"
              let radioOptions = filter.option
              return (renderRadioFilter(panelTitle, panelKey, objKey, radioOptions))
            }

            if (filter.title === "employmentBenefits" && !hideFilter) {
              let panelTitle = "Employee Benefits"
              let panelKey = "9"
              let objKey = "employmentBenefits"
              let checkboxOptions = filter.option
              return (renderCheckboxFilter(panelTitle, panelKey, objKey, checkboxOptions))
            }

            if (filter.title === "language" && !hideFilter) {
              let panelTitle = "Language"
              let panelKey = "10"
              let objKey = "language"
              let checkboxOptions = filter.option
              return (renderCheckboxFilter(panelTitle, panelKey, objKey, checkboxOptions))
            }

            if (filter.title === "type" && !hideFilter) {
              let panelTitle = "Job Type"
              let panelKey = "11"
              let objKey = "type"
              let radioOptions = filter.option
              return (renderRadioFilter(panelTitle, panelKey, objKey, radioOptions))
            }
          })}
        </Collapse>
      </Col>
    </Fragment>
  );
};

export default SideFilter;

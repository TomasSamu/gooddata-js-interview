// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
const dateAttributeInMonths =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "2016-01-01",
      to: "2016-01-31"
    };
  }

  getMonthFilter() {
    const { from, to } = this.state;
    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute
        },
        from: from,
        to: to
      }
    };
  }

  getMeasures() {
    return [
      {
        measure: {
          localIdentifier: "m1",
          definition: {
            measureDefinition: {
              item: {
                uri: grossProfitMeasure
              }
            }
          },
          alias: "$ Gross Profit"
        }
      }
    ];
  }

  getViewBy() {
    return {
      visualizationAttribute: {
        displayForm: {
          uri: dateAttributeInMonths
        },
        localIdentifier: "a1"
      }
    };
  }

  renderDropdown() {
    const handleSelectChange = month => {
      //   I would consider using dayjs library for date formatting
      const startMonth = new Date(2016, parseInt(month) - 1, 1);
      const endMonth = new Date(2016, parseInt(month), 0);

      const startDate = `${startMonth
        .getFullYear()
        .toString()}-${month}-${startMonth.getDate().toString()}`;

      const lastDate = `${endMonth
        .getFullYear()
        .toString()}-${month}-${endMonth.getDate().toString()}`;

      this.setState({ from: startDate, to: lastDate });
    };
    return (
      <select
        defaultValue="01"
        onChange={e => handleSelectChange(e.target.value)}
      >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    );
  }

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();

    return (
      <div className="App">
        <h1>$ Gross Profit in month {this.renderDropdown()} 2016</h1>
        <div>
          <ColumnChart
            measures={measures}
            filters={filters}
            projectId={projectId}
          />
        </div>

        <h1>$ Gross Profit - All months</h1>
        <div>
          <ColumnChart
            measures={measures}
            viewBy={viewBy}
            projectId={projectId}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ChartistGraph from 'react-chartist';
import moment from "moment";
import _ from "lodash";

const Graph = (props) => {

  let reviews = props.reviews
  for (let x in reviews) {
    let date = moment(reviews[x].createdAt).format('DD-MM-YYYY')
    reviews[x].date = date
  }
  let groups = _(reviews)
    .groupBy(x => x.date)
    .map((value, key) => ({ Date: key, count: value.length }))
    .value();
  console.log(groups)
  let x = [], y = [];
  for (let g in groups) {
    x[g] = groups[g].Date
    y[g] = groups[g].count
  }
  var data = {
    labels: x,
    series: [y]
  };

  var options = {
    // high: 10,
    // low: 0,
    // axisX: {
    //   labelInterpolationFnc: function (value, index) {
    //     return index % 2 === 0 ? value : null;
    //   }
    // }
  };

  var type = 'Bar'

  return (
    <div>
      {props ? <ChartistGraph data={data} options={options} type={type} /> : null}
    </div>
  )

}

export default Graph;
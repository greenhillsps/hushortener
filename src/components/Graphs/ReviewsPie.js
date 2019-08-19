import React from 'react';
import ChartistGraph from 'react-chartist';

const Pie = (props) => {

    let reviews = props.reviews
    let rating = [0, 0, 0, 0, 0]
    for (let x in reviews) {
        let rate = Math.round(reviews[x].rating.overall)
        switch (rate) {
            case 1: rating[0] = rating[0] + 1; break;
            case 2: rating[1] = rating[1] + 1; break;
            case 3: rating[2] = rating[2] + 1; break;
            case 4: rating[3] = rating[3] + 1; break;
            case 5: rating[4] = rating[4] + 1; break;
        }
    }
    let label = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars']
    rating[0] == 0 ? label[0] = ' ' : null
    rating[1] == 0 ? label[1] = ' ' : null
    rating[2] == 0 ? label[2] = ' ' : null
    rating[3] == 0 ? label[3] = ' ' : null
    rating[4] == 0 ? label[4] = ' ' : null

    var data = {
        labels: label,
        series: rating
    };

    var options = {
        donut: true,
        donutWidth: 60,
        donutSolid: true,
        startAngle: 270,
        showLabel: true,
        // labelOffset: 40
    }

    var type = 'Pie'

    return (
        <div>
            {props ? <ChartistGraph data={data} options={options} type={type} /> : null}
        </div>
    )

}

export default Pie;
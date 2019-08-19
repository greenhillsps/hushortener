import React from 'react'
import { DateRangePicker } from 'react-date-range';
import Card from "components/Card/Card.jsx";
import { Button } from 'react-bootstrap'

const CustomDateRangePicker = ({ selectionRange, onChange }) => {


    return (
        <div className="row">
            <div className="col-md-7">
                <Card
                    content={
                        <div>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                onChange={onChange}
                            />
                            <Button bsStyle="success" className="btn-fill"  >
                                Apply
                                 </Button>
                            <Button bsStyle="default" className="btn-fill"  >
                                Cancel
                                 </Button>
                        </div>
                    }

                />
            </div>
        </div>

    )

}
export default CustomDateRangePicker


// class CustomDateRangePicker extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             selectionRange: {
//                 startDate: new Date(),
//                 endDate: new Date('Tue Oct 20 2018 13:13:07'), //new Date(),
//                 key: 'selection',
//             }
//         }
//     }

//     handleSelect = (ranges) => {
//         console.log('ranges', ranges);
//         this.setState({ selectionRange: ranges.selection })
//         // {
//         // 	selection: {
//         // 		startDate: [native Date Object],
//         // 		endDate: [native Date Object],
//         // 	}
//         // }
//     }
//     render() {
//         // const selectionRange = {
//         // 	startDate: new Date(),
//         // 	endDate:'Tue Oct 20 2018 13:13:07', //new Date(),
//         // 	key: 'selection',
//         // }
//         return (
//             <div className="row">
//                 <div className="col-md-7">
//                     <Card
//                         content={
//                             <div>
//                                 <DateRangePicker
//                                     ranges={[this.state.selectionRange]}
//                                     onChange={this.handleSelect}
//                                 />
//                                 <Button bsStyle="success" className="btn-fill"  >
//                                     Apply
//                                  </Button>
//                                 <Button bsStyle="default" className="btn-fill"  >
//                                     Cancel
//                                  </Button>
//                             </div>
//                         }

//                     />
//                 </div>
//             </div>

//         )
//     }
// }

// export default CustomDateRangePicker;
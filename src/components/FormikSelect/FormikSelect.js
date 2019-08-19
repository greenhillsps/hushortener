
import React from 'react';
import Select from 'react-select';


class FormikSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
   
    this.props.onChange(this.props.id, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const {id,options,multi,value} = this.props;
    
    return (
      
        <Select
          id={id}
          options={options}
          multi={multi}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
         
        />
    );
  }
}

export default FormikSelect;
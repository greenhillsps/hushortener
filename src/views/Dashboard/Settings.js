import React from 'react';
import { Grid } from 'react-bootstrap'
import { GetRequest } from '../../utils/ApiMethods'

class Settings extends React.Component{
constructor(props){
    super(props);
    this.getUserProfile()
}

getUserProfile=()=>{
GetRequest.getUser().then(res=>{

}).catch(err=>{
    
})
}

    render(){

        return(
    <Grid fluid>
        settings
    </Grid>
        )
    }
}

export default Settings;
import moment from 'moment';

export const dateFormat=(inputDate)=>{

return moment(inputDate).format('MMMM Do YY, h:mm:ss a');
}
export const dateFormat3=(inputDate)=>{

return moment(inputDate).format('MMMM Do YY');
}



export const dateFormatOnlyMoth=(inputDate)=>{
  return moment(inputDate).format('MMMM');
  }


  export const dateFormatOnlyMothAndYear=(inputDate)=>{
  return moment(inputDate).format('MMMM/YYYY');
  }
  
  // access last month of  current date
  export const lastMonth=()=>{
    return moment().date(0)
  }

export const dateFormat4=(inputDate)=>{
return moment(inputDate).format('DD/MM/YYYY');
}

export const dateFormat2=(inputDate)=>{
let myMoment=moment(inputDate).startOf('minute').fromNow();
return myMoment
}

export const CalculateTime=(inputTime)=>{
    let myMoment=moment(inputTime).startOf('minute').fromNow();
    return myMoment;
}

export const compareTime=(Time)=>{

 var now = moment();
  var then = moment(Time);
  var status;
    if (now > then) {
      status=false;
    }else{
     status=true;
    }
  return status
}


import moment from 'moment'
export const getInitials = (name, delimeter = " ") => {
  if (name) {
    var array = name.split(delimeter);

    switch (array.length) {
      case 1:
        return array[0].charAt(0).toUpperCase();

        break;
      default:
        return (
          array[0].charAt(0).toUpperCase() +
          array[array.length - 1].charAt(0).toUpperCase()
        );
    }
  }
  return false;
};

export const DateFormat=(data)=>{
  return moment(data).format("MM/DD/YYYY")
}

export const reStructure=(data)=>{
 
 var newData={};
 if(data.length){
  newData.label=data[0]._id;
  newData.value=data[0].percentage
 }
  return newData;
}

//valid date
export const DateValidation = (currentDate,matchDate) => {
  return currentDate.isBefore(moment(matchDate));
};
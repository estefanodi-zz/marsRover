const checkPlateauCords = (n1,n2) => {
  let message = '';
  if( !n1 || !n2 ){
     message = 'Both values are required';
  }else if( n1 != n2 ){
  	 message = 'First value must be equal as second value';
  }else if( isNaN(n1) || isNaN(n2) ){
  	 message = 'Both values must be numbers';
  }else if( n1 > 9 || n2 > 9 ){
     message = 'Maximum value is 9';
  }else if( n1 < 5 || n2 < 5 ){
     message = 'Minimum value is 5';
  }else{
  	 message = 'Ok!'
  } 
  return message;
}
//*******************************************************************************************
//*******************************************************************************************
//*******************************************************************************************
const checkStartingPoint = (n1,n2,cd,sx,sy) => {
	let message = '';
  if( n1 > sx || n2 > sy ){
     message = 'Please provide numbers lower than plateau coords';
  }else if( typeof(n1) != 'number' || typeof(n2) != 'number' ){
     message = 'Please provide numbers as the first two values';
  }else if( cd.length > 1 ){
     message = 'Please provide a valid cardinal direction as third value';
  }else if( cd != 'N' &&  cd != 'S' && cd != 'E' && cd != 'W' ){
     message = 'Please provide a valid cardinal direction as third value';
  }else{
  	 message = 'Ok!';
  }
  return message;
}
//*******************************************************************************************
//*******************************************************************************************
//*******************************************************************************************
const checkMovements = (movements) => {
     let message = '';
     if( movements.length === 0){
     	 message = 'Please enter directions';
     }else{
       for( var i = 0; i < movements.length; i++){
	     	if( movements[i] != 'L' && movements[i] != 'R' && movements[i] != 'M'){
	           message = 'Please set movements using only L,R,M';
	     	}else{
	     	   message = 'Ok!';
	     	}
       }
     }
     return message;
         
}


module.exports = {
  checkPlateauCords,
  checkStartingPoint,
  checkMovements
}
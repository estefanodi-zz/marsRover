var arr = [
           {coordinates:'0.0'},
           {coordinates:'0.1'},
           {coordinates:'0.2'},
           {coordinates:'0.3'},
           {coordinates:'0.4'},
           {coordinates:'1.0'},
           {coordinates:'1.1'},
           {coordinates:'1.2'},
           {coordinates:'1.3'},
           {coordinates:'1.4'}
          ]
var line = '';
var count = Number(arr[0].coordinates[0]);

for( var i = 0; i < arr.length; i++){
 if( arr[i].coordinates[0] != count){
 	count += 1;
 	//console.log(arr[i].coordinates[0])
 	for( var j = 0; j < 5; j++){
       line += '|_____'; 	
    }
    line += '|\n'
 }
    
}

console.log(line);
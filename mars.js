const readline    = require('readline');
const controllers = require('./controllers.js');
const figures     = require('figures');
const colors      = require('colors');

const directions  = {
  n : figures.arrowUp,
  s : figures.arrowDown,
  e : figures.arrowRight,
  w : figures.arrowLeft
};
const rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});
//===============================================================================================
//=============================== NEW PLATEAU ===================================================
//===============================================================================================
class Plateau {
  constructor(rows, columns) {
    this.rows    = rows;
    this.columns = columns;
    this.squares = [];
  }
}
//===============================================================================================
//=============================== NEW SQUARE ====================================================
//===============================================================================================
class Square {
  constructor(i,j,direction) {
    this.coordinates = i + '.' + j;
    this.direction   = direction;
  }
}
//===============================================================================================
//=============================== CREATE PLATEAU ================================================
//===============================================================================================
createPlateau = (x,y,dir,coords) => {
   var plateau = new Plateau(x,y),direction;
   for(let i = x; i >= 0; i--){
      for(let j = 0; j <= y; j++){
          var cor = `${i}.${j}`;
          cor === coords ? direction = dir  : direction = ''
      	  var square = new Square(i,j,direction);
          plateau.squares.push(square);
      }
   }
   return plateau.squares;
}
//===============================================================================================
//================================ SHOW INITIAL BOARD ===========================================
//===============================================================================================
console.log('\x1b[36m%s\x1b[0m',`
          Welcome to the Node Mars Rover!

   ****************** USAGE *******************

1) Enter plateau size
2) Enter rover's initial position coordinates
3) Enter rover's movements
   \n
`);
start = () => {
   rl.question('Enter plateau size, min 5.5 max 9.9. Type exit to close the app.\n', (cor) => {
   if( cor === 'exit' ){ return rl.close(); }
   let x = Number(cor.split('.')[0]), y = Number(cor.split('.')[1]);
   let message = controllers.checkPlateauCords(x, y);
   if( message != 'Ok!'){
     console.log(message,'\n');
     start();
   }else{
      let squares = createPlateau(x,y);
      let line = '';
      let count = 0;

      for( let i = 0; i <= x; i++){
        for( let j = count; j < count+(y+1); j++){
            line += `|${squares[j].coordinates.cyan}_______`;   
        }
        count+= (y+1);
        line += '|\n'
      }
    console.log(line);
    selectStartingPoint(x,y);
   }

})
} 
start();  
//===============================================================================================
//=============================== SELECT STARTING POINT =========================================
//===============================================================================================

selectStartingPoint = (sx,sy) => {
	rl.question(
		`Enter starting coordinates, followed by a cardinal point: N-S-W-E. ex: 1.1N, 2.5E.Type exit to close the app. \n`
    , (cor) => {
     if(cor === 'exit'){ return rl.close();}
     if( cor.length <= 3 ){
        selectStartingPoint(sx,sy);
     }else{
       let x = Number(cor[0]), y = Number(cor[2]), cd = cor[3].toUpperCase();
       let message = controllers.checkStartingPoint(x, y, cd, sx, sy);
       if(message != 'Ok!'){
          console.log(message,'\n');
          selectStartingPoint(sx,sy);
       }else{
          let direction, coords = x + '.' + y;
          switch (cd) {
              case 'N':
                  direction = directions.n;
                  break;
              case 'S':
                  direction = directions.s;
                  break;
              case 'W':
                  direction = directions.w;
                  break;
              case 'E':
                  direction = directions.e;
          }
          let squares = createPlateau(sx,sy,direction,coords);
          let line  = '';
          let count = 0;

      for( let i = 0; i <= sx; i++){
        for( let j = count; j < count+(sy+1); j++){
            line += `|${squares[j].coordinates.cyan}_${squares[j].direction||'_'}_____`;   
        }
        count+= (sy+1);
        line += '|\n'
      }
        console.log(line);
        enterMovements(sx,sy,x,y,cd);
       }
     }
	})
}
//===============================================================================================
//=============================== ENTER MOVEMENTS ===============================================
//===============================================================================================

enterMovements = (sx,sy,x,y,cd) => {
  rl.question(
    `Enter a list of movements L = left , R = right , M = move, ex: MMLMMRML. Type exit to close the app. \n`
    , (cor) => {
       
    if(cor === 'exit'){
       return rl.close();
    }else{
      let movements = cor.toUpperCase().replace(/ /g,'').split('');
      let message   = controllers.checkMovements(movements);
      if( message != 'Ok!'){ 
          console.log(message);
          enterMovements(sx,sy,x,y,cd);
      }else{
         var path     = [];
         for( let i = 0; i < movements.length; i++ ){
//====================== CHECK IF M =========================================
          if( movements[i] === 'M'){ 
            switch (cd) {
                case 'N':
                    path.push(`${x+1}.${y}${cd}`);
                    x +=1;
                    break;
                case 'S':
                    path.push(`${x-1}.${y}${cd}`);
                    x -=1;
                    break;
                case 'W':
                    path.push(`${x}.${y-1}${cd}`);
                    y -=1;
                    break;
                case 'E':
                    path.push(`${x}.${y+1}${cd}`);
                    y +=1;
            }
         }
//====================== CHECK IF M =========================================

//====================== CHECK IF L =========================================
         if( movements[i] === 'L'){   
               let cardinals   = ['N','W','S','E'];
               let position    = cardinals.indexOf(cd);

               if( cardinals.indexOf(cd) === 3 ){
                  position = cardinals.indexOf('N');
               }else{
                  position = cardinals.indexOf(cd)+1;
               }
               cd = cardinals[position]
               path.push(`${x}.${y}${cd}`);
         }
//====================== CHECK IF L ========================================= 

//====================== CHECK IF R =========================================
          if( movements[i] === 'R'){  
               let cardinals   = ['N','E','S','W'];
               let position    = cardinals.indexOf(cd);

               if( cardinals.indexOf(cd) === 3 ){
                  position = cardinals.indexOf('N');
               }else{
                  position = cardinals.indexOf(cd)+1;
               }
               cd = cardinals[position]
               path.push(`${x}.${y}${cd}`);
          }
//====================== CHECK IF R ========================================= 

       }//============== FOR LOOP   =========================================
       showFinalPlateau(sx,sy,cd,path);
      }//=============== IF STATEMENT ======================================= 
     }
   })
}
//===============================================================================================
//=============================== SHOW FINAL PLATEAU ============================================
//===============================================================================================

showFinalPlateau = (sx,sy,cd,path) =>{
  let err;
  path.map( ele =>{
    ele.length > 4 
    ? err = true 
    : err = false
  })

  let plateau = new Plateau(sx,sy),direction;
   for(let i = sx; i >= 0; i--){
      for(let j = 0; j <= sy; j++){
          var cor = `${i}.${j}`;
          var square = new Square(i,j);
          plateau.squares.push(square);
      }
   }
  
   for( let i = 0; i < plateau.squares.length; i++){
     for(let j = 0; j < path.length; j++){
        let coords = path[j].substring(0,3),direc = path[j].substring(3,4).toLowerCase();
        if( coords === plateau.squares[i].coordinates){
          plateau.squares[i].direction = directions[direc];
        }
     }
   }

   let line    = '';
   let count = 0;

   for( let i = 0; i <= sx; i++){
     for( let j = count; j < count+(sy+1); j++){
          line += `|${plateau.squares[j].coordinates.cyan}_${plateau.squares[j].direction||'_'}_____`;   
      }
      count+= (sy+1);
      line += '|\n'
   }
      !err ? console.log(line) : console.log('************You moved out of the plateau******************')
      rl.question(`Start again? yes/no \n`, (quest) => {
        quest === 'yes' ? start() : rl.close()
      })
}

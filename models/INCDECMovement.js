class PlayerMovement{
   constructor(name,pid,pcounty,change,decpoint,janpoint,febpoint){
       this.name = name;
       this.pid = pid;
       this.pcounty =pcounty;
       this.change = change;
       this.decpoint = decpoint;
       this.janpoint =janpoint;
       this.febpoint = febpoint;
   }
}
const Movement={
    INCMovement(Array){
     console.log('Increment movement ...',Array.length);
     var decpoint=0;
     var janpoint=0;
     var febpoint=0;
     var change =0; 
     var name='';
     var county='';
     var pid=0;
     var count=1;
     var MovementArray=[];
        for(var i in Array){
            for(let [k,v] of Object.entries(Array[i])){
                if(k=='name'){
                    name =v;
                }
                if(k=='playerid'){
                    pid =v;
                }
                if(k=='country'){
                    county = v;
                }
                if(k=='months'){
                    for(let [k1,v1] of Object.entries(v)){
                        if(k1=='jan'){
                            janpoint = v1['points'];
                        }
                        if(k1=='dec'){
                            decpoint = v1['points'];
                        }
                        if(k1=='feb'){
                            febpoint = v1['points'];
                        }
                    }
                    if((typeof decpoint)=='number' && (typeof febpoint)=='number'){
                         console.log('dec point= ',decpoint,'jan point',janpoint);
                         change = febpoint - decpoint
                         count++;
                    } 
                    // change = decpoint - febpoint;
                }
               
            }
            MovementArray.push(new PlayerMovement(name,pid,county,change,decpoint,janpoint,febpoint));
        }
        console.log('In Movement array ..',MovementArray.length,'count is ',count);
        // var newans=[];
        // for(var i in MovementArray){
        //     if((MovementArray[i].change)=='NaN'){
        //         console.log('nan = ',MovementArray[i].change);
        //         newans.push(new PlayerMovement(MovementArray[i].name,MovementArray[i].pid,MovementArray[i].pcounty,
        //         0,MovementArray[i].decpoint,MovementArray[i].janpoint,MovementArray[i].febpoint));
        //     }
        //     newans.push(MovementArray[i]);
        // }
        // console.log('In new ans...');
        // MovementArray.forEach((i)=>{console.log(i.change);});
        
        // MovementArray.forEach((i)=>{console.log(i.change);}) console.log('In new ans after sort...');
        return MovementArray.sort((a,b)=>{return b.change-a.change});
        // return MovementArray.sort((a,b)=>{return a.change-b.change});
    }
    ,DECMovement(Array){
        console.log('Increment movement ...',Array.length);
        var decpoint=0;
        var janpoint=0;
        var febpoint=0;
        var change =0; 
        var name='';
        var county='';
        var pid=0;
        var count=1;
        var MovementArray=[];
           for(var i in Array){
               for(let [k,v] of Object.entries(Array[i])){
                   if(k=='name'){
                       name =v;
                   }
                   if(k=='playerid'){
                       pid =v;
                   }
                   if(k=='country'){
                       county = v;
                   }
                   if(k=='months'){
                       for(let [k1,v1] of Object.entries(v)){
                           if(k1=='jan'){
                               janpoint = v1['points'];
                           }
                           if(k1=='dec'){
                               decpoint = v1['points'];
                           }
                           if(k1=='feb'){
                               febpoint = v1['points'];
                           }
                       }
                       if((typeof decpoint)=='number' && (typeof febpoint)=='number'){
                            console.log('dec point= ',decpoint,'jan point',janpoint);
                            change = febpoint - decpoint
                            count++;
                       } 
                       // change = decpoint - febpoint;
                   }
                  
               }
               MovementArray.push(new PlayerMovement(name,pid,county,change,decpoint,janpoint,febpoint));
           }
           console.log('In Movement array ..',MovementArray.length,'count is ',count);
           // var newans=[];
           // for(var i in MovementArray){
           //     if((MovementArray[i].change)=='NaN'){
           //         console.log('nan = ',MovementArray[i].change);
           //         newans.push(new PlayerMovement(MovementArray[i].name,MovementArray[i].pid,MovementArray[i].pcounty,
           //         0,MovementArray[i].decpoint,MovementArray[i].janpoint,MovementArray[i].febpoint));
           //     }
           //     newans.push(MovementArray[i]);
           // }
           // console.log('In new ans...');
           // MovementArray.forEach((i)=>{console.log(i.change);});
           
           // MovementArray.forEach((i)=>{console.log(i.change);}) console.log('In new ans after sort...');
           return MovementArray.sort((a,b)=>{return a.change-b.change});
           // return MovementArray.sort((a,b)=>{return a.change-b.change});
       }
    
}
module.exports = Movement;
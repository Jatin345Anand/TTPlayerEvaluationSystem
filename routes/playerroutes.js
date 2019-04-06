const express = require('express');
const PlyerRoutes = express.Router();
const PlayerOpearations = require('../db/PlayerOperations');
PlyerRoutes.post('/dosearch', (request, response) => {
  console.log('In Do search....', request.body);
  // var PrevPosition = request.body.preposition;
  // var CurrentPosition = request.body.position;
  var Name = request.body.name;
  var Month = request.body.selmonth;
  // var CountryName = request.body.countryname;
  // var Points = request.body.points;
  // var PlayerPeriods = request.body.period;
  // var FindTop10 = request.body.selmonth;
  //   var CurrentPosition = request.body.preposition;
  console.log('In search wise months...', Name, Month);
  // console.log(PrevPosition,CurrentPosition,Name,CountryName,Points,PlayerPeriods,FindTop10);
  // if(FindTop10=='GET TOP 10 PLAYER'){
  //     console.log('Find the top 10 player....');
  //     // PlayerOpearations.FindTop10Player(request,response);
  // } 
  if (Month == '1') {
    Month = 'dec';
  }
  if (Month == '2') {
    Month = 'jan';
  }
  if (Month == '3') {
    Month = 'feb';
  }
  if (Name.length > 0) {
    console.log('Name = ', Name);
    PlayerOpearations.FindByName(Name, Month, request, response);
  }
  else{
    response.send('<h1>Plaese Fill All Details....</h1>');
  }
});
PlyerRoutes.post('/gettop10', (req, res) => {
  console.log("In top 10....");
  var ButtonStatus = req.body.serchtop10;
  if (ButtonStatus == 'GET TOP 10') {
    console.log('Find the top 10 player....');
    PlayerOpearations.FindTop10Player(req, res);
  }

});
PlyerRoutes.post('/gettradeanalysis', (req, res) => {
  console.log('In Get Trade analysis..', req.body);
  var inc = req.body.in;
  var dec = req.body.de;
  if (inc == 'INCREMENT (+)') {
    PlayerOpearations.FindIncrementTop5PlayerbyRank(req, res);
  }
  if (dec == 'DECREMENT (-)') {
    PlayerOpearations.FindDecrementTop5PlayerbyRank(req, res);
  }
});
PlyerRoutes.post('/getcounty',(request,response)=>{
  console.log('In county representation...');
  // console.log(req.body);
  var ButtonInc = request.body.in;
  var ButtonDec = request.body.de;
  var Month = request.body.selmonth;
  if (Month == '1') {
    Month = 'dec';
  }
  if (Month == '2') {
    Month = 'jan';
  }
  if (Month == '3') {
    Month = 'feb';
  }
  console.log(ButtonDec,ButtonInc,Month);
  if((typeof ButtonDec)!= 'undefined' && (typeof Month)!= 'undefined'){
    PlayerOpearations.FindCountyRepresentaionLowestPeriod(Month,request,response);
  }
  // else{
  //   response.send('<h4>Please Select Month Name....</h4>');
  //   // alert('Please Select Month Name....');
  // }
  if((typeof ButtonInc)!= 'undefined' && (typeof Month)!= 'undefined'){
    PlayerOpearations.FindCountyRepresentaionHighestPeriod(Month,request,response);
  }
  // else{
  //   // alert('Please Select Month Name....');
  //   response.send('<h4>Please Select Month Name....</h4>');
  // }
 
});
module.exports = PlyerRoutes;
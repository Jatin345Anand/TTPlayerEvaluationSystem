const PLAYERS = require('../db/schema/playerschema');
const MODELS = require('../models/HighestLowestPeriodCounty');
const MODELSMOVEMENT = require('../models/INCDECMovement');
class Player {
    constructor(name, country, playerid, months) {

        this.name = name;
        this.country = country;
        this.playerid = playerid;
        this.months = months;
    }
}
class Months {
    constructor(dec, jan, feb) {
        this.dec = dec;
        this.jan = jan;
        this.feb = feb;
    }
}
class Month {
    constructor(pre, pos, incativeperiod, points) {
        this.pre = pre;
        this.pos = pos;
        this.incativeperiod = incativeperiod;
        this.points = points;
    }
}

// class OnlyOneMonth
class ArrayofCounties {
    constructor(a) {
        this.a = a;
    }
}
var ARRAYCO = [];
const PlayerOperations = {
    FindByName(name, month, req, res) {
        console.log("In find name wise search details....");
        PLAYERS.find({
                'name': name
                // 'pos': {
                //     $lt: 10
                // }
            },
            (err, docs) => {
                if (err) {
                    console.log('Something error occured!!!');
                    res.render('playerdetails', {
                        erro: 'We have no information ,You Can not Watch Top 10!!'
                    });
                } else {
                    console.log(docs);
                    console.log(JSON.parse(JSON.stringify(docs[0])));
                    var name = '';

                    var country = '';
                    var playerid = 0;
                    var months = {};


                    for (let [k, v] of Object.entries(JSON.parse(JSON.stringify(docs[0])))) {
                        if (k == 'name') {
                            // TopperPlayerNames.push(v);
                            console.log('name = ', v);
                            name = v;
                        }
                        if (k == 'playerid') {
                            // TopperPlayerPoints.push(v);
                            console.log('playerid = ', v);
                            playerid = v;
                        }


                        if (k == 'county') {
                            // TopperPlayerRanks.push(v);
                            console.log('county = ', v);
                            country = v;
                        }
                        if (k == 'months') {
                            // console.log(' months 1 = ',Object.entries(v));
                            // console.log('length of array = ',Object.entries(v).length);
                            // console.log('keys of months = ',Object.keys(v));
                            // console.log('Values of months = ',Object.values(v));
                            // console.log(' months = ',Object.entries(JSON.parse(JSON.stringify(v))));
                            var DecObj = {},
                                JanObj = {},
                                FebObj = {},
                                OnlyOneMonthObj = {};
                            for (let [k1, v1] of Object.entries(JSON.parse(JSON.stringify(v)))) {
                                console.log('K = ', k1, ' V = ', v1);
                                // if(k1=='dec'){
                                //     console.log(v1['previousrank']);
                                //     DecObj = new Month(v1['previousrank'],v1['currentrank'],v1['inactiveperiod'],v1['points']);

                                // }
                                // if(k1=='jan'){
                                //     console.log(v1['points']);
                                //     JanObj = new Month(v1['previousrank'],v1['currentrank'],v1['inactiveperiod'],v1['points']);

                                // }
                                // if(k1=='feb'){
                                //     console.log(v1['currentrank']);
                                //     FebObj = new Month(v1['previousrank'],v1['currentrank'],v1['inactiveperiod'],v1['points']);

                                // }
                                // console.log('Your months = ',month,'My months = ',k1);
                                if (month == k1) {
                                    console.log('Your months = ', month, 'My months = ', k1);
                                    console.log(v1['currentrank']);
                                    OnlyOneMonthObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);

                                }
                            }
                            console.log();
                            months = OnlyOneMonthObj;
                            // months = new Months(DecObj, JanObj, FebObj);
                        }

                        var PlayerObj = new Player(name, country, playerid, months);
                    }
                    console.log('My player Obj = ', PlayerObj);
                    // res.send(JSON.parse(JSON.stringify(docs[0])));
                    console.log('Months Details  = ', PlayerObj.months['pre']);
                    // var PlayerObj = new Player(pre,pos,name,country,points,periods);
                    // console.log("obj = ",PlayerObj);
                    res.render('playerdetails', {
                        Data: PlayerObj,
                        MonthName: month
                    });
                }
            }
        );
    },
    FindIncrementTop5PlayerbyRank(req, res) {
        console.log('In increment...');
        PLAYERS.find({},
            (e, d) => {
                if (e) {
                    console.log(e);
                } else {
                    var TopPlayer = MODELS.CreateArrayofPlayerObj(d);
                    console.log('In model ', TopPlayer[0]);
                    var newINCREMENTArray = [];
                    newINCREMENTArray= MODELSMOVEMENT.INCMovement(TopPlayer);
                    console.log('In render array...');
                    newINCREMENTArray.forEach((a)=>{console.log(a);});
                    res.render('IncrementTopMovement', {
                        Data: newINCREMENTArray
                    });
                }

            }
        )
    },
    FindDecrementTop5PlayerbyRank( req, res) {
        console.log('In decrement...');
        
        PLAYERS.find({},
            (e, d) => {
                if (e) {
                    console.log(e);
                } else {
                    var TopPlayer = MODELS.CreateArrayofPlayerObj(d);
                    console.log('In model ', TopPlayer[0]);
                    var newINCREMENTArray = [];
                    newINCREMENTArray= MODELSMOVEMENT.DECMovement(TopPlayer);
                    console.log('In render array...');
                    newINCREMENTArray.forEach((a)=>{console.log(a);});
                    res.render('DecrementTopMovement', {
                        Data: newINCREMENTArray
                    });
                }

            }
        )
    },
    FindCountyRepresentaionHighestPeriod(month, req, res) {

        PLAYERS.find({

            },
            (e, d) => {
                if (e) {
                    console.log(e);
                } else {
                    var newTop5Highest = [];
                    var TopPlayer = MODELS.CreateArrayofPlayerObj(d);
                    console.log('By model', TopPlayer.length);
                    var UniqueCounties = MODELS.FindUniqueCounty(TopPlayer);
                    console.log('In Find Highest after model...', UniqueCounties.length);
                    var CountyOneObj = {};
                    var ArrayofCountyOneObj = [];
                    var u = 0;
                    for (var i in UniqueCounties) {
                        PLAYERS.find({
                                "county": UniqueCounties[i]
                            },
                            (e, d) => {
                                if (e) {
                                    console.log('Something error...');
                                } else {
                                    if (d.length > 1) {
                                        // console.log();

                                        // console.log(MODELS.CreateMainCounty(MODELS.CreateArrayofCountyObj(d)));
                                        ArrayofCountyOneObj[u++] = MODELS.CreateMainCounty(MODELS.CreateArrayofCountyObj(d));
                                        // ArrayofCounties.push(d.length);
                                        // ArrayofCountyOneObj.push(d.length);
                                        //   ArrayofCounties.push(MODELS.CreateArrayofCountyObj(d));
                                    }
                                    if (d.length == 1) {
                                        // console.log(MODELS.CreateCountyOneObj(d));
                                        ArrayofCountyOneObj[u++] = MODELS.CreateCountyOneObj(d);
                                        // ArrayofCounties.push(d.length);
                                        // ArrayofCountyOneObj.push(d.length);
                                        //   ArrayofCounties.push(MODELS.CreateCountyOneObj(d));
                                    }
                                    newTop5Highest.push(MODELS.GetTop5MonthWise(month, ArrayofCountyOneObj));
                                }
                                // console.log('County Array length = ',ArrayofCounties.length,ArrayofCountyOneObj.length,ArrayofCountyOneObj[0]);
                                console.log('PRint Array = ', newTop5Highest.length);
                                if (newTop5Highest.length == UniqueCounties.length) {
                                    console.log('U can render...' );
                                    // for(var i in newTop5Highest[newTop5Highest.length-1]){
                                    //   console.log(newTop5Highest[newTop5Highest.length-1][i].name);
                                    // }
                                    res.render('top5countyhighestperiod', {
                                        Data:newTop5Highest[newTop5Highest.length-1],
                                        MonthName:month
                                    });
                                }

                            }
                        )

                    }

                    // res.render('top5countyhighestperiod',{
                    //     Data:newTop5Highest
                    // });

                }

            }
        );

    },
    FindCountyRepresentaionLowestPeriod(month, req, res) {
        PLAYERS.find({

        },
        (e, d) => {
            if (e) {
                console.log(e);
            } else {
                var newTop5Highest = [];
                var TopPlayer = MODELS.CreateArrayofPlayerObj(d);
                console.log('By model', TopPlayer.length);
                var UniqueCounties = MODELS.FindUniqueCounty(TopPlayer);
                console.log('In Find Highest after model...', UniqueCounties.length);
                var CountyOneObj = {};
                var ArrayofCountyOneObj = [];
                var u = 0;
                for (var i in UniqueCounties) {
                    PLAYERS.find({
                            "county": UniqueCounties[i]
                        },
                        (e, d) => {
                            if (e) {
                                console.log('Something error...');
                            } else {
                                if (d.length > 1) {
                                    // console.log();

                                    // console.log(MODELS.CreateMainCounty(MODELS.CreateArrayofCountyObj(d)));
                                    ArrayofCountyOneObj[u++] = MODELS.CreateMainCounty(MODELS.CreateArrayofCountyObj(d));
                                    // ArrayofCounties.push(d.length);
                                    // ArrayofCountyOneObj.push(d.length);
                                    //   ArrayofCounties.push(MODELS.CreateArrayofCountyObj(d));
                                }
                                if (d.length == 1) {
                                    // console.log(MODELS.CreateCountyOneObj(d));
                                    ArrayofCountyOneObj[u++] = MODELS.CreateCountyOneObj(d);
                                    // ArrayofCounties.push(d.length);
                                    // ArrayofCountyOneObj.push(d.length);
                                    //   ArrayofCounties.push(MODELS.CreateCountyOneObj(d));
                                }
                                newTop5Highest.push(MODELS.GetBelow5MonthWise(month, ArrayofCountyOneObj));
                            }
                            // console.log('County Array length = ',ArrayofCounties.length,ArrayofCountyOneObj.length,ArrayofCountyOneObj[0]);
                            console.log('PRint Array = ', newTop5Highest.length);
                            if (newTop5Highest.length == UniqueCounties.length) {
                                console.log('U can render...' );
                                // for(var i in newTop5Highest[newTop5Highest.length-1]){
                                //   console.log(newTop5Highest[newTop5Highest.length-1][i].name);
                                // }
                                res.render('top5countyLowestperiod', {
                                    Data:newTop5Highest[newTop5Highest.length-1],
                                    MonthName:month
                                });
                            }

                        }
                    )

                }

                // res.render('top5countyhighestperiod',{
                //     Data:newTop5Highest
                // });

            }

        }
    );
    },
    FindTop10Player(req, res) {
        PLAYERS.find({},
            (e, d) => {
                if (e) {
                    console.log(e);
                } else {
                    var TopPlayer = MODELS.CreateArrayofPlayerObj(d);
                    console.log('In model ', TopPlayer.length);
                    res.render('renderTop10', {
                        Data: TopPlayer
                    });
                }

            }
        )
    }

}
module.exports = PlayerOperations;
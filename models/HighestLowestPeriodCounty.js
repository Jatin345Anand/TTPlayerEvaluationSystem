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

class County {
    constructor(name, numofplayer, months) {
        this.name = name;
        this.numofplayer = numofplayer;
        this.months = months;
    }
}
class SortCounty {
    constructor(name, nop, mhp, mlp, mmp) {
        this.name = name;
        this.nop = nop;
        this.mhp = mhp;
        this.mlp = mlp;
        this.mmp = mmp;
    }
}
class MonthforCounty {
    constructor(TotalHighestPeriod, TotalLowestPeriod, TotalMediumPeriod) {
        this.TotalHighestPeriod = TotalHighestPeriod;
        this.TotalLowestPeriod = TotalLowestPeriod;
        this.TotalMediumPeriod = TotalMediumPeriod;
    }
}
const COUNTYOPERATIONS = {
    FindUniqueCounty(Players) {
        var Counties = [];
        var UniqueCounty = [];
        //   console.log('In county operation...',Players.length);
        for (var i in Players) {
            if (Players[i].country.length > 0 && Players[i].country.charAt(0) != '-') {
                Counties.push(Players[i].country);
            }
        }
        //   Counties.forEach((i)=>console.log(i));
        //   console.log('Length of All County = ',Counties.length);
        UniqueCounty = [...new Set(Counties)];
        //   Counties.filter(
        //       function(a,b,c){
        //           return c.indexOf(a)==b;
        //       }
        //   )
        //   Counties.filter((a,b,c)=>{return c.indexOf(a)===b;});
        //   console.log('Unique = ',Counties,Counties.length);
        //   console.log(UniqueCounty,UniqueCounty.length); 
        return UniqueCounty;
    },
    CreateArrayofPlayerObj(DBOBJ) {
        var TopPlayer = [];
        var TopperPlayerNames = [];
        var PlayerCounties = [];
        var TopperPlayerRanks = [];
        var name = '';

        var country = '';
        var playerid = 0;
        var months = {};
        var PlayerObj = {};
        for (let i in DBOBJ) {

            for (let [k, v] of Object.entries(JSON.parse(JSON.stringify(DBOBJ[i])))) {
                if (k == 'name') {
                    name = v;
                }
                if (k == 'playerid') {
                    playerid = v;
                }
                if (k == 'county') {
                    country = v;
                }
                if (k == 'months') {

                    var DecObj = {},
                        JanObj = {},
                        FebObj = {},
                        OnlyOneMonthObj = {};
                    for (let [k1, v1] of Object.entries(JSON.parse(JSON.stringify(v)))) {
                        if (k1 == 'dec') {
                            DecObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);

                        }
                        if (k1 == 'jan') {
                            JanObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);

                        }
                        if (k1 == 'feb') {
                            FebObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);
                        }
                    }
                    months = new Months(DecObj, JanObj, FebObj);
                }
                PlayerObj = new Player(name, country, playerid, months);
            }
            TopPlayer.push(PlayerObj);
        }
        return TopPlayer;
    },
    CreatePlayerObj(DBOBJ) {
        var TopPlayer = [];
        var TopperPlayerNames = [];
        var PlayerCounties = [];
        var TopperPlayerRanks = [];
        var name = '';

        var country = '';
        var playerid = 0;
        var months = {};
        var PlayerObj = {};
        // console.log(DBOBJ,typeof DBOBJ);
        for (let [k, v] of Object.entries(JSON.parse(JSON.stringify(DBOBJ)))) {
            if (k == 'name') {
                name = v;
            }
            if (k == 'playerid') {
                playerid = v;
            }
            if (k == 'county') {
                country = v;
            }
            if (k == 'months') {

                var DecObj = {},
                    JanObj = {},
                    FebObj = {},
                    OnlyOneMonthObj = {};
                for (let [k1, v1] of Object.entries(JSON.parse(JSON.stringify(v)))) {
                    if (k1 == 'dec') {
                        DecObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);

                    }
                    if (k1 == 'jan') {
                        JanObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);

                    }
                    if (k1 == 'feb') {
                        FebObj = new Month(v1['previousrank'], v1['currentrank'], v1['inactiveperiod'], v1['points']);
                    }
                }
                months = new Months(DecObj, JanObj, FebObj);
            }
            PlayerObj = new Player(name, country, playerid, months);
        }
        return PlayerObj;
    },
    CreateArrayofCountyObj(d) {
        var ArrayofPlayerObj = this.CreateArrayofPlayerObj(d);
        // console.log('In create c many obj', ArrayofPlayerObj.length, d.length);
        var PlayerObj = this.CreatePlayerObj(ArrayofPlayerObj[0]);
        // console.log('In create c one many obj', PlayerObj.name);
        var ArrayofCountyObj = [];
        for (var i in ArrayofPlayerObj) {
            // console.log(ArrayofPlayerObj[i]);
            // console.log('COUNTY FOR ARRAY = ',this.CreateCountyOneObj2(ArrayofPlayerObj[i]));
            ArrayofCountyObj.push(this.CreateCountyOneObj2(ArrayofPlayerObj[i]));
        }
        // console.log('length of Counties ',ArrayofCountyObj.length);
        // console.log(ArrayofCountyObj[0]);
        return ArrayofCountyObj;
    },
    CreateCountyOneObj(d) {
        // console.log(d);
        var PlayerObj = this.CreatePlayerObj(d[0]);
        // console.log('In create c one obj', d.length, PlayerObj.name);
        var countyname = '';
        var numberofPlayer = 0;
        var JanCountyObj = {};
        var DecCountyObj = {};
        var FebCountyObj = {};
        var MonthCounty = {};
        var CountyObj = {};
        for (let [k1, v1] of Object.entries(PlayerObj)) {
            if (k1 == 'country') {
                countyname = v1;
            }
            if (k1 == 'months') {
                for (let [k2, v2] of Object.entries(v1)) {
                    // console.log('MONTHS  = ',v1);
                    if (k2 == 'jan') {
                        if (v2['incativeperiod'] == 5) {
                            JanCountyObj = new MonthforCounty(1, 0, 0);
                        }
                        if (v2['incativeperiod'] == 0) {
                            JanCountyObj = new MonthforCounty(0, 1, 0);
                        }
                        if (v2['incativeperiod'] > 0 && v2['incativeperiod'] < 5) {
                            // console.log('period = ',v2['incativeperiod']);
                            JanCountyObj = new MonthforCounty(0, 0, 1);
                        }


                    }
                    if (k2 == 'feb') {
                        if (v2['incativeperiod'] == 5) {
                            FebCountyObj = new MonthforCounty(1, 0, 0);
                        }
                        if (v2['incativeperiod'] == 0) {
                            FebCountyObj = new MonthforCounty(0, 1, 0);
                        }
                        if (v2['incativeperiod'] > 0 && v2['incativeperiod'] < 5) {
                            // console.log('period = ',v2['incativeperiod']);
                            FebCountyObj = new MonthforCounty(0, 0, 1);
                        }
                    }
                    if (k2 == 'dec') {
                        if (v2['incativeperiod'] == 5) {
                            DecCountyObj = new MonthforCounty(1, 0, 0);
                        }
                        if (v2['incativeperiod'] == 0) {

                            DecCountyObj = new MonthforCounty(0, 1, 0);
                        }
                        if (v2['incativeperiod'] > 0 && v2['incativeperiod'] < 5) {
                            // console.log('period = ',v2['incativeperiod']);
                            DecCountyObj = new MonthforCounty(0, 0, 1);
                        }

                    }
                }
                MonthCounty = new Months(DecCountyObj, JanCountyObj, FebCountyObj);


            }
            CountyObj = new County(countyname, 1, MonthCounty);
        }
        // console.log('Obj of County', CountyObj);
        return CountyObj;
    },
    CreateCountyOneObj2(d) {
        // console.log('in CreateCountyOneObj2 ',d);
        // var PlayerObj = this.CreatePlayerObj(d);
        // console.log('in CreateCountyOneObj2 PLAYER',PlayerObj);

        // console.log('In create c one obj', d.length, PlayerObj.name);
        var countyname = '';
        var numberofPlayer = 0;
        var JanCountyObj = {};
        var DecCountyObj = {};
        var FebCountyObj = {};
        var MonthCounty = {};
        var CountyObj = {};
        for (let [k1, v1] of Object.entries(d)) {
            if (k1 == 'country') {
                countyname = v1;
            }
            if (k1 == 'months') {
                for (let [k2, v2] of Object.entries(v1)) {
                    // console.log('MONTHS  = ',v1);
                    if (k2 == 'jan') {
                        if (v2['incativeperiod'] == 5) {
                            JanCountyObj = new MonthforCounty(1, 0, 0);
                        }
                        if (v2['incativeperiod'] == 0) {
                            JanCountyObj = new MonthforCounty(0, 1, 0);
                        }
                        if (v2['incativeperiod'] > 0 && v2['incativeperiod'] < 5) {
                            // console.log('period = ',v2['incativeperiod']);
                            JanCountyObj = new MonthforCounty(0, 0, 1);
                        }


                    }
                    if (k2 == 'feb') {
                        if (v2['incativeperiod'] == 5) {
                            FebCountyObj = new MonthforCounty(1, 0, 0);
                        }
                        if (v2['incativeperiod'] == 0) {
                            FebCountyObj = new MonthforCounty(0, 1, 0);
                        }
                        if (v2['incativeperiod'] > 0 && v2['incativeperiod'] < 5) {
                            // console.log('period = ',v2['incativeperiod']);
                            FebCountyObj = new MonthforCounty(0, 0, 1);
                        }
                    }
                    if (k2 == 'dec') {
                        if (v2['incativeperiod'] == 5) {
                            DecCountyObj = new MonthforCounty(1, 0, 0);
                        }
                        if (v2['incativeperiod'] == 0) {

                            DecCountyObj = new MonthforCounty(0, 1, 0);
                        }
                        if (v2['incativeperiod'] > 0 && v2['incativeperiod'] < 5) {
                            // console.log('period = ',v2['incativeperiod']);
                            DecCountyObj = new MonthforCounty(0, 0, 1);
                        }

                    }
                }
                MonthCounty = new Months(DecCountyObj, JanCountyObj, FebCountyObj);


            }
            CountyObj = new County(countyname, 1, MonthCounty);
        }
        // console.log('Obj of County', CountyObj);
        return CountyObj;
    },
    CreateMainCounty(ArrayofCounty) {
        // console.log('In array of main county...');
        var MainCountyObj = {};
        var TotalNumberofPlayer = ArrayofCounty.length;
        var name = '';
        var CountDecH = 0;
        var CountJanH = 0;
        var CountFebH = 0;
        var CountDecL = 0;
        var CountJanL = 0;
        var CountFebL = 0;
        var CountDecM = 0;
        var CountJanM = 0;
        var CountFebM = 0;
        for (var i in ArrayofCounty) {
            name = ArrayofCounty[i].name;
            //  console.log(ArrayofCounty[i]);
            for (let [k, v] of Object.entries(ArrayofCounty[i].months)) {
                if (k == 'dec') {
                    if (v['TotalHighestPeriod'] == 1) {
                        CountDecH++;
                    }
                    if (v['TotalLowestPeriod'] == 1) {
                        CountDecL++;
                    }
                    if (v['TotalMediumPeriod'] == 1) {
                        CountDecM++;
                    }
                }
                if (k == 'jan') {
                    if (v['TotalHighestPeriod'] == 1) {
                        CountJanH++;
                    }
                    if (v['TotalLowestPeriod'] == 1) {
                        CountJanL++;
                    }
                    if (v['TotalMediumPeriod'] == 1) {
                        CountJanM++;
                    }
                }
                if (k == 'feb') {
                    if (v['TotalHighestPeriod'] == 1) {
                        CountFebH++;
                    }
                    if (v['TotalLowestPeriod'] == 1) {
                        CountFebL++;
                    }
                    if (v['TotalMediumPeriod'] == 1) {
                        CountFebM++;
                    }
                }
            }
        }
        MainCountyObj = new County(name, TotalNumberofPlayer, new Months(new MonthforCounty(CountDecH, CountDecL, CountDecM),
            new MonthforCounty(CountJanH, CountJanL, CountJanM), new MonthforCounty(CountFebH, CountFebL, CountFebM)));
        //  console.log('Main County large Obj',MainCountyObj);
        return MainCountyObj;
    },
    GetTop5MonthWise(month, ARR) {
        var ArratTop5 = [];
        var c = 1;
        //    console.log('In top 5 hi p ',ARR.length);
        for (var i in ARR) {
            for (let [k, v] of Object.entries(ARR[i])) {
                if (k == 'months') {
                    for (let [k2, v2] of Object.entries(v)) {
                        if (k2 == month) {
                            console.log('hp = ', v2['TotalHighestPeriod']);
                            console.log('lp = ', v2['TotalLowestPeriod']);
                            console.log('mp = ', v2['TotalMediumPeriod']);
                            ArratTop5.push(new SortCounty(ARR[i].name, ARR[i].numofplayer, v2['TotalHighestPeriod'], v2['TotalLowestPeriod'], v2['TotalMediumPeriod']));
                        }
                    }
                }
            }
        }
        //    console.log("ANS COUNTY = ",ArratTop5);
        // var SDF=[4,5,6,7,4,8,0,-1,-2];
        // SDF.sort((a,b)=>{return a-b;});
        // console.log('SDF = ',SDF);
        var SortNOP = ArratTop5.sort(function(a, b){
            return b.nop - a.nop;
        });
        // var SortHP = ArratTop5.sort(function(a, b){
        //     return b.mhp - a.mhp;
        // });
        // var SortLP = ArratTop5.sort((a, b) => {
        //     return b.mlp - a.mlp;
        // });
        // var SortMP = ArratTop5.sort((a, b) => {
        //     return b.mmp - a.mmp;
        // });
        // console.log('Sort NOP= ');
        // SortNOP.forEach((a) => {
        //     console.log(a.nop, typeof a.nop);
        // });
        // console.log('Sort HP= ');
        // SortHP.forEach((a) => {
        //     console.log(a.mhp, typeof a.mhp);
        // });
        // console.log('Sort LP= ');
        // SortLP.forEach((a) => {
        //     console.log(a.mlp);
        // });
        // console.log('Sort MP= ');
        // SortMP.forEach((a) => {
        //     console.log(a.mmp);
        // });
        // console.log(ArratTop5.sort());
      return SortNOP;
    },
    GetBelow5MonthWise(month, ARR){
        var ArratTop5 = [];
        var c = 1;
        //    console.log('In top 5 hi p ',ARR.length);
        for (var i in ARR) {
            for (let [k, v] of Object.entries(ARR[i])) {
                if (k == 'months') {
                    for (let [k2, v2] of Object.entries(v)) {
                        if (k2 == month) {
                            console.log('hp = ', v2['TotalHighestPeriod']);
                            console.log('lp = ', v2['TotalLowestPeriod']);
                            console.log('mp = ', v2['TotalMediumPeriod']);
                            ArratTop5.push(new SortCounty(ARR[i].name, ARR[i].numofplayer, v2['TotalHighestPeriod'], v2['TotalLowestPeriod'], v2['TotalMediumPeriod']));
                        }
                    }
                }
            }
        }
        //    console.log("ANS COUNTY = ",ArratTop5);
        // var SDF=[4,5,6,7,4,8,0,-1,-2];
        // SDF.sort((a,b)=>{return a-b;});
        // console.log('SDF = ',SDF);
        var SortNOP = ArratTop5.sort(function(a, b){
            return a.nop - b.nop;
        });
        // var SortHP = ArratTop5.sort(function(a, b){
        //     return b.mhp - a.mhp;
        // });
        // var SortLP = ArratTop5.sort((a, b) => {
        //     return b.mlp - a.mlp;
        // });
        // var SortMP = ArratTop5.sort((a, b) => {
        //     return b.mmp - a.mmp;
        // });
        // console.log('Sort NOP= ');
        // SortNOP.forEach((a) => {
        //     console.log(a.nop, typeof a.nop);
        // });
        // console.log('Sort HP= ');
        // SortHP.forEach((a) => {
        //     console.log(a.mhp, typeof a.mhp);
        // });
        // console.log('Sort LP= ');
        // SortLP.forEach((a) => {
        //     console.log(a.mlp);
        // });
        // console.log('Sort MP= ');
        // SortMP.forEach((a) => {
        //     console.log(a.mmp);
        // });
        // console.log(ArratTop5.sort());
      return SortNOP;
    }
}
module.exports = COUNTYOPERATIONS;
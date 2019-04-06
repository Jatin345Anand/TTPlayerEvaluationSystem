window.addEventListener('load',init);
function init(){
    console.log('load top 10...');
    document.querySelector("#showchart").addEventListener('click',doshow);
}
function doshow(){
    console.log('Show chart....');
    let myChart = document.getElementById('myChart').getContext('2d');
    let barChart = new Chart(myChart,{
        type:'bar',// bar,pie,doughnut,radar,polarArea,horizontalBar
        data:{
            labels:TopperPlayerNames,
            datasets:[{
                label:'Rank',
                data:TopperPlayerPoints
            }

            ]
        },
        options:{}
    });

}
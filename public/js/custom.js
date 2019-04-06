window.addEventListener('load',init)
function init(){
    console.log('in init....')
    document.querySelector('#print').addEventListener('click',doprint);
}
function doprint(){
    window.print();
}
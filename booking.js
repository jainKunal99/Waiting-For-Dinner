window.onload=function(){

var arrayOfButtons = document.querySelectorAll('button');
var DIV00 = document.getElementById('div-0');
var DIV01 = document.getElementById('div-1');
var DIV02 = document.getElementById('div-2');
var DIV03 = document.getElementById('div-3');
var DIV04 = document.getElementById('div-4');
var DIV05 = document.getElementById('div-5');
var DIV06 = document.getElementById('div-6');
var DIV07 = document.getElementById('div-7');
var DIV08 = document.getElementById('div-8');
var DIV09 = document.getElementById('div-9');
var DIV10 = document.getElementById('div-10');
var btn1 = document.getElementsByClassName('button-1');
var btn2 = document.getElementsByClassName('button-2');
var btn3 = document.getElementsByClassName('button-3');
var btn4 = document.getElementsByClassName('button-4');
var btn5 = document.getElementsByClassName('button-5');
var btn6 = document.getElementsByClassName('button-6');
var btn7 = document.getElementsByClassName('button-7');
var btn8 = document.getElementsByClassName('button-8');
var btn9 = document.getElementsByClassName('button-9');
var btn10 = document.getElementsByClassName('button-10');

var arrayOfButtonsForBooking = document.getElementsByClassName('btnxx');

//function for sending post request that contain information about the booked table 
for(var iterator = 0; iterator< arrayOfButtonsForBooking.length; ++iterator){
    var item = arrayOfButtonsForBooking[iterator];
    item.addEventListener('click',(item)=>{
        var id = item.target.id;
        var boolean1 = document.getElementById('cb1').checked;
        var boolean2 = document.getElementById('cb2').checked;
        var boolean3 = document.getElementById('cb3').checked;
        var boolean4 = document.getElementById('cb4').checked;
        var reqString = document.getElementById('ip').value;
        var requirements = {
            candles: boolean1,
            flowers: boolean2,
            chocolates: boolean3,
            card: boolean4,
            userRequirements: reqString
        }
        console.log("##############################################################################");
        console.log(requirements);
        //---AJAX request for updation---//
        $.ajax({
            url: '/updateReservationStatus',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "ID" : id , "requirements": requirements }),
            success: function(res){
                 console.log('post request sent ot server file')
            }
        })

    });

}

arrayOfButtons[1].addEventListener('click', b1);
arrayOfButtons[2].addEventListener('click', b2);
arrayOfButtons[3].addEventListener('click', b3);
arrayOfButtons[4].addEventListener('click', b4);
arrayOfButtons[5].addEventListener('click', b5);
arrayOfButtons[6].addEventListener('click', b6);
arrayOfButtons[7].addEventListener('click', b7);
arrayOfButtons[8].addEventListener('click', b8);
arrayOfButtons[9].addEventListener('click', b9);
arrayOfButtons[10].addEventListener('click', b10);

function x(){
    DIV00.style.display = "none"
    DIV01.style.display = "none";
    DIV02.style.display = "none";
    DIV03.style.display = "none";
    DIV04.style.display = "none";
    DIV05.style.display = "none";
    DIV06.style.display = "none";
    DIV07.style.display = "none";
    DIV08.style.display = "none";
    DIV09.style.display = "none";
    DIV10.style.display = "none";
}

function b1(){
    x();
    DIV01.style.display = "block";
}
function b2(){
    x();
    DIV02.style.display = "block";
}
function b3(){
    x();
    DIV03.style.display = "block";
}
function b4(){
    x();
    DIV04.style.display = "block";
}
function b5(){
    
    x();
    DIV05.style.display = "block";    
}
function b6(){
    x();
    DIV06.style.display = "block";
}
function b7(){
    x();
    DIV07.style.display = "block";
}
function b8(){
    x();
    DIV08.style.display = "block";
    
}
function b9(){
    x();
    DIV09.style.display = "block";   
}
function b10(){
    x();
    DIV10.style.display = "block";
}


}
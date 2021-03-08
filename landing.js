
//code for running text animation on the landing page
var arr = ["Hungry ?",
            "Want a Quick Snack ?",
            "Craving for Food ?",
            "Don't Worry !",
            "We'll be there in no time.",
            "Unexpected guests?"];
var pos = 0;
var myFunction = function(){
    document.querySelector("#runningText span").innerHTML = arr[pos];
    if(pos>=(arr.length-1))
    pos = 0;
    else
    pos+=1;
};
var timer = setInterval(myFunction,1000);




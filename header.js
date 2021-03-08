window.onload=function(){

var   arrayOfButtons = document.querySelectorAll('button');
const snacksDiv = document.getElementById('snacks');
const punjabiDiv = document.getElementById('punjabi');
const fastfoodDiv = document.getElementById('fast-food');
const drinksicecream = document.getElementById ('drinks')
const chaatsDiv = document.getElementById ('chaats')
const icecreamDiv = document.getElementById ('ice-cream')  
const vegDiv = this.document.getElementById('VEG-dishes'); 
const nonvegDiv = this.document.getElementById('NONVEG-dishes'); 
const vegOption = document.getElementsByTagName('button')[8];
const nonvegOption = document.getElementsByTagName('button')[9];
var ItemNames = [];
var ItemPrices = [];
var ItemQuantities = [];

        snacksDiv.addEventListener('click', addRemoveItem);
        punjabiDiv.addEventListener('click', addRemoveItem);
        chaatsDiv.addEventListener('click', addRemoveItem);
        vegDiv.addEventListener('click',addRemoveItem);
        nonvegDiv.addEventListener('click',addRemoveItem);
        
        function addRemoveItem(event){
            
            console.log(event.target);
            var rateString1 = event.target.parentNode.parentNode.parentNode.previousElementSibling.textContent;     
            var rateString2 = rateString1.substr(3);
            var rate = parseInt(rateString2, 10);
            
            if(event.target.classList.contains("fa-minus")){
                
                if(parseInt(event.target.parentNode.parentNode.nextElementSibling.innerHTML, 10) != 0){
                    var count = parseInt(event.target.parentNode.parentNode.nextElementSibling.innerHTML, 10);
                    var name = event.target.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                    count--;
                    var amount = rate*count;
                    event.target.parentNode.parentNode.nextElementSibling.innerHTML = count.toString(10); 
                    event.target.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.textContent = 'Rs.' + amount.toString(10);
                    checkItem(name, rate, count);
                    
                }
            }
            
            if(event.target.classList.contains("fa-plus")){           
                var count = parseInt(event.target.parentNode.parentNode.previousElementSibling.innerHTML, 10);
                var name = event.target.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                count++;
                var amount = count*rate;
                event.target.parentNode.parentNode.previousElementSibling.innerHTML = count.toString(10);
                event.target.parentNode.parentNode.nextElementSibling.textContent = 'Rs.' + amount.toString(10);
                checkItem(name, rate, count);
            }

            if(event.target.classList.contains("fa-thumbs-up")){
                console.log(event.target);
                var name = event.target.parentNode.parentNode.previousElementSibling.previousElementSibling;
                console.log(name);
            }

            if(event.target.classList.contains("fa-thumbs-down")){
                console.log(event.target);

            }

            if(event.target.classList.contains("fa-star")){
                /*event.target.classList.remove('far');
                event.target.classList.add('fas');
                */if(event.target.classList.contains('star-1')){

                event.target.classList.remove('far');
                event.target.classList.add('fas');

               }else if(event.target.classList.contains('star-2')){

                event.target.classList.remove('far');
                event.target.classList.add('fas');
                event.target.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.classList.add('fas');

            }else if(event.target.classList.contains('star-3')){
                
                event.target.classList.remove('far');
                event.target.classList.add('fas');
                event.target.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.classList.add('fas');
                event.target.previousElementSibling.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.previousElementSibling.classList.add('fas');

            }else if(event.target.classList.contains('star-4')){

                
                event.target.classList.remove('far');
                event.target.classList.add('fas');
                event.target.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.classList.add('fas');
                event.target.previousElementSibling.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.previousElementSibling.classList.add('fas');
                event.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.add('fas');

               }else{

                
                event.target.classList.remove('far');
                event.target.classList.add('fas');
                event.target.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.classList.add('fas');
                event.target.previousElementSibling.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.previousElementSibling.classList.add('fas');
                event.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.add('fas');
                event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('far');
                event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.add('fas');

               }
            }

        }

        function checkItem(name, rate, count){
            var pos;                            //stores the position
            var zero;                           //stores position of dish whose quantity is zero
            if(ItemNames.includes(name))        //checking if the item already exists in array
                pos = ItemNames.indexOf(name);
            else
                pos = ItemNames.length;         
    
            ItemNames[pos] = name;              //updating name, rate and quantity 
            ItemPrices[pos] = rate;
            ItemQuantities[pos] = count;

            console.log(ItemQuantities);
            console.log(ItemNames);
            console.log(ItemPrices);

            if(ItemQuantities.includes(0)){
                zero = ItemQuantities.indexOf(0);
                ItemQuantities.splice(zero, 1);
                ItemPrices.splice(zero, 1);
                ItemNames.splice(zero, 1);
            }
        }

        arrayOfButtons[1].addEventListener('click', b1);
        arrayOfButtons[2].addEventListener('click', b2);
        arrayOfButtons[3].addEventListener('click', b3);
        arrayOfButtons[4].addEventListener('click', b4);
        arrayOfButtons[5].addEventListener('click', b5);
        arrayOfButtons[6].addEventListener('click', b6);
        arrayOfButtons[7].addEventListener('click', b7);
        vegOption.addEventListener('click',b8);
        nonvegOption.addEventListener('click',b9);

        function b1(){

            snacksDiv.style.display  = "block";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    
        function b2(){

            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "block";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    
        function b3(){

            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "block";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    
        function b4(){

            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "block";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    
        function b5(){

            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "block";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    
        function b6(){

            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "block";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    

        function b7(){
            
            var orderType; 
            var ele = document.getElementsByName('order'); 
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
                orderType = ele[i].value; 
            }
            var x = document.getElementById('desc').value;

            //POST REQUEST FOR BILL DETAILS
           $.ajax({
               url: '/testing',
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify({ "ItemNames" : ItemNames, "ItemPrices": ItemPrices, "ItemQuantities": ItemQuantities, orderType: orderType , x: x}),
               success: function(res){
                    console.log('post request sent ot server file')
               }
           })

            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "none";
        }    

        function b8(){
            
            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "block";
            nonvegDiv.style.display = "none";
        }
        function b9(){
            
            snacksDiv.style.display  = "none";
            punjabiDiv.style.display  = "none";
            fastfoodDiv.style.display  = "none";
            drinksicecream.style.display  = "none";
            chaatsDiv.style.display  = "none";
            icecreamDiv.style.display  = "none";
            vegDiv.style.display = "none";
            nonvegDiv.style.display = "block";
        }
}


window.onload = function () {
    var newForm = document.querySelector("#newItem");
    var inputs = document.querySelectorAll(".numBox");
    var sub = document.querySelector("#newBtn");


    function valid() {
        if (inputs[0].value.length > 1 && inputs[1].value > 0 && inputs[2].value > 0) {
            newForm.action = "/manager/Inventory";
            newForm.method = "POST"
        }
        else {
            newForm.action = "";
            newForm.method="";
        }
    }
    sub.addEventListener("focus", valid);
    sub.addEventListener('mouseover', valid);
    var btnxs = document.querySelector('.btnxs');
    btnxs.addEventListener("mouseover", upLog);
    btnxs.addEventListener("focus", upLog);
    var radios = document.querySelectorAll(".radio");
    radios[0].addEventListener("focus", upLog);
    radios[0].addEventListener("mouseover", upLog);
    radios[1].addEventListener("focus", upLog);
    radios[1].addEventListener("mouseover", upLog);
    function upLog() {
        var hid = document.querySelector('#hidden');
        var spans = document.querySelectorAll("span.values");
        var qtys = document.querySelectorAll("input.alterQty");
        var logCost = 0;
        for (var i = 0; i < spans.length; i++) {
            var price = Number(spans[i].innerHTML);
            var qt = Number(qtys[i].value);
            if (qt < 0)
                qtys[i].value = Math.abs(qt);
            logCost += price * qt;
        }
        console.log(logCost);
        hid.value = logCost;
    }
}


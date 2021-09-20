let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let input = document.getElementById("input");
let historylist = document.getElementById("historyList");

function createOption(x, y, z) {
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value", toNum(z))
    o.appendChild(t);
    x.appendChild(o);
}

function toNum(x) {
    return Number(x.replace(",", ""));
}
for (x in data.rates) {
    createOption(from, x, data.rates[x]);
    createOption(to, x, data.rates[x]);

}

document.getElementById("calc").addEventListener("submit", function(e) {
    e.preventDefault();
    //get state
    let x = input.value;
    let y = from.value;
    let fromText = x + " " + from.options[from.selectedIndex].innerText;
    let z = to.value;
    let toText = to.options[to.selectedIndex].innerText;
    let date = new Date().toLocaleString();


    //process
    let first = y * x;
    let second = first / z;
    let resultvalue = second.toFixed(2);

    //set state
    result.innerHTML = resultvalue;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
    let arr = [date, fromText, toText, resultvalue];

    createTr(arr);
    storeStorage();


});


function createTr(x, id) {
    let rowSpacer = document.getElementById("rowSpacer");
    if (rowSpacer) {
        rowSpacer.remove();
    }

    let tr = document.createElement("tr");
    x.map(function(el) {
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })

    historylist.appendChild(tr);
}




function storeStorage() {
    localStorage.setItem("record", historylist.innerHTML);

}


(function() {
    if (localStorage.getItem("record")) {
        historylist.innerHTML = localStorage.getItem("record");
    } else {
        historylist.innerHTML = `<tr id="rowSpacer"><td colspan=4>There is no Record</td></tr>`;
    }
})();
document.getElementById("clearHistory").addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
})

function changeMode() {
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun");
}
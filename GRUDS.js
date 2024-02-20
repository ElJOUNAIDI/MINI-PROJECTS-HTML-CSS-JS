// get total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catecory = document.getElementById("catecory");
let btn1 = document.getElementById("btn1");
let mod = "Create";
let tmp ;

function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background ="green" ;
    }
    else{
        total.innerHTML = "";
        total.style.background ="red" ;
    }
}
// get total
// Create product

let datapro ;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}
else{
    datapro = [];
}

btn1.onclick = function(){
    let newpro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catecory:catecory.value
    }
    if( title.value != "" 
    && price.value != "" 
    && catecory.value != "" 
    && newpro.count < 100
    )
    {
        if(mod === "Create"){
            // count
            if(newpro.count > 1){
                for(let i = 0 ; i < newpro.count ; i++){
                    datapro.push(newpro);
                }
            }
            else{
                datapro.push(newpro);
            }
            // count
        }
        else{
            datapro[tmp] = newpro;
            mod = "Create";
            count.style.display = ("block");
            btn1.innerHTML ="CREATE";
        }  
        clearData();
    }
    // LOCALSTOREG // save 
    localStorage.setItem('product', JSON.stringify(datapro) );
    // LOCALSTOREG
    //  clear input
    showData();
}
// Create product
//  clear input
    function clearData(){
        title.value = "";
        price.value = "";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        total.innerHTML = "";
        count.value = "";
        catecory.value = "";
    }
    //  clear input
// read
    function showData(){
        getTotal();
        let table = "";
        for(let i = 0 ; i< datapro.length ; i++){
            table +=  `<tr>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catecory}</td>
            <td><button id="update" onclick="updatdata(${i})">update</button></td>
            <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
        </tr>`
        }
        document.getElementById("tbody").innerHTML=table;
        let btnDeletAll = document.getElementById("deletall");
        if(datapro.length > 0){
            btnDeletAll.innerHTML =`<button onclick="deletAllData()"  class="BTN1" type="" id="delete">DELETE ALL ((${datapro.length})</button>`
        }
        else{
            btnDeletAll.innerHTML = ``;
        }
    }
    showData();


// delete
    function deletdata(i){
        datapro.splice(i,1);
        localStorage.product = JSON.stringify(datapro);
        showData();
    }
    // delete
    // delete All
    function deletAllData(){
        datapro.splice(0);
        localStorage.clear();
        showData()
    }
    // delete All
// update
    function updatdata(i){
        title.value = datapro[i].title;
        price.value = datapro[i].price;
        taxes.value = datapro[i].taxes;
        ads.value = datapro[i].ads;
        getTotal()
        count.style.display = ("none");
        catecory.value = datapro[i].catecory;
        btn1.innerHTML = "Update";
        mod = "Update";
        tmp = i;
        scroll({
            top:0,
            behavior:"smooth"
        })
    }
// update
// search
    let search_mod = "title";
    function getSearch(id){
        let search  = document.getElementById("search");
        if( id == "by-title"){
   
             search_mod;  
        }
        else{
            search_mod = "category";
        }
        search.placeholder = "Search By " + search_mod;
        search.focus()
        search.value = "";
        showData();
    }


    function search_data(value){
        let table = "";
        for( let i = 0 ; i < datapro.length ; i++)
        {
            if(search_mod == "title")
            {
                if(datapro[i].title.includes(value.toLowerCase()))
                    {
                        table +=  `
                        <tr>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].catecory}</td>
                        <td><button id="update" onclick="updatdata(${i})">update</button></td>
                        <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
                        </tr>`
                }     
            }    
            else{
                if(datapro[i].catecory.includes(value.toLowerCase())){
                        table +=  `
                        <tr>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].catecory}</td>
                        <td><button id="update" onclick="updatdata(${i})">update</button></td>
                        <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
                    </tr>`
                }    
            }
        }
        document.getElementById("tbody").innerHTML=table;
    // sea
 }
// clean data
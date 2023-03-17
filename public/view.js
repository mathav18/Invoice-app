//show Delete Box Function
$(document).ready(function(){
    $(".deleteButton").click(function(){
      $("#deleteBox").slideToggle("slow");
    });
  });
//Hide delete Box Function
  $(document).ready(function(){
    $(".hai").click(function(){
      $("#deleteBox").slideToggle("slow");
    });
  });

  
//show From Function
$(document).ready(function(){
    $(".hde").click(function(){
      $("#hideDiv").slideToggle("slow");
    });
  });


//hide Form Function
$(document).ready(function(){
    $(".x").click(function(){
      $("#hideDiv").slideToggle("slow");
    });
  });
//Add Item List Box Function
function AddItem(){
    let area=document.getElementById("content1")
    let para=document.createElement('div')
    area.appendChild(para).id="itemList";
    let one=document.createElement("input")
    let two=document.createElement("input")
    let three=document.createElement("input")
    let four=document.createElement("input")
    let icon=document.createElement("i")
    para.appendChild(one).id="date";
    para.appendChild(two).id="date";
    para.appendChild(three).id="date";
    para.appendChild(four).id="date";
    para.appendChild(icon).id="waste"
    one.name="ItemName"
    two.name="Qty"
    three.name="price"
    four.name="total"
    one.type="text"
    two.type="number"
    three.type="number"
    four.type="number"
    two.setAttribute('oninput','totalAmmount(this)')
    three.setAttribute('oninput','totalAmmount2(this)')
    icon.setAttribute('onclick','removeItem(this)')
    icon.setAttribute('class',"fa-solid fa-trash");
    one.style.width="150px"
    two.style.width="50px"
    three.style.width="90px"
    four.style.width="70px"
    four.style.border="none";
    };


//Remove ItemList Function
function removeItem(ele){
      var parent = ele.parentNode;
      parent.remove();
    
   }


//calculate total Ammount
function totalAmmount(ele){
  console.log("hello")
  let sibling=ele.nextElementSibling;
  let sibling2=sibling.nextElementSibling;
  sibling2.value=sibling.value*ele.value;
}

function totalAmmount2(ele){
  console.log("hello")
let sibling=ele.nextElementSibling;
let sibling2=ele.previousElementSibling;
sibling.value=sibling2.value*ele.value;
}


function theme(ele){
  if(ele==undefined){
    
  }
  

let getTheme=localStorage.getItem('theme');
let linktag=document.getElementById("viewTheme");
  
 if(getTheme=='light'){
  localStorage.setItem('theme','dark');
    linktag.href='css/view.css'
    ele.src='/icon-sun.svg'
  }else{
    localStorage.setItem('theme','light');
     ele.src='icon-moon.svg';
    linktag.href='css/light-view.css'
   }
}

theme();
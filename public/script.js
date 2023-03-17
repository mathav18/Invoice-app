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

 $(document).ready(function(){
    $("#button").click(function(){
      $("#hideDiv").slideToggle("slow");
    });
  });

  
  $(document).ready(function(){
    $(".x").click(function(){
      $("#hideDiv").slideToggle("slow");
    });
  });


 function removeItem(ele){
    var parent = ele.parentNode;
    parent.remove();
    console.log("hello")
 }

 //calculate total Ammount
 function totalAmmount(ele){
     let sibling=ele.nextElementSibling;
     let sibling2=sibling.nextElementSibling;
     sibling2.value=sibling.value*ele.value;
 }

 function totalAmmount2(ele){
  let sibling=ele.nextElementSibling;
  let sibling2=ele.previousElementSibling;
  sibling.value=sibling2.value*ele.value;
}




 function paid(personid)
   {
       fetch('profile',
       {method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
         },
       body: JSON.stringify({
        givenid:personid
       }),
       redirect:"follow"
        }).then(
           function(response)
           {
            window.location.reload();
            return response;
  })};
  //filter function
  function filter(ele){
    let divArray=document.querySelectorAll("#contentDiv");
  if(ele.value=='All'){
    
    for(let i of divArray){
    
     
         i.style.display="block";
           i.style.display="grid"
       
       }
     

    return "";
  }
  
  console.log(divArray)
  
  for(let i of divArray){
   let baby=i.children[4];
   if(ele.value==baby.innerText.slice(1)){
      i.style.display="block";
        i.style.display="grid"
      }else{
        i.style.display="none";
      }
    }
  }

  function theme(ele){
    if(ele==undefined){
      
    }
   
  
  let getTheme=localStorage.getItem('theme');
  let linktag=document.getElementById("theme");
  console.log(linktag)
   if(getTheme=='light'){
    localStorage.setItem('theme','dark');
      linktag.href='css/index.css'
      ele.src='/icon-sun.svg'
    }else{
      localStorage.setItem('theme','light');
       ele.src='icon-moon.svg';
      linktag.href='css/light-index.css'
     }
  }

    theme();
const express=require('express');
const app=express();
const port=5110;
const database=require('mysql')
const bodyParser=require('body-parser');
const { render } = require('ejs');
const { json } = require('body-parser');



let db=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'Invoice_App'
});

let data;
let val={};
let dataArray=[];
let status;
let userId="#";
let alphateArray="QWERTYUIOPLKJHGFDSAZXCVBNM1234567890".split("");
let totalAmount=0;

let sql='select * from datas';
db.query(sql,(err,res)=>{
      data=res

  for(let i of data){
val={
    'status':i.status,
     'id':i.id,
     'userId':i.userId,
     'shop':JSON.parse(i.shop),
     'user':JSON.parse(i.userDetails),
     'date':JSON.parse(i.dateDetails),
     'item':JSON.parse(i.ItemDetails),
     'total':00
    }
   
for(let j of val.item.total){
    totalAmount+=Number(j);
};
    val.total=totalAmount;
    totalAmount=0;
    dataArray.push(val);
 }

   });

  

app.use(express.static('public'));
app.set("view engine","ejs");

var urlencode=bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());

app.get('/view',(req,res)=>{
    res.render('view');
})

app.get('/index',(req,res) => {
    let sql='select * from datas';
db.query(sql,(err,result)=>{
      data=result

  for(let i of data){
val={
    'status':i.status,
     'id':i.id,
     'userId':i.userId,
     'shop':JSON.parse(i.shop),
     'user':JSON.parse(i.userDetails),
     'date':JSON.parse(i.dateDetails),
     'item':JSON.parse(i.ItemDetails),
     'total':00
    }
   console.log(val.item.total)
   
for(let j=0;j<val.item.total.length;j++){
    totalAmount+=Number(val.item.total[j]);
}
    val.total=totalAmount;
    totalAmount=0;
    dataArray.push(val);
}
res.render('index',{dataArray});
});
  dataArray=[];
});

app.post('/addItem',urlencode,(req,res)=>{

const shop={
        'street':req.body.companyStreet,
        'city':req.body.city,
        'postCode':req.body.postCode,
        'country':req.body.country 
        }
let shopDetails=JSON.stringify(shop)

const user={
        'name':req.body.clientName,
        'email':req.body.clientEmail,
        'address':req.body.clientAddress,
        'city':req.body.clientCity,
        'postcode':req.body.clientPostCode,
        'country':req.body.clientCountry
      }
let userDetails=JSON.stringify(user)
    
const date={
        'date':req.body.date,
        'payement':req.body.Payement,
        'project':req.body.project
    }

  if((req.body.save)=="Save and Save"){
       status="Pending";
    }else{
      status="Draft";
    }
    
let dateDetails=JSON.stringify(date)
 
const item={
    'ItemName':req.body.ItemName,
    'Qty':req.body.Qty,
    'price':req.body.price,
    'total':req.body.total
   }
let ItemDetails=JSON.stringify(item);
console.log(item)
console.log(ItemDetails);
   for(let i=0;i<6;i++){
    let random=Math.floor(Math.random()*alphateArray.length);
    userId+=alphateArray[random];
   }

let sql=`insert into datas (userId,shop,userDetails,dateDetails,ItemDetails,status) values ('${userId}','${shopDetails}','${userDetails}','${dateDetails}','${ItemDetails}','${status}')`
    db.query(sql,(err,result)=>{
     sql='select * from datas';

db.query(sql,(err,result)=>{
      data=result;
      for(let i of data){
val={
     'status':i.status,
     'id':i.id,
     'userId':i.userId,
     'shop':JSON.parse(i.shop),
     'user':JSON.parse(i.userDetails),
     'date':JSON.parse(i.dateDetails),
     'item':JSON.parse(i.ItemDetails),
     'total':00
    }
   
for(let j of val.item.total){
    totalAmount+=Number(j);
}
console.log(totalAmount) 
    val.total=totalAmount;
    totalAmount=0;
     
  }
    res.redirect('/index');
 });


   userId="#";
  dataArray=[];
})
})

//go to view page
app.post('/ViewInvoice',urlencode,(req,res)=>{
    let id=req.body.id;
    let sql=`select * from datas  WHERE id=${id}`;
 db.query(sql,(err,result)=>{
  console.log(result);
for(let i of result){
        val={
             'status':i.status,
             'id':i.id,
             'userId':i.userId,
             'shop':JSON.parse(i.shop),
             'user':JSON.parse(i.userDetails),
             'date':JSON.parse(i.dateDetails),
             'item':JSON.parse(i.ItemDetails),
             'total':00
             }
    for(let j of val.item.total){
        totalAmount+=Number(j);
         }
             val.total=totalAmount;
    }
         res.render('view',{val});
    });
});

//delete Invoice
app.post('/deleteInvoice',urlencode,(req,res)=>{
let id=req.body.id
let sql=`DELETE FROM datas WHERE id= ${id}`;
 db.query(sql,(err,result)=>{
        
      })
     sql='select * from datas';
db.query(sql,(err,result)=>{
      data=result;

for(let i of data){
  val={
      'status':i.status,
      'id':i.id,
      'userId':i.userId,
      'shop':JSON.parse(i.shop),
      'user':JSON.parse(i.userDetails),
      'date':JSON.parse(i.dateDetails),
      'item':JSON.parse(i.ItemDetails),
      'total':val.item.total
    }
   for(let j of val.item.total){
    totalAmount+=Number(j);
   }
    val.total=totalAmount;
    totalAmount=0;
    dataArray.push(val)
   
}
 res.render('index',{dataArray});
});
  dataArray=[];
});

//upadate MarkAsPaid
app.post('/markAsPaid',urlencode,(req,res)=>{
let id=req.body.id;
    status='Paid'
let sql = `UPDATE datas SET status = '${status}' WHERE id=${id}`;
 db.query(sql,(err,result)=>{

    });
 sql=`select * from datas  WHERE id=${id}`;
    db.query(sql,(err,result)=>{
   for(let i of result){
           val={
                'status':i.status,
                'id':i.id,
                'userId':i.userId,
                'shop':JSON.parse(i.shop),
                'user':JSON.parse(i.userDetails),
                'date':JSON.parse(i.dateDetails),
                'item':JSON.parse(i.ItemDetails),
                'total':0
            }
   for(let j of val.item.total){
            totalAmount+=Number(j);
      }
     val.total=totalAmount;
     totalAmount=0;
 }
              res.render('view',{val});
     });
});


//change value
app.post('/ChangeInvoice',urlencode,(req,res)=>{

    let id=req.body.nameId;
    const shop={
        'street':req.body.companyStreet,
        'city':req.body.city,
        'postCode':req.body.postCode,
        'country':req.body.country 
        }
let shopDetails=JSON.stringify(shop)

const user={
        'name':req.body.clientName,
        'email':req.body.clientEmail,
        'address':req.body.clientAddress,
        'city':req.body.clientCity,
        'postcode':req.body.clientPostCode,
        'country':req.body.clientCountry
      }
let userDetails=JSON.stringify(user)
    
const date={
        'date':req.body.date,
        'payement':req.body.Payement,
        'project':req.body.project
    }

  if((req.body.save)=="Save and Save"){
       status="Pending";
    }else{
      status="Draft";
    }
    
let dateDetails=JSON.stringify(date)
 
const item={
    'ItemName':req.body.ItemName,
    'Qty':req.body.Qty,
    'price':req.body.price,
    'total':req.body.total
 }


 let ItemDetails=JSON.stringify(item);
 let sql = `UPDATE datas SET status='${status}',shop='${shopDetails}',userDetails='${userDetails}',dateDetails='${dateDetails}',ItemDetails='${ItemDetails}'  WHERE id=${id}`;
 db.query(sql,(err,result)=>{
    if(err){
        console.log(err);
    }
        console.log(result);
 })

 sql=`select * from datas  WHERE id='${id}'`;

 db.query(sql,(err,result)=>{
 
   for(let i of result){
           val={
                'status':i.status,
                'id':i.id,
                'userId':i.userId,
                'shop':JSON.parse(i.shop),
                'user':JSON.parse(i.userDetails),
                'date':JSON.parse(i.dateDetails),
                'item':JSON.parse(i.ItemDetails),
                'total':0
            }
   for(let j of val.item.total){
    console.log(j);
            totalAmount+=Number(j);
         }

     val.total=totalAmount;
     totalAmount=0;
        }

        res.render('view',{val});
     });
    });

app.post('/backToHome',urlencode,(req,res)=>{
    sql='select * from datas';

    db.query(sql,(err,result)=>{
          data=result;
          for(let i of data){
    val={
         'status':i.status,
         'id':i.id,
         'userId':i.userId,
         'shop':JSON.parse(i.shop),
         'user':JSON.parse(i.userDetails),
         'date':JSON.parse(i.dateDetails),
         'item':JSON.parse(i.ItemDetails),
         'total':00
        }
       
    for(let j of val.item.total){
        totalAmount+=Number(j);
    }


        val.total=totalAmount;
        totalAmount=0;
         dataArray.push(val);
      }
         res.redirect('/index');
     });
    dataArray=[];
})

app.listen(port, () => console.log("listening :",port));
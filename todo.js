import { baseUrl } from "./baseUrl.js";
let loginData = JSON.parse(localStorage.getItem("loginData"));

let form = document.getElementById("form");
form.addEventListener("submit", async  function () {
  event.preventDefault()
  let title=form.title.value
  let deadline=form.deadline.value
  let priority=form.priority.value
  let todoobj={title,
    deadline,
    priority,
    status:false,
    userid:loginData.id 
  }
  try{
   fetch(`${baseUrl}/user`,{
      method :"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(todoobj)
     })
     alert("Todos Added")
     loadData()


    //  console.log(data)



  }
  catch(err){
    console.log(err);
    alert("Something went wrong !!")
  }
 
})
async function getItem (){
  try{
    let res= await fetch(`${baseUrl}/user`)
    let data= await res.json()
    let userData=data.filter((elem)=> elem.userid==loginData.id)
    // let userTodos = data.filter((el, i) => el.userId == loginData.id);

    // return data
   console.log(userData)
  //  displayData(data)
  
   return userData
  
  }
  catch(err){
    console.log(err)
    alert("something went wrong in getitem")
  }
  }



function displayData(arr){
  let cont = document.getElementById("todo-container");
  cont.innerHTML = "";

 arr.map((elem)=>{
  let card = document.createElement("div");
  card.setAttribute("class", "todo-card");

  let title=document.createElement("h5")
  title.textContent=`Title :${elem.title}`
  let deadline=document.createElement("h5")
  deadline.textContent=`Deadline:${elem.deadline}`
  let d= new Date(elem.deadline)
  if(d< Date.now() && elem.status==false){
    card.classList.add("pending");


  }
  let priority=document.createElement("h5")
  priority.textContent=`Priority :${elem.priority}`
  let status=document.createElement("h5")
  status.textContent= elem.status==true? "Status Completed" : "Status Pending"
  let updateStatus=document.createElement("button")
  updateStatus.addEventListener("click",function(){
    updateStatus.textContent="Toogle Status"
    updateStatusfun(elem)
  })
  let deletetodo=document.createElement("button")
  deletetodo.addEventListener("click",function(){
    deletetodo.textContent="Delete Task"
   deletetodofun(elem)
  })


  cont.append(card)
card.append(title,deadline,priority,status,updateStatus,deletetodo)

 })
}



function deletetodofun(elem){
  fetch(`${baseUrl}/user/${elem.id}`,{
    method:"DELETE"
  }).then(()=>{
    alert("Task Deleted")
    loadData()
  }).catch((err)=> {
    console.log(err)
  })

}



 function updateStatusfun(elem){
  let updatedTodo = { ...elem, status:!elem.status};
  console.log(updatedTodo)
  fetch (`${baseUrl}/user/${elem.id}`,{
    method:"PATCH",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(updatedTodo)

  }).then(()=>{
  alert("Todos Upadted")
  loadData()
  }).catch((err)=>{
    alert("Something went wrong in upadating")
    console.log(err)
  })



 }



window.onload = async () => {
  let arr = await getItem();
  displayData(arr);
};

async function loadData() {
  let arr = await getItem();
    displayData(arr);
  
}




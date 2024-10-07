selectedRow = null;

document.querySelector("#list").addEventListener("click",(e)=>{
    const target = e.target;
    let mess;
    if(target.classList.contains("delete")){
        const mess = confirm("Are You Sure?");
        if(mess){
            target.closest("tr").remove();   
        }
    }
})


document.querySelector("#main-form"),addEventListener("submit",(e) =>{
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const age = document.getElementById("age").value;


  let nameError =  document.getElementById("nameError");
   nameError.innerHTML = "";

   let numberError = document.getElementById("numberError");
   numberError.innerHTML = "";

   let emailError = document.getElementById("emailError");
   emailError.innerHTML= ""

   let ageError = document.getElementById("ageError");
   ageError.innerHTML = ""
   

  if(name == "" || email == "" || number == "" || age == ""){
    nameError.innerHTML= "Enter your Name ";
    numberError.innerHTML= "Enter your Number";
    emailError.innerHTML= "Enter your Email";
    ageError.innerHTML= "Enter your Age";
    return;
  }
  

    if(selectedRow == null || name == ""){
        const list =  document.querySelector("#list");
        const row = document.createElement("tr");        
        row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${number}</td>
        <td>${age}</td>
        <td>
        <a href="#" class="btn btn-primary edit">Edit</a>
        <a href="#" class="btn btn-danger delete">Delete</a>
        </td>
        `;
        list.appendChild(row);
        document.getElementById("main-form").reset();


    }
    else{
        selectedRow.children[0].textContent = name;
        selectedRow.children[1].textContent = email;
        selectedRow.children[2].textContent = number;
        selectedRow.children[3].textContent = age;
        selectedRow = null;
        document.getElementById("main-form").reset();
 nameError = ""
    }

})



document.querySelector("#list").addEventListener("click",(e)=>{
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.closest("tr");
        document.getElementById("name").value = selectedRow.children[0].textContent;
        document.getElementById("email").value = selectedRow.children[1].textContent;
        document.getElementById("number").value = selectedRow.children[2].textContent;
        document.getElementById("age").value = selectedRow.children[3].textContent;
    }
    else{
        document.getElementById("main-form").reset();

    }
})
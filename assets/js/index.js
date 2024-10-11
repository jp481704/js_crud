let selectedRow = null;

function loadData() {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    const list = document.querySelector("#list");
    storedData.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.number}</td>
            <td>${item.age}</td>
            <td>
                <a href="#" class="btn btn-primary edit">Edit</a>
                <a href="#" class="btn btn-danger delete">Delete</a>
            </td>
        `;
        list.appendChild(row);
    });
}

document.addEventListener("loadData", loadData);


document.querySelector("#list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete")) {
        if (confirm("Are You Sure?")) {
            const row = target.closest("tr");
            const name = row.children[0].textContent;
            row.remove();
            removeFromLocalStorage(name);
        }
    } else if (target.classList.contains("edit")) {
        selectedRow = target.closest("tr");
        document.getElementById("name").value = selectedRow.children[0].textContent;
        document.getElementById("email").value = selectedRow.children[1].textContent;
        document.getElementById("number").value = selectedRow.children[2].textContent;
        document.getElementById("age").value = selectedRow.children[3].textContent;
    }
});


document.querySelector("#main-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const age = document.getElementById("age").value;

    clearErrorMessages();

    if (!name || !email || !number || !age) {
        showErrorMessages(name, email, number, age);
        return;
    }

    const list = document.querySelector("#list");
    const newItem = { name, email, number, age };

    if (selectedRow === null) {
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
        addToLocalStorage(newItem);
    } else {
        selectedRow.children[0].textContent = name;
        selectedRow.children[1].textContent = email;
        selectedRow.children[2].textContent = number;
        selectedRow.children[3].textContent = age;
        updateLocalStorage(newItem);
        selectedRow = null;
    }

    document.getElementById("main-form").reset();
});

function addToLocalStorage(item) {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    storedData.push(item);
    localStorage.setItem("data", JSON.stringify(storedData));
}

function removeFromLocalStorage(name) {
    let storedData = JSON.parse(localStorage.getItem("data")) || [];
    storedData = storedData.filter(item => item.name !== name);
    localStorage.setItem("data", JSON.stringify(storedData));
}

function updateLocalStorage(updatedItem) {
    let storedData = JSON.parse(localStorage.getItem("data")) || [];
    const index = storedData.findIndex(item => item.name === updatedItem.name);
    if (index !== -1) {
        storedData[index] = updatedItem;
        localStorage.setItem("data", JSON.stringify(storedData));
    }
}
function clearErrorMessages() {
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("numberError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("ageError").innerHTML = "";
}
function showErrorMessages(name, email, number, age) {
    if (!name) document.getElementById("nameError").innerHTML = "Enter your Name";
    if (!number) document.getElementById("numberError").innerHTML = "Enter your Number";
    if (!email) document.getElementById("emailError").innerHTML = "Enter your Email";
    if (!age) document.getElementById("ageError").innerHTML = "Enter your Age";
}

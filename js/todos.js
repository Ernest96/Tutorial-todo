const todoList = document.getElementById("todo-list");
const loadingMessage = document.getElementById("loading");
const todoSection = document.getElementById("todo-section");


const createBtn = document.getElementById("btn-create");
const createModal = document.getElementById("create-modal");
const closeCreateBtn = document.getElementById("close-create");
const submitCreateBtn = document.getElementById("submit-create");
const createTitleInput = document.getElementById("create-title");
const createTextInput = document.getElementById("create-text");

const editBtn = document.getElementById("btn-edit");
const editModal = document.getElementById("edit-modal");
const closeEditBtn = document.getElementById("close-edit");
const submitEditBtn = document.getElementById("submit-edit");
const editTitleInput = document.getElementById("edit-title");
const editTextInput = document.getElementById("edit-text");
const editIdInput = document.getElementById("edit-id");

const emptyList = document.getElementById("empty-list");


createBtn.onclick = createTodo;
closeCreateBtn.onclick = closeCreateModal;
submitCreateBtn.onclick = submitCreate;

closeEditBtn.onclick = closeEditModal;
submitEditBtn.onclick = submitEdit;


let user;
let todosRef;

function createTodo() {
    console.log("creating todo");
    createModal.style.display = "block";
    todoSection.classList.toggle("hide");
}


function closeCreateModal() {
    createModal.style.display = "none";
    todoSection.classList.toggle("hide");
    createTitleInput.value = "";
    createTextInput.value = "";
}

function closeEditModal() {
    editModal.style.display = "none";
    todoSection.classList.toggle("hide");
    editTitleInput.value = "";
    editTextInput.value = "";
    editIdInput.value = "";
}

function submitCreate() {
    let title = createTitleInput.value;
    let text = createTextInput.value;

    let dateTime = new Date();
    let createdString = getDateTimeString(dateTime);
    let createdTimeStamp = dateTime.getTime();

    if (title && text && title.length > 0 && text.length > 0) {
        todosRef.add({
            title,
            text,
            createdString,
            createdTimeStamp
        });
        closeCreateModal();
    }
    else {
        alert("Please fill all the data.");
    }
}

function submitEdit() {
    let title = editTitleInput.value;
    let text= editTextInput.value;
    let id = editIdInput.value;

    if (id && text && title && text.length > 0 && title.length > 0) {
        todosRef.doc(id).update({title, text});
        closeEditModal();
    }
    else {
        alert("Please fill all the data.");
    }
}

function editTodo(id) {
    editModal.style.display = "block";
    todoSection.classList.toggle("hide");

    todosRef.doc(id).get().then(docRef => {
        let item = docRef.data();

        editTitleInput.value = item.title;
        editTextInput.value = item.text;
        editIdInput.value = id;
    })
}

function deleteTodo(id) {
    if (confirm("Are you sure you want to delete this To Do ?")) {
        todosRef.doc(id).delete();
    }
}

function getDateTimeString(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let minutes = date.getMinutes();

    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time = date.getHours() + ":" + minutes;
    let dateTime = day + "/" + month + "/" + year + " " + time;

    return dateTime;
}

function getTodos() {
    todosRef.orderBy("createdTimeStamp", "desc").onSnapshot(querySnapshot => {
        let items = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })

        renderTodos(items);
    })
}

function renderTodos(items) {
    let html = "";

    loadingMessage.style.display = "none";

    if (items && items.length > 0) {

        items.forEach(item => {
            html += `
            <div class="todo">
                <span class="todo-date">${item.data.createdString}</span>
                <button class="delete-btn white" onclick="deleteTodo('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="edit-btn white" onclick="editTodo('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <h3 class="centered">${item.data.title}</h3>
                <hr />
                <p>${item.data.text}</p>
            </div>
            `
        })
        todoList.innerHTML = html;
        emptyList.style.display = "none";
    }
    else {
        todoList.innerHTML = "";
        emptyList.style.display = "block";
    }
}


auth.onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser != null) {
        user = firebaseUser;
        todosRef = db.collection(`todos/${user.uid}/todoList`);
        getTodos();
    }
    else {
        window.location = "../index.html";
    }
})
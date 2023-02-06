// import file here !-------------------------

import {piyas} from "../temp.js";



const container = document.querySelector(".container");
const card = container.querySelector("#cardx");
const form = document.querySelector("form");
const input = form.querySelector("input");
const button = form.querySelector("#btn");
const ulLists = document.getElementById("lists");
const message = document.getElementById("message");
// -------------------end of finding part-----------------------



// --------------------------------------------add todo ------------------------------
const AddTodo = (event)=>{
	event.preventDefault();
	const UserInputValue = input.value;
	const UniqueId = Date.now().toString();


	const newTodo = new piyas(UserInputValue,UniqueId); 



	createTodo(newTodo);
	//-------------------add todo mess pass------------------
	messagefn("Successfully Included","mess");
	//--------------------add todo mess pass------------------
	const todos = fromLocalStoragex();
	todos.push(newTodo);
	localStorage.setItem("key",JSON.stringify(todos));
	input.value="";
}
// --------------------------------------------add todo ------------------------------
// ---------------------------------------message create------------------
const messagefn=(text,status)=>{
	message.textContent=text;
	message.classList.add(status);
	setTimeout(()=>{
		message.textContent="";
		message.classList.remove(status);
	},1000)
}
// ---------------------------------------message create------------------

const fromLocalStoragex=()=>{
	return localStorage.getItem("key")?JSON.parse(localStorage.getItem("key")):[];
}
// ----------------------------------------create todo---------------------
const createTodo=(newTodo)=>{
	const TodoElement = document.createElement("li");
	TodoElement.id=newTodo.todoId;
	TodoElement.innerHTML=`
	<span>${newTodo.todoValue}</span>
	<span><button class="btn" id="delete"><i class="fa fa-trash"></i></button></span>
	`;
	ulLists.appendChild(TodoElement);

	//----------------------------------delete todo----------------------
	const deleteButton =TodoElement.querySelector("#delete");
	deleteButton.addEventListener("click",(event)=>{
		const value = window.confirm("Are You Sure to Delete ?");
		if(value){
			const selectedli = event.target.parentElement.parentElement.parentElement;
			ulLists.removeChild(selectedli);
			messagefn("Successfully Deleted !","del");
			var piyas = fromLocalStoragex(); 
			piyas = piyas.filter((todo)=>todo.todoId!==selectedli.id);
			localStorage.setItem("key",JSON.stringify(piyas));
		}
	})

	
	//----------------------------------delete toddo----------------------
}
// ---------------------------------------------create todo-------------------
// ------------laoded return all stored todo-------------
const loadedtodo=()=>{
	const piyas = fromLocalStoragex();

	piyas.map((res)=>createTodo(res));
}
// ------------------adding event----------------------
form.addEventListener("submit",AddTodo);
window.addEventListener("DOMContentLoaded",loadedtodo)


// for displaying the time
const dateElement = document.getElementById("date");
let data = localStorage.getItem("TODO");
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// For selecting elements 
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const addbtn = document.getElementById("plus");
const input = document.getElementById("input");


//styling in list items
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


let LIST, id;


//Check if There is Data in Local storage or not
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;  // setting value of id to the last element of stored data list in local storage.
    loadList(LIST);  // loading the list to user app.
}else{
    // Creating an empty array to store new data.
    LIST = [];
    id = 0;
}

// creating a function to load the stored localStorage data into user application.
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Creating the main TO-DO application
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// adding an event listener
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});
addbtn.addEventListener("click",function(even){
    const toDo = input.value;
        
    // if the input isn't empty
    if(toDo){
        addToDo(toDo, id, false, false);
        
        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });
        // add item to localstorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
        
        id++;
    }
    input.value = "";
}
);

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


//speech recognition
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();
// creating the transcription file.
recognition.onresult = function(event){
    const current=event.resultIndex;
    const transcript = event.results[current][0].transcript;
    actual(transcript);

};
recognition.start();
//creating the function to do actual task
function actual(message){
    const speech = new SpeechSynthesisUtterance('Welcome to Tasker');
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    if(message.includes('add'))
    {
        console.log("hello");
        const toDo = message;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
     
    
    }
}

const dropArea = document.querySelector(".drag-area");
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");

button.onclick = ()=>{
    input.click(); // if user clicks on the button the input also clicks 
}

input.addEventListener("change", function(){
    file = this.files[0];     // getting user select file and [0] this means if user select multiple files then we'll select only the first one
    showFile(); //calling function
    dropArea.classList.add("active");
});


let file;

// If user drag file over dragarea
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault(); // preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

// If user leave dragged file from dragarea
dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});


// If user drop file on dragarea
dropArea.addEventListener("drop", (event)=>{
    event.preventDefault(); // preventing from default behaviour
    // getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); // calling function
});

function showFile(){
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; // adding some valid image extensions in array
    if(validExtensions.includes(fileType)){ // if selected file is an image file
        let fileReader = new FileReader(); // creating new FileReader object
        fileReader.onload = ()=>{
            let fileURL = fileReader.result; // passing user file source in fileURL variable
            let imgTag = `<img src="${fileURL}" alt="">`; // creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }else{
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}
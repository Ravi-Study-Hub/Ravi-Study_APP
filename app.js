setTimeout(()=>{
  document.getElementById("splash").style.display="none";
},2000);

if(localStorage.getItem("user")){
  startApp();
}

function login(){
  let name=document.getElementById("username").value;
  if(name){
    localStorage.setItem("user",name);
    startApp();
  }
}

function startApp(){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("app").style.display="block";
  document.getElementById("welcome").innerText=
  "Welcome, "+localStorage.getItem("user");
  document.getElementById("profileName").innerText=
  "Name: "+localStorage.getItem("user");
  loadNotes();
}

function logout(){
  localStorage.removeItem("user");
  location.reload();
}

function showSection(id){
  document.querySelectorAll(".section")
  .forEach(sec=>sec.style.display="none");
  document.getElementById(id).style.display="block";
}

function addNote(){
  let subject=document.getElementById("subjectSelect").value;
  let note=document.getElementById("noteInput").value;
  if(note){
    let data=JSON.parse(localStorage.getItem(subject))||[];
    data.push(note);
    localStorage.setItem(subject,JSON.stringify(data));
    document.getElementById("noteInput").value="";
    loadNotes();
  }
}

function loadNotes(){
  let subject=document.getElementById("subjectSelect").value;
  let data=JSON.parse(localStorage.getItem(subject))||[];
  let output="";
  data.forEach(n=>{
    output+=`<div class="note">${n}</div>`;
  });
  document.getElementById("notesList").innerHTML=output;
}

document.getElementById("subjectSelect")
.addEventListener("change",loadNotes);

function uploadPDF(event){
  let file=event.target.files[0];
  let url=URL.createObjectURL(file);
  document.getElementById("pdfList").innerHTML=
  `<a href="${url}" target="_blank">Open PDF</a>`;
}
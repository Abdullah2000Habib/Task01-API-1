let boxes =document.querySelector('.boxes');
let button =document.querySelector('.to-down');
let main =document.querySelector('.main');
let postTitle =document.querySelector('.post-title');
let postDescription =document.querySelector('.post-description');
let postCheck =document.querySelector('.post-check');
let postCancel =document.querySelector('.post-cancel');
let addBox =document.querySelector('.add-box');
let newBox = ``;
let data = [];

const callApi = async (method ,url)=>{
    const xhr = new XMLHttpRequest();
    xhr.open(method, url,true);
    xhr.send();
    return new Promise((resolve,reject) =>{
        xhr.onreadystatechange = () =>{
            if(xhr.readyState ==4 && xhr.status ==200){
                resolve(JSON.parse(xhr.response));
            }else if(xhr.readyState ==4 && xhr.status !==200){
                reject(Error('sth went wrong'));
            }
        };
    })

}
boxes.innerHTML='Loading ...'
callApi('GET','https://jsonplaceholder.typicode.com/posts').then((response)=>
{
    console.log(response)
    newBox = ``;
    response.forEach((item)=>{
        let box =`<div class="box">
                <h4 class="box-title">${item.title}</h4>
                <p class="box-description">${item.body}</p>
                <div class="box-spans">
                    <span class="span-one">P1</span>
                    <span class="span-two">Health</span>
                </div>
        </div>`
        newBox = newBox + box ;
        boxes.innerHTML=newBox;
    })
}
);


let obj ={
    title: "",
    body: "",
}


postCheck.addEventListener('click',()=>{

    obj.title = postTitle.value;
    if(obj.title.length > 0){
        obj.title = postTitle.value;
        obj.body = postDescription.value;
        postFunction (obj);
        postTitle.value= '';
        postDescription.value= '';
    }
})


function  postFunction (obj){ 
fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    headers : {'Content-Type': 'application/json'},  
    body: JSON.stringify(obj)
}).then((response)=>response.json()).then((data)=>{
            console.log(data)
            let box =`<div class="box">
                <h4 class="box-
                ">${data.title}</h4>
                <p class="box-description">${data.body}</p>
                <div class="box-spans">
                    <span class="span-one">P1</span>
                    <span class="span-two">Health</span>
                </div>
        </div>`
        newBox = newBox + box ;
        boxes.innerHTML=newBox;
})}



button.addEventListener('click', (e)=>{
    addBox.style.display = 'block';
    button.style.display = 'none';
    window.scrollTo(22,document.body.scrollHeight);
})

postCancel.addEventListener('click', (e)=>{
    addBox.style.display = 'none';
    button.style.display = 'block';
})

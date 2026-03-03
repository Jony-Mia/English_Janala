let API = "https://jsonplaceholder.typicode.com/posts"
let posts = [];
let currentEditId= null;

async function postLoader(){
  let res   = await fetch(API);
      posts = await res.json();
      posts = posts.slice(0,20)
      postBox()
}

function postBox(){
    let cardBox = document.getElementById('cardBox');
    cardBox.innerHTML=''
    posts.forEach(post=>{
    cardBox.innerHTML+=`
        <div class="card w-96 bg-white card-md shadow-lg">
        <div class="card-body">
            <h2 class="card-title">${post.title}</h2>
            <p>${post.body}</p>
            <div class="justify-around card-actions">
                <button onclick="edit(${post.id})" class="btn btn-primary">Edit</button>
                <button onclick="deletePost(${post.id})" class="btn text-white btn-error">Delete</button>
            </div>
        </div>
    </div>
                        `;
    });
}

async function createPost(){
    const title = document.getElementById('email').value.trim();
    const body =  document.getElementById('pass').value.trim();
  if(!title || !body) return;
    let data = await fetch(API,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            userId:1,
            title:title,
            body:body
        })
    });
    let res = await data.json()
    posts.unshift({...res,id: Date.now()})
    postBox()
}

async function deletePost(id){
    await fetch(`${API}/${id}`,{
        method: "DELETE",
    })
   posts= posts.filter(p=> p.id!==id)
    postBox()
}

function edit(id){
    let my_modal_3= document.getElementById('my_modal_3');
    currentEditId = id;
    my_modal_3.showModal();
}
async function saveEdit(id){
      const title = document.getElementById('editTitle').value.trim();
    const body =  document.getElementById('editPost').value.trim();
    if(!title || !body) return;
    // console.log(my_modal_3);
    
     await fetch(`${API}/${currentEditId}`,{
        headers: {"Content-Type": "application/json"},
        method: "PUT",
        body: JSON.stringify({
            title: title,
            body: body
        })
    });
    posts = posts.map(p=>p.id===currentEditId ? {...p,title,body}: p)
    my_modal_3.close()
    postBox()
}
postLoader()
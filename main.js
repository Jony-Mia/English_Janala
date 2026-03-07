const API = "https://openapi.programming-hero.com/api/words/all";
const wordDetailsAPI = "https://openapi.programming-hero.com/api/word"
let wordCardBox = document.getElementById('wordCard');
let word = [];

async function wordData() {
    let res = await fetch(API);
    let words = await res.json();

    words.data.forEach(element => {
        word.push(element);
    });
    wordCard();
    noFound()
};

function noFound() {
    if (word.length === 0) {
        wordCardBox.innerHTML = `
            <div>
                <h3 class="text-center text-sm hind-siliguri">আপনি এখনো কোন Lesson Select করেন</h3>
                <h1 class="text-center text-3xl my-2 hind-siliguri font-semibold">একটি Lesson Select করুন।</h1>
            </div>`
    }
}

function wordCard(level) {
    wordCardBox.innerText = ''; 
    // notice.style.display="none"
    word.filter(w => {

        if (w.level === level) {
            if( level=== 4 || level=== 7 ){
                alert('do not enter');      
                return;          
            }else{
            wordCardBox.innerHTML += `
         <div class="card transition-all px-4 shadow h-full bg-base-100">
                    <div class="card-body pt-10">
                        <h1 class="card-title inter text-2xl block text-center">${w.word}</h1>
                        <p class="inter text-center font-normal">${w.pronunciation}</p>
                        <p class="hind-siliguri my-3 font-semibold text-center text-3xl">"${w.meaning}"</p>
                        <div class="card-action flex my-3 justify-between">
                            <button onclick="wordDetails(${w.id})" class="btn btn-soft text-neutral rounded-sm btn-info">
                                <i class="fa-utility-fill fa-semibold fa-circle-info"></i> 
                            </button>
                            <button onclick="pronounceWord('${w.word}')" class="btn btn-soft hover:text-white text-neutral rounded-sm btn-info">
                                <i class="fa fa-volume"></i> 
                            </button>
                        </div>
                    </div>
         </div>
             `;
            }
             
        }
        else  {
                     
            
        }
       
    });
}


async function wordDetails(wordId) {

    let wordModal = document.getElementById("wordModal");
    let detailsID = await fetch(`${wordDetailsAPI}/${wordId}`);
    let res = await detailsID.json();
    
    wordModal.innerHTML = `
      <div class="modal-box">
        <div class=" mb-5">
            
       <button  onclick="pronounceWord('${res.data.word}')" >
        <h3 class="text-xl font-bold poppins">${res.data.word} ( <i class="fa fa-microphone-lines"></i> :${res.data.meaning})</h3> 
       </button>
    </div>
    
    <div class="my-3">
            <h3 class="text-[20px] mb-2 font-semibold">Meaning</h3>
            <h3 class="text-[18px] py-1 hind-siliguri font-semibold">${res.data.meaning}</h3>        
        </div>
        
        <div>
            <h3 class="text-[18px] py-1 poppins font-semibold">Example</h3>
            <!-- <p class="py-2">Press ESC key or click the button below to close</p>    -->
            <p class="py-2">${res.data.sentence}</p> 
        </div>
        
        <div>
        <br/>
            <h3 class="text-[20px] hind-siliguri font-semibold">সমার্থক শব্দ গুলো</h3>
            <p class="py-2 gap-2 flex">
                ${res.data.synonyms.map(syn => `<button  onclick="pronounceWord('${syn}')"  class="btn bg-[#f0faff] text-neutral hover:bg-[#f0faff]">${syn}</button>`)}
            </p>
        
        </div>
        <div class="modal-action justify-start">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal-->
            <button class="btn btn-primary rounded-lg text-left">Complete Learning</button>
          </form> 
          </div>
          
      </div>
    
    `;     
    wordModal.showModal();
}

function emptyBox(){

   wordCardBox.innerHTML= `
            <div>
                <h1 class="text-center text-7xl">
                    <i class="fa-duotone fa-solid fa-triangle-exclamation"></i>
                </h1>
                <h3 class="text-center text-sm font-medium my-1 hind-siliguri">আপনি এখনো কোন Lesson Select করেন</h3>
                <h1 class="text-center text-3xl my-2 hind-siliguri font-semibold">একটি Lesson Select করুন।</h1>
            </div>`;
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN";
    speechSynthesis.speak(utterance)
};


wordData();
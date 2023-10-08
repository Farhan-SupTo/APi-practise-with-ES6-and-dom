handleSearch = () =>{
 const InputValue =document.getElementById("inputValue").value
 if(InputValue){
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${InputValue}`)
 .then(res => res.json())
 .then(data => {
    if(data.title == 'No Definitions Found'){
         alert(data.message)
        // console.log(data)
    }
    else{
        showAudioResult(data)
    }
 })
 }
 else{
      alert("empty Input value")
 }
}

const showAudioResult = (data) =>{
   
    const parent =document.getElementById("audio-container")
    data[0].phonetics.forEach(element => {
    const audio =document.createElement("audio")
    audio.src =element.audio
    const button =document.createElement("button")
    button.innerHTML ="Play"
    button.onclick = () =>{
        audio.play()
    }
    const container =document.createElement("div")
    container.appendChild(button)
    container.appendChild(audio)
parent.appendChild(container)
});
document.getElementById("inputValue").value=""
}


const loadGithubData = () =>{
    
    fetch("https://api.github.com/users?per_page=10")
    .then(res => res.json())
    .then(data => {
        showGithubData(data)
    })
}

const showGithubData =(data) => {
    const Parent =document.getElementById("id-container")
  console.log(data)
  data.forEach((user) =>{
    fetch(user.followers_url)
    .then(res => res.json())
    .then(data => {
        const div =document.createElement("div")
        div.classList.add("card")
        div.innerHTML=`
        <img class="active-member" src="${user.avatar_url}" alt="">
        <h2>Name:${user.login}</h2>
        <h4>Followers:
        <img class="follower-img" src="${data[0].avatar_url}" alt="">
        <img class="follower-img" src="${data[1].avatar_url}" alt="">
        </h4>
        `
        Parent.appendChild(div)
    })
    
  })
}
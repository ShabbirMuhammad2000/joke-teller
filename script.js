const button = document.getElementById('button')
const audioElement = document.getElementById('audio')



// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled
}


// Passing Joke To VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '5980294e57cb4b01904adab48640697f',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}


// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist'
  try {
    const response = await fetch(apiUrl)
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke)
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Errors 
    console.log('whoops', error)
  }
}

// Event Listener
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)
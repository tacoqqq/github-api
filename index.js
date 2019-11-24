'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  const repoNameArr = responseJson.map(repo => repo.name);
  const repoLinkArr = responseJson.map(repo => repo.html_url);

  $('#results').removeClass('hidden');
  $('#results h2').html(`Search results for <a href="${responseJson[0].owner.html_url}">${responseJson[0].owner.login}</a>`);
  for (let i = 0 ; i < repoNameArr.length ; i++){
      $('#results-list').append(`<li><h3>${repoNameArr[i]}:</h3><a href="${repoLinkArr[i]}">Link to repo</a></li>`);
  }
}

function getRepos(username){
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error (response.statusText);
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => $('#js-error-message').text(`Something went wrong: Username ${err.message}!`))
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const userInput = $('#js-search-user').val();
    $('#results-list').empty();
    $('#results').addClass('hidden');
    $('#js-error-message').empty();
    getRepos(userInput);
  })
}


$(watchForm)
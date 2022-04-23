//I THINK THIS IS IN THE WRONG PLACE-ERROR const res = require("express/lib/response");

const $backBtn = document.querySelector('#back-btn');
const $thoughtName = document.querySelector('#thought-name');
const $createdBy = document.querySelector('#created-by');
const $createdAt = document.querySelector('#created-at');
const $thoughtText = document.querySelector('#thoughtText');
const $reactionsList = document.querySelector('#reactions-list');
const $continueSection = document.querySelector('#continue-section');
const $newContinueForm = document.querySelector('#new-continue-form');

let thoughtId;

function getThought() {
  //GET ID OF A THOUGHT
  const searchParams = new URLSearchParams(document.location.search.substring(1));
  const thoughtId = searchParams.get('id');
  //GET THOUGHTINFO
  fetch(`/api/thoughts/${thoughtId}`)
    .then(response => {
      //CHECK FOR ERRORS
      if (!response.ok) {
        throw new Error({ message: 'Something went wrong!' });
      }
      return response.json();
    })
    .then(printThought)
    .catch(err => {
      console.log(err);
      alert('Cannot find a thought note with this id! Taking you back.');
      window.history.back();
    });
}

function printThought(thoughtData) {
  console.log(thoughtData);

  thoughtId = thoughtData._id;

  const { thoughtName, createdBy, createdAt, thoughtText, reactions, continues } = thoughtData;

  $thoughtName.textContent = thoughtName;
  $createdBy.textContent = createdBy;
  $createdAt.textContent = createdAt;
  $thoughtText.textContent = thoughtText;
  $reactionsList.innerHTML = reactions
    .map(reaction => `<span class="col-auto m-2 text-center btn">${reaction}</span>`)
    .join('');

  if (continues && continues.length) {
    continues.forEach(printContinue);
  } else {
    $continueSection.innerHTML = '<h4 class="bg-dark p-3 rounded">No continues yet!</h4>';
  }
}

function printContinue(Continue) {

  // make div to hold continue and SUBcontinueS
  const ContinueDiv = document.createElement('div');
  ContinueDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

  const ContinueContent = `
      <h5 class="text-dark">${Continue.writtenBy} continued on ${Continue.createdAt}:</h5 >
      <p>${Continue.continueBody}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        ${Continue.replies && Continue.replies.length
      ? `<h5>${Continue.replies.length} ${Continue.replies.length === 1 ? 'Reply' : 'Replies'
      }</h5>
        ${Continue.replies.map(printReply).join('')}`
      : '<h5 class="p-1">No replies yet!</h5>'
    }
      </div>
      <form class="reply-form mt-3" data-continueid='${Continue._id}'>
        <div class="mb-3">
          <label for="reply-name">Leave Your Name</label>
          <input class="form-input" name="reply-name" required />
        </div>
        <div class="mb-3">
          <label for="reply">Leave a Reply</label>
          <textarea class="form-textarea form-input"  name="reply" required></textarea>
        </div>

        <button class="mt-2 btn display-block w-100">Add Reply</button>
      </form>
`;

  ContinueDiv.innerHTML = ContinueContent;
  $continueSection.prepend(ContinueDiv);
}

function printReply(reply) {
  return `
  <div class="card p-2 rounded bg-secondary">
    <p>${reply.writtenBy} replied on ${reply.createdAt}:</p>
    <p>${reply.replyBody}</p>
  </div >
  `;
}

function handleNewContinueSubmit(event) {
  event.preventDefault();

  const continueBody = $newContinueForm.querySelector('#continue').value;
  const writtenBy = $newContinueForm.querySelector('#written-by').value;

  if (!continueBody || !writtenBy) {
    return false;
  }

  const formData = { continueBody, writtenBy };

  fetch(`/api/continues/${thoughtId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(continueResponse => {
      console.log(continueResponse);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

function handleNewReplySubmit(event) {
  event.preventDefault();

  if (!event.target.matches('.reply-form')) {
    return false;
  }

  const continueId = event.target.getAttribute('data-continueid');

  const writtenBy = event.target.querySelector('[name=reply-name]').value;
  const replyBody = event.target.querySelector('[name=reply]').value;

  if (!replyBody || !writtenBy) {
    return false;
  }

  const formData = { writtenBy, replyBody };
  //FETCH FUNCTIONALITY CONNECTS THE BACKEND TO THE FRONTEND!
  fetch(`/api/continues/${thoughtId}/${continueId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(continueResponse => {
      console.log(continueResponse);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

$backBtn.addEventListener('click', function () {
  window.history.back();
});

$newContinueForm.addEventListener('submit', handleNewContinueSubmit);
$continueSection.addEventListener('submit', handleNewReplySubmit);

//DON'T FORGET TO CALL THE FUNCTION!
getThought();

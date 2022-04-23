const $backBtn = document.querySelector('#back-btn');
const $thoughtName = document.querySelector('#thought-name');
const $createdBy = document.querySelector('#created-by');
const $createdAt = document.querySelector('#created-at');
const $thoughtText = document.querySelector('#thoughtText');
const $reactionsList = document.querySelector('#reactions-list');
const $continueSection = document.querySelector('#continue-section');
const $newcontinueForm = document.querySelector('#new-continue-form');

let thoughtId;

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

function printContinue(comment) {

  // make div to hold continue and subcontinues
  const continueDiv = document.createElement('div');
  continueDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

  const continueContent = `
      <h5 class="text-dark">${comment.writtenBy} continued on ${comment.createdAt}:</h5 >
      <p>${comment.continueBody}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        ${comment.replies && comment.replies.length
      ? `<h5>${comment.replies.length} ${comment.replies.length === 1 ? 'Reply' : 'Replies'
      }</h5>
        ${comment.replies.map(printReply).join('')}`
      : '<h5 class="p-1">No replies yet!</h5>'
    }
      </div>
      <form class="reply-form mt-3" data-continueid='${comment._id}'>
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

  continueDiv.innerHTML = continueContent;
  $continueSection.prepend(continueDiv);
}

function printReply(reply) {
  return `
  < div class="card p-2 rounded bg-secondary" >
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
}

$backBtn.addEventListener('click', function () {
  window.history.back();
});

$newContinueForm.addEventListener('submit', handleNewContinueSubmit);
$continueSection.addEventListener('submit', handleNewReplySubmit);

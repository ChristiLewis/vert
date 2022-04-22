const $addreactionBtn = document.querySelector('#add-reaction');
const $thoughtForm = document.querySelector('#thought-form');
const $customReactionsList = document.querySelector('#custom-reactions-list');

const handleAddReaction = event => {
  event.preventDefault();

  const reactionValue = document.querySelector('#new-reaction').value;

  if (!reactionValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'reaction';
  checkbox.value = reactionValue;
  checkbox.id = reactionValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = reactionValue;
  label.htmlFor = reactionValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customReactionsList.appendChild(divWrapper);

  reactionValue.value = '';
};

const handleThoughtSubmit = event => {
  event.preventDefault();

  const thoughtName = $thoughtForm.querySelector('#thought-name').value;
  const createdBy = $thoughtForm.querySelector('#created-by').value;
  const size = $thoughtForm.querySelector('#thought-size').value;
  const reactions = [...$thoughtForm.querySelectorAll('[name=reaction]:checked')].map(reaction => {
    return reaction.value;
  });

  if (!thoughtName || !createdBy || !reactions.length) {
    return;
  }

  const formData = { thoughtName, createdBy, size, reactions };
};

$thoughtForm.addEventListener('submit', handleThoughtSubmit);
$addReactionBtn.addEventListener('click', handleAddReaction);

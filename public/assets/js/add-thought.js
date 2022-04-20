const $addToppingBtn = document.querySelector('#add-topping');
const $thoughtForm = document.querySelector('#thought-form');
const $customToppingsList = document.querySelector('#custom-toppings-list');

const handleAddTopping = event => {
  event.preventDefault();

  const toppingValue = document.querySelector('#new-topping').value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);

  toppingValue.value = '';
};

const handlethoughtSubmit = event => {
  event.preventDefault();

  const thoughtName = $thoughtForm.querySelector('#thought-name').value;
  const createdBy = $thoughtForm.querySelector('#created-by').value;
  const size = $thoughtForm.querySelector('#thought-size').value;
  const toppings = [...$thoughtForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!thoughtName || !createdBy || !toppings.length) {
    return;
  }

  const formData = { thoughtName, createdBy, size, toppings };
};

$thoughtForm.addEventListener('submit', handlethoughtSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);

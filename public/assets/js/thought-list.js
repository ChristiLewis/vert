const $thoughtList = document.querySelector('#thought-list');

const printthought = ({ _id, thoughtName, toppings, size, commentCount, createdBy, createdAt }) => {
  const thoughtCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${thoughtName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Suggested Size: ${size}
          <h5 class="text-dark">Toppings</h5>
          <ul>
            ${toppings
              .map(topping => {
                return `<li>${topping}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/thought?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $thoughtList.innerHTML += thoughtCard;
};

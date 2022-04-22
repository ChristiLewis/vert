const $thoughtList = document.querySelector('#thought-list');

const printThought = ({ _id, thoughtName, reactions, size, commentCount, createdBy, createdAt }) => {
  const thoughtCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${thoughtName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Suggested Size: ${size}
          <h5 class="text-dark">reactions</h5>
          <ul>
            ${reactions
      .map(reaction => {
        return `<li>${reaction}</li>`;
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

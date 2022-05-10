function createStatisticsTableRow(teacher) {
  const row = document.createElement('tr');
  row.innerHTML = `
   <tr>
                    <td>${teacher.fullName}</td>
                    <td>${teacher.age ? teacher.age : ''}</td>
                    <td>${teacher.gender}</td>
                    <td>${teacher.country}</td>
                </tr>
  `;
  return row;
}

export function renderStatisticsTable(controller) {
  const statsTable = document.getElementById('statsTableBody');
  statsTable.innerHTML = '';
  const statsData = controller.getCurrentPage();
  statsData.map(createStatisticsTableRow)
    .forEach((row) => statsTable.appendChild(row));
}

function renderPaging(controller) {
  const pagingDiv = document.getElementById('pagingRow');
  pagingDiv.innerHTML = '';
  const { totalPages } = controller;
  for (let i = 1; i <= totalPages; i += 1) {
    const button = document.createElement('span');
    button.classList.add('paging__button');
    button.textContent = i;
    button.onclick = () => {
      controller.setPage(i);
      renderStatisticsTable(controller);
    };
    pagingDiv.appendChild(button);
  }
}

export function initStatisticsTable(controller) {
  document.getElementById('nameRowHeader').onclick = () => {
    controller.setSortingField('fullName');
  };
  document.getElementById('ageRowHeader').onclick = () => {
    controller.setSortingField('age');
  };
  document.getElementById('genderRowHeader').onclick = () => {
    controller.setSortingField('gender');
  };
  document.getElementById('nationalityRowHeader').onclick = () => {
    controller.setSortingField('country');
  };
  controller.newPageEmitter.subscribe(() => {
    renderStatisticsTable(controller);
  });
  renderStatisticsTable(controller);
  renderPaging(controller);
}

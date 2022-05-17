import clamp from '../utils/math-utils';

export default class StatisticsController {
  constructor(viewModel) {
    this.viewModel = viewModel;
    this.viewModel.newPageEmitter.subscribe(() => {
      this.render();
    });
  }

  connect({
    statsTable,
    pagingRow,
    nameRowHeader,
    specialityRowHeader,
    ageRowHeader,
    genderRowHeader,
    nationalityRowHeader,
  }) {
    this.attachElements({
      statsTable,
      pagingRow,
      nameRowHeader,
      specialityRowHeader,
      ageRowHeader,
      genderRowHeader,
      nationalityRowHeader,
    });
    this.resetArrowsOnHeaders();
    this.render();
  }

  render() {
    this.renderStatisticsTable();
    this.renderPaging();
  }

  attachElements({
    statsTable,
    pagingRow,
    nameRowHeader,
    specialityRowHeader,
    ageRowHeader,
    genderRowHeader,
    nationalityRowHeader,
  }) {
    this.statsTable = document.getElementById(statsTable);
    this.pagingRow = document.getElementById(pagingRow);
    this.nameRowHeader = document.getElementById(nameRowHeader);
    this.specialityRowHeader = document.getElementById(specialityRowHeader);
    this.ageRowHeader = document.getElementById(ageRowHeader);
    this.genderRowHeader = document.getElementById(genderRowHeader);
    this.nationalityRowHeader = document.getElementById(nationalityRowHeader);

    this.nameRowHeader.onclick = this.headerOnClickHandler('full_name');
    this.specialityRowHeader.onclick = this.headerOnClickHandler('course');
    this.ageRowHeader.onclick = this.headerOnClickHandler('age');
    this.genderRowHeader.onclick = this.headerOnClickHandler('gender');
    this.nationalityRowHeader.onclick = this.headerOnClickHandler('country');
  }

  // eslint-disable-next-line class-methods-use-this
  createStatisticsTableRow(teacher) {
    const row = document.createElement('tr');
    row.innerHTML = `
   <tr>
                    <td class="stats-table__name">${teacher.full_name}</td>
                    <td class="stats-table__course">${teacher.course}</td>
                    <td class="stats-table__age">${teacher.age ? teacher.age : ''}</td>
                    <td class="stats-table__gender">${teacher.gender}</td>
                    <td class="stats-table__nationality">${teacher.country}</td>
                </tr>
  `;
    return row;
  }

  renderStatisticsTable() {
    this.statsTable.innerHTML = '';
    const statsData = this.viewModel.getCurrentPageData();
    statsData.map((teacher) => this.createStatisticsTableRow(teacher))
      .forEach((row) => this.statsTable.appendChild(row));
  }

  renderPaging() {
    this.pagingRow.innerHTML = '';
    const { totalPages } = this.viewModel;
    const threeDots = document.createElement('span');
    threeDots.textContent = '...';
    const shouldRenderFirst = this.viewModel.pageNumber > 3;
    const shouldRenderLast = totalPages - this.viewModel.pageNumber > 2;
    const firstButton = this.createPagingButton(shouldRenderFirst ? 'First' : 1, 1);
    const lastButton = this.createPagingButton(shouldRenderLast ? 'Last' : totalPages, totalPages);
    this.pagingRow.appendChild(firstButton);
    if (shouldRenderFirst) {
      this.pagingRow.appendChild(threeDots);
    }
    const firstPage = clamp(2, totalPages - 2, this.viewModel.pageNumber - 1);
    let lastPage = Math.min(totalPages - 1, this.viewModel.pageNumber + 1);
    if (lastPage - firstPage < 2) {
      lastPage += 1;
      if (lastPage >= totalPages) {
        lastPage = totalPages - 1;
      }
    }
    for (let i = firstPage; i <= lastPage; i += 1) {
      this.pagingRow.appendChild(this.createPagingButton(i, i));
    }
    if (shouldRenderLast) {
      this.pagingRow.appendChild(threeDots);
    }
    this.pagingRow.appendChild(lastButton);
  }

  createPagingButton(text, pageNumber) {
    const button = document.createElement('span');
    button.classList.add(pageNumber !== this.viewModel.pageNumber ? 'paging__button' : 'paging__button__selected');
    button.disabled = pageNumber !== this.viewModel.pageNumber;
    button.textContent = text;
    button.onclick = () => {
      this.viewModel.setPage(pageNumber);
      this.renderStatisticsTable();
    };
    return button;
  }

  resetArrowsOnHeaders() {
    this.nameRowHeader.dataset.arrow = '↓';
    this.specialityRowHeader.dataset.arrow = '↓';
    this.ageRowHeader.dataset.arrow = '↓';
    this.genderRowHeader.dataset.arrow = '↓';
    this.nationalityRowHeader.dataset.arrow = '↓';
  }

  headerOnClickHandler(sortingField) {
    return (ev) => {
      this.resetArrowsOnHeaders();
      // eslint-disable-next-line no-param-reassign
      ev.target.dataset.arrow = this.viewModel.currentSortingOpts.field === sortingField ? '↓' : '↑';
      this.viewModel.setSortingField(sortingField);
    };
  }
}

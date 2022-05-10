import { createAddTeacherModal, openModal } from './ui/modals';
import TeacherListViewModel from './view-models/teacher-list-viewmodel';
import { initTeachersList } from './ui/teacher-list';
import DataService from './services/data-service';
import StatisticsViewModel from './view-models/statistics-view-model';
import { initStatisticsTable } from './ui/statistics';

const dataService = new DataService();
const teachersListViewModel = new TeacherListViewModel(dataService);
const statisticsViewModel = new StatisticsViewModel(dataService);

function openAddTeacherModal() {
  openModal(createAddTeacherModal());
}

(() => {
  document.getElementById('addTeacherBtn').onclick = () => openAddTeacherModal();
  initTeachersList(teachersListViewModel);
  initStatisticsTable(statisticsViewModel);
})();

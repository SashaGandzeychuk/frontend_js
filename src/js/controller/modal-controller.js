export default class ModalController {
  constructor({ overlayId, modalBoxId }) {
    this.overlay = document.getElementById(overlayId);
    this.modalBox = document.getElementById(modalBoxId);
  }

  openModal(modal, title) {
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');
    modalDiv.appendChild(this.createModalHeader(title));
    modalDiv.appendChild(modal);
    this.overlay.style.display = 'block';
    this.modalBox.appendChild(modalDiv);
  }

  closeModal() {
    this.overlay.style.display = 'none';
    this.modalBox.innerHTML = '';
  }

  createModalHeader(title) {
    const header = document.createElement('div');
    header.classList.add('modal__header');
    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('modal__title');
    titleParagraph.textContent = title;
    header.appendChild(titleParagraph);
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('modal__close');
    closeButton.onclick = () => this.closeModal();
    header.appendChild(closeButton);
    return header;
  }
}

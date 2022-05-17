export default class EventEmitter {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners = [...this.listeners, listener];
  }

  emit(value) {
    this.listeners.forEach((listener) => listener(value));
  }
}

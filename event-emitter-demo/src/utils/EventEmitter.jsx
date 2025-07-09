export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  emit(eventName, ...rest) {
    let callbacks = this.events[eventName];
    callbacks &&
      callbacks.forEach(function (cb) {
        cb(...rest);
      });
  }

  once = (eventName, callback) => {
    const execute = (...args) => {
      callback(...args);
      this.remove(eventName, execute);
    };
    this.on(eventName, execute);
  };

  remove(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }
}

export const eventBus = new EventEmitter();

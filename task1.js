class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    const newCallback = { callback: fn, once: false };

    this.listeners[eventName] = this.listeners[eventName]
      ? [...this.listeners[eventName], newCallback]
      : [newCallback];
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    const fnIndex = this.listeners[eventName]?.findLastIndex(
      ({ callback }) => callback === fn
    );
    this.listeners[eventName].splice(fnIndex, 1);
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const newCallback = { callback: fn, once: true };

    this.listeners[eventName] = this.listeners[eventName]
      ? [...this.listeners[eventName], newCallback]
      : [newCallback];
  }

  emit(eventName, ...args) {
    this.listeners[eventName]?.forEach(({ callback }) => callback(...args));
    this.listeners[eventName] = this.listeners[eventName]?.filter(
      ({ once }) => !once
    );
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length ?? 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName]?.map(({ callback }) => callback);
  }
}

module.exports = EventEmitter;

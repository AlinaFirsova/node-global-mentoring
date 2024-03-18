const EventEmitter = require("./task1");

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    const dataReceived = () => this.emit("data");

    this.emit("begin");
    asyncFunc(...args, dataReceived).finally(() => this.emit("end"));
  }
}

const fetchFromUrl = (url, cb) =>
  fetch(url).then((response) => {
    cb(response);
    return response.json();
  });

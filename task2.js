const { performance } = require("perf_hooks");

const EventEmitter = require("./task1");

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    const functionName = asyncFunc.name;
    const dataReceived = () => this.emit("data");

    this.emit("begin");
    performance.mark(`${functionName}-start`);
    asyncFunc(...args, dataReceived).finally(() => {
      performance.mark(`${functionName}-end`);
      this.emit("end");
      const { name, duration } = performance.measure(
        asyncFunc.name,
        `${functionName}-start`,
        `${functionName}-end`
      );
      console.log(`Execution of ${name} took ${duration}`);
    });
  }
}

const fetchFromUrl = (url, cb) =>
  fetch(url).then((response) => {
    cb(response);
    return response.json();
  });

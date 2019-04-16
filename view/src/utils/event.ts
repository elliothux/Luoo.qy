type Handler = (...args: any) => void;
type Proxies = {
  [eventName: number]: Handler[];
};

class EventProxy {
  proxies: Proxies = {};
  onceProxies: Proxies = {};

  on = (eventName: EventTypes, handler: Handler) => {
    if (this.proxies[eventName]) {
      return this.proxies[eventName].push(handler);
    }
    this.proxies[eventName] = [handler];
  };
  once = (eventName: EventTypes, handler: Handler) => {
    if (this.onceProxies[eventName]) {
      return this.onceProxies[eventName].push(handler);
    }
    this.onceProxies[eventName] = [handler];
  };
  emit = (eventName: EventTypes, ...args: any) => {
    if (this.proxies[eventName]) {
      this.proxies[eventName].forEach(handler => handler(...args));
    }
    if (this.onceProxies[eventName]) {
      this.onceProxies[eventName].forEach(handler => handler(...args));
      this.onceProxies[eventName] = [];
    }
  };
  cancel = (eventName: EventTypes, handler: Handler) => {
    if (!this.proxies[eventName]) return;
    this.proxies[eventName] = this.proxies[eventName].filter(
      h => h !== handler
    );
  };
  cancelOnce = (eventName: EventTypes, handler: Handler) => {
    if (!this.onceProxies[eventName]) return;
    this.onceProxies[eventName] = this.onceProxies[eventName].filter(
      h => h !== handler
    );
  };
  cancelAll = (eventName: EventTypes) => {
    if (!this.proxies[eventName]) return;
    this.proxies[eventName] = [];
  };
  cancelAllOnce = (eventName: EventTypes) => {
    if (!this.onceProxies[eventName]) return;
    this.onceProxies[eventName] = [];
  };
}

const events = new EventProxy();

export enum EventTypes {
  CLEAR_SEARCH_TEXT,
  SEARCH
}

export { EventProxy, events };

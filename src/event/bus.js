// SEARCH_EVENT 顶部nav菜单栏发出的事件，表示用户搜索

const searchEventBus = {
  listeners: {},
  emit(event, ...data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(...data))
    }
  },
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  },
  off(event, callback) {
    this.listeners[event] = this.listeners[event]?.filter(cb => cb !== callback)
  }
}
export default searchEventBus
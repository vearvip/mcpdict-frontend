import { DialectInfo } from '@/types';
import { createStore } from 'solid-js/store';

// 创建一个 store，它包含了你想要跨组件共享的数据。
export const [store, setStore] = createStore<{
  dialectInfos: DialectInfo[]
}>({
  dialectInfos: [],

});
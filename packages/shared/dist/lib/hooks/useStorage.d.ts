import type { BaseStorage } from '@extension/storage';
export declare const useStorage: <Storage extends BaseStorage<Data>, Data = Storage extends BaseStorage<infer Data_1> ? Data_1 : unknown>(storage: Storage) => Exclude<Data, PromiseLike<unknown>>;
//# sourceMappingURL=useStorage.d.ts.map
import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

// 专注时间配置（分钟）
export type FocusTimeConfig = {
  duration: number; // 专注时长（分钟）
  isActive: boolean; // 是否处于专注状态
  startTime?: number; // 开始专注的时间戳
  endTime?: number; // 结束专注的时间戳
};

// 禁用URL列表
export type BlockedUrlsConfig = {
  urls: string[]; // 禁用的URL列表
};

// 专注时间存储
type FocusTimeStorage = BaseStorage<FocusTimeConfig> & {
  startFocus: (duration: number) => Promise<void>;
  stopFocus: () => Promise<void>;
  getRemainingTime: () => Promise<number>; // 获取剩余时间（秒）
};

// 禁用URL列表存储
export type BlockedUrlsStorage = BaseStorage<BlockedUrlsConfig> & {
  addUrl: (url: string) => Promise<void>;
  removeUrl: (url: string) => Promise<void>;
  clearUrls: () => Promise<void>;
};

// 创建专注时间存储
const focusTimeStorage = createStorage<FocusTimeConfig>(
  'focus-time-storage-key',
  {
    duration: 25, // 默认25分钟
    isActive: false,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

// 创建禁用URL列表存储
const blockedUrlsBaseStorage = createStorage<BlockedUrlsConfig>(
  'blocked-urls-storage-key',
  {
    urls: [],
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

// 扩展专注时间存储
export const focusStorage: FocusTimeStorage = {
  ...focusTimeStorage,
  startFocus: async (duration: number) => {
    const now = Date.now();
    await focusTimeStorage.set({
      duration,
      isActive: true,
      startTime: now,
      endTime: now + duration * 60 * 1000,
    });
  },
  stopFocus: async () => {
    await focusTimeStorage.set(current => ({
      ...current,
      isActive: false,
      startTime: undefined,
      endTime: undefined,
    }));
  },
  getRemainingTime: async () => {
    const config = await focusTimeStorage.get();
    if (!config.isActive || !config.endTime) {
      return 0;
    }

    const remaining = Math.max(0, config.endTime - Date.now());
    return Math.floor(remaining / 1000); // 转换为秒
  },
};

// 扩展禁用URL列表存储
export const blockedUrlsStorage: BlockedUrlsStorage = {
  ...blockedUrlsBaseStorage,
  addUrl: async (url: string) => {
    await blockedUrlsBaseStorage.set(current => {
      // 如果URL已存在，则不添加
      if (current.urls.includes(url)) {
        return current;
      }
      return {
        urls: [...current.urls, url],
      };
    });
  },
  removeUrl: async (url: string) => {
    await blockedUrlsBaseStorage.set(current => ({
      urls: current.urls.filter(u => u !== url),
    }));
  },
  clearUrls: async () => {
    await blockedUrlsBaseStorage.set({ urls: [] });
  },
};

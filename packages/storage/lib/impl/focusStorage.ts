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
  studyModeUrls: string[]; // 学习模式URL列表
  studyModeSelectors: Record<string, string[]>; // 学习模式下需要禁用的元素选择器，按URL分组
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
  addStudyModeUrl: (url: string) => Promise<void>;
  removeStudyModeUrl: (url: string) => Promise<void>;
  toggleUrlMode: (url: string, isStudyMode: boolean) => Promise<void>;
  addStudyModeSelector: (url: string, selector: string) => Promise<void>;
  removeStudyModeSelector: (url: string, selector: string) => Promise<void>;
  clearStudyModeSelectors: (url: string) => Promise<void>;
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
    studyModeUrls: [],
    studyModeSelectors: {},
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

// 确保存储结构正确（迁移旧数据）
(async () => {
  try {
    const current = await blockedUrlsBaseStorage.get();
    // 检查是否需要迁移
    if (!current.studyModeUrls || !current.studyModeSelectors) {
      console.log('Migrating blocked URLs storage structure...');
      await blockedUrlsBaseStorage.set(oldData => ({
        urls: oldData.urls || [],
        studyModeUrls: oldData.studyModeUrls || [],
        studyModeSelectors: oldData.studyModeSelectors || {},
      }));
      console.log('Migration complete.');
    }
  } catch (error) {
    console.error('Error migrating blocked URLs storage:', error);
  }
})();

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
      // 如果URL在学习模式列表中，先从学习模式列表中移除
      const studyModeUrls = current.studyModeUrls.filter(u => u !== url);
      return {
        ...current,
        urls: [...current.urls, url],
        studyModeUrls,
      };
    });
  },
  removeUrl: async (url: string) => {
    await blockedUrlsBaseStorage.set(current => ({
      ...current,
      urls: current.urls.filter(u => u !== url),
    }));
  },
  clearUrls: async () => {
    await blockedUrlsBaseStorage.set(current => ({
      ...current,
      urls: [],
    }));
  },
  addStudyModeUrl: async (url: string) => {
    await blockedUrlsBaseStorage.set(current => {
      // 如果URL已存在于学习模式列表，则不添加
      if (current.studyModeUrls.includes(url)) {
        return current;
      }
      // 如果URL在完全禁用列表中，先从完全禁用列表中移除
      const urls = current.urls.filter(u => u !== url);
      return {
        ...current,
        studyModeUrls: [...current.studyModeUrls, url],
        urls,
      };
    });
  },
  removeStudyModeUrl: async (url: string) => {
    await blockedUrlsBaseStorage.set(current => ({
      ...current,
      studyModeUrls: current.studyModeUrls.filter(u => u !== url),
    }));
  },
  toggleUrlMode: async (url: string, isStudyMode: boolean) => {
    if (isStudyMode) {
      await blockedUrlsStorage.addStudyModeUrl(url);
    } else {
      await blockedUrlsStorage.addUrl(url);
    }
  },
  addStudyModeSelector: async (url: string, selector: string) => {
    await blockedUrlsBaseStorage.set(current => {
      const currentSelectors = current.studyModeSelectors[url] || [];
      // 如果选择器已存在，则不添加
      if (currentSelectors.includes(selector)) {
        return current;
      }
      return {
        ...current,
        studyModeSelectors: {
          ...current.studyModeSelectors,
          [url]: [...currentSelectors, selector],
        },
      };
    });
  },
  removeStudyModeSelector: async (url: string, selector: string) => {
    await blockedUrlsBaseStorage.set(current => {
      const currentSelectors = current.studyModeSelectors[url] || [];
      return {
        ...current,
        studyModeSelectors: {
          ...current.studyModeSelectors,
          [url]: currentSelectors.filter(s => s !== selector),
        },
      };
    });
  },
  clearStudyModeSelectors: async (url: string) => {
    await blockedUrlsBaseStorage.set(current => {
      const { [url]: _, ...restSelectors } = current.studyModeSelectors;
      return {
        ...current,
        studyModeSelectors: restSelectors,
      };
    });
  },
};

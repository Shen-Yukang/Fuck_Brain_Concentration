import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { t } from '@extension/i18n';
// import { ToggleButton, FocusTimer, BlockedUrlsList } from '@extension/ui';
import { ToggleButton, FocusTimer, BlockedUrlsList } from '@extension/ui';
// import { FocusTimer } from '@extension/ui/lib/components/FocusTimer';
// import { BlockedUrlsList } from '@extension/ui/lib/components/BlockedUrlsList';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <div className={`App-content ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">专注时间管理</h1>
          <ToggleButton className="mt-0 text-xs px-2 py-0.5">{t('toggleTheme')}</ToggleButton>
        </div>

        <div className="flex flex-col gap-6">
          {/* 专注时间设置 */}
          <FocusTimer />

          {/* 分隔线 */}
          <div className="border-t border-gray-300 dark:border-gray-700"></div>

          {/* 禁用URL列表 */}
          <BlockedUrlsList />
        </div>

        <div className="text-xs text-center mt-4 text-gray-500">专注时间管理工具 v1.0.0</div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);

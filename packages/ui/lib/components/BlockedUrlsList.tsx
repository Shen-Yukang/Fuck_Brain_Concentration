import { blockedUrlsStorage } from '@extension/storage';
import { useStorage } from '@extension/shared';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type BlockedUrlsListProps = {
  className?: string;
};

export const BlockedUrlsList = ({ className }: BlockedUrlsListProps) => {
  const blockedUrls = useStorage(blockedUrlsStorage);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');

  // 添加URL
  const handleAddUrl = () => {
    // 简单验证URL格式
    if (!newUrl.trim()) {
      setError('请输入URL');
      return;
    }

    // 尝试解析URL，确保格式正确
    try {
      // 如果没有协议，添加https://
      let urlToAdd = newUrl;
      if (!urlToAdd.startsWith('http://') && !urlToAdd.startsWith('https://')) {
        urlToAdd = 'https://' + urlToAdd;
      }

      // 尝试创建URL对象验证格式
      new URL(urlToAdd);

      // 添加到存储
      blockedUrlsStorage.addUrl(urlToAdd);
      setNewUrl('');
      setError('');
    } catch (e) {
      setError('无效的URL格式');
    }
  };

  // 删除URL
  const handleRemoveUrl = (url: string) => {
    blockedUrlsStorage.removeUrl(url);
  };

  // 清空所有URL
  const handleClearAll = () => {
    if (confirm('确定要清空所有禁用URL吗？')) {
      blockedUrlsStorage.clearUrls();
    }
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <h2 className="text-lg font-bold">专注时禁用网站</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          placeholder="输入要禁用的网站URL"
          className="border rounded px-2 py-1 flex-1"
          onKeyDown={e => e.key === 'Enter' && handleAddUrl()}
        />
        <button onClick={handleAddUrl} className="py-1 px-3 rounded shadow hover:scale-105 bg-blue-500 text-white">
          添加
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto">
        {blockedUrls.urls.length === 0 ? (
          <p className="text-gray-500 text-sm italic">暂无禁用网站</p>
        ) : (
          <>
            {blockedUrls.urls.map((url, index) => (
              <div key={index} className="flex justify-between items-center py-1 px-2 bg-gray-100 rounded">
                <span className="text-sm truncate flex-1">{url}</span>
                <button onClick={() => handleRemoveUrl(url)} className="text-red-500 hover:text-red-700 ml-2">
                  ✕
                </button>
              </div>
            ))}

            {blockedUrls.urls.length > 0 && (
              <button onClick={handleClearAll} className="text-sm text-red-500 hover:text-red-700 self-end mt-1">
                清空所有
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

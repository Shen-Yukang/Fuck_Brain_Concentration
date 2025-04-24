import { focusStorage } from '@extension/storage';
import { useStorage } from '@extension/shared';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type FocusTimerProps = {
  className?: string;
};

export const FocusTimer = ({ className }: FocusTimerProps) => {
  const focusConfig = useStorage(focusStorage);
  const [duration, setDuration] = useState(focusConfig.duration);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(focusConfig.isActive);

  // 格式化时间为 MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 更新剩余时间
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (focusConfig.isActive) {
      // 立即获取一次剩余时间
      focusStorage.getRemainingTime().then(time => {
        setRemainingTime(time);
      });

      // 设置定时器每秒更新一次
      interval = setInterval(() => {
        focusStorage.getRemainingTime().then(time => {
          setRemainingTime(time);

          // 如果时间到了，自动停止专注
          if (time <= 0 && focusConfig.isActive) {
            focusStorage.stopFocus();
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [focusConfig.isActive]);

  // 同步状态
  useEffect(() => {
    setIsActive(focusConfig.isActive);
    setDuration(focusConfig.duration);
  }, [focusConfig]);

  // 开始专注
  const handleStartFocus = () => {
    focusStorage.startFocus(duration);
  };

  // 停止专注
  const handleStopFocus = () => {
    focusStorage.stopFocus();
  };

  // 更新时长
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setDuration(value);
    }
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <h2 className="text-lg font-bold">专注时间设置</h2>

      {isActive ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">{formatTime(remainingTime)}</div>
          <button
            onClick={handleStopFocus}
            className="py-1 px-4 rounded shadow hover:scale-105 bg-red-500 text-white font-bold">
            停止专注
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="duration" className="whitespace-nowrap">
              专注时长 (分钟):
            </label>
            <input
              id="duration"
              type="number"
              min="1"
              max="180"
              value={duration}
              onChange={handleDurationChange}
              className="border rounded px-2 py-1 w-16 text-center"
            />
          </div>
          <button
            onClick={handleStartFocus}
            className="py-1 px-4 rounded shadow hover:scale-105 bg-green-500 text-white font-bold">
            开始专注
          </button>
        </div>
      )}
    </div>
  );
};

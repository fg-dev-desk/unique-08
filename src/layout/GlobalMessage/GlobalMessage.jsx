import React from 'react';
import { useGlobalMessage } from './useGlobalMessage';

export const GlobalMessage = () => {
  const { data, loading } = useGlobalMessage();

  if (loading) {
    return (
      <div className={data.container.className}>
        <div className={data.overlay.className}>
          <div className={data.loading.spinnerClass} role="status">
            <span className="visually-hidden">{data.loading.text}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
import { useEffect } from 'react';

import { useWebSocket } from '../context';

export const useSendWebSocket = (payload: Record<string, string>) => {
  const ws = useWebSocket();

  useEffect(() => {
    if (ws) {
      ws.send(JSON.stringify(payload));
    }
  }, [payload, ws]);
};

import React, { useState, useEffect, useRef } from 'react';

export default function FetchInterceptor({ children }) {
  const [activeCount, setActiveCount] = useState(0);
  const [isSlow, setIsSlow] = useState(false);
  const [error, setError] = useState(null);
  const [hasCompletedFirstFetch, setHasCompletedFirstFetch] = useState(false);

  const activeCountRef = useRef(0);
  const slowTimerRef = useRef(null);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      // Increment active request count
      activeCountRef.current += 1;
      setActiveCount(activeCountRef.current);

      if (activeCountRef.current === 1) {
        setIsSlow(false);
        setError(null);

        if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
        slowTimerRef.current = setTimeout(() => {
          setIsSlow(true);
        }, 1500); // 1.5 seconds threshold for slow responses
      }

      try {
        const response = await originalFetch(...args);
        
        // If response is not ok (e.g. 4xx or 5xx status code), trigger error state
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setHasCompletedFirstFetch(true);
        return response;
      } catch (err) {
        // Avoid setting error for aborted requests if any
        if (err.name !== 'AbortError') {
          setError(err.message || 'An error occurred while fetching data.');
        }
        throw err; // Re-throw so original caller handles it
      } finally {
        activeCountRef.current -= 1;
        setActiveCount(activeCountRef.current);

        if (activeCountRef.current === 0) {
          if (slowTimerRef.current) {
            clearTimeout(slowTimerRef.current);
            slowTimerRef.current = null;
          }
          setIsSlow(false);
        }
      }
    };

    return () => {
      window.fetch = originalFetch;
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, []);

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  const handleDismiss = () => {
    setError(null);
  };

  return (
    <>
      {children}

      {/* Loading Overlay */}
      {!hasCompletedFirstFetch && !error && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-300">
          <div className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full mx-4 text-center">
            {/* Elegant Spinning Indicator */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-6">
              <div className="absolute w-16 h-16 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute w-16 h-16 border-4 border-t-blue-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute w-10 h-10 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
            </div>

            <h3 className="text-xl font-semibold text-slate-850 dark:text-slate-100">
              Loading data...
            </h3>
            
            {isSlow && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 animate-pulse transition-all duration-500">
                The server may take a moment to start.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-300">
          <div className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950 shadow-2xl max-w-sm w-full mx-4 text-center">
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Connection Error
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {error}
            </p>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={handleRetry}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all font-medium text-sm hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Retry Connection
              </button>
              <button
                onClick={handleDismiss}
                className="w-full py-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm font-medium cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

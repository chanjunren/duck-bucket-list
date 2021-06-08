import { useState, useCallback, useRef, useEffect } from 'react';

const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorEncountered, setErrorEncountered] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers) => {
        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortController.signal
            });

            const responseData = await response.json();
            setIsLoading(false);

            activeHttpRequests.current.filter(requestController => requestController !== httpAbortController);

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            return responseData;
        } catch (err) {
            setErrorEncountered(err.message);
            throw err;
        }
    }, []);

    const clearError = () => {
        setErrorEncountered(null);
        setIsLoading(false);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortController => {
                abortController.abort();
            })
        }
    }, []);

    return { isLoading, errorEncountered, sendRequest, clearError };
}

export default useHttpClient;
/**
 * Implement useCallback using useState and useEffect
 */

function useCallback(callback, dependencies) {
    const [state, setState] = useState({ callback });

    useEffect(() => {
        setState({ callback });
    }, dependencies);

    return state.callback;
}


/**
 * Implement useCallback using useMemo
 */
function useCallback(callback, dependencies) {
    return useMemo(() => callback, dependencies);
}
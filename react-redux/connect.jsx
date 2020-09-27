import { ReactReduxContext } from 'react-redux';
import { useEffect, useState } from 'react';

function connect(mapStateToProps, mapDispatchToProps) {
    return function (ToBeWrappedComponent) {
        return function HOCWrapper(props) {
            const [dummyInt, setDummyInt] = useState(1);
            useEffect(() => {
                const handleChange = () => {
                    setDummyInt(prev => prev + 1)
                };

                store.subscribe(handleChange);

                return () => store.unsubscribe(handleChange);
            }, []);

            return <ReactReduxContext.Consumer>
                {({ store }) => {
                    <ToBeWrappedComponent {...props} {...mapStateToProps(store.getState())} {...mapDispatchToProps(store.dispatch)} />
                }}
            </ReactReduxContext.Consumer>
        }
    }
}
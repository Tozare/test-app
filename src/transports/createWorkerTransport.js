import {
    SnackTransport,
    SnackTransportOptions,
    SnackTransportMessage,
    SnackTransportListener,
} from 'snack-sdk';

export default function createWorkerTransport(options) {
    let transport = null;
    function getTransport() {
        if (!transport) {
            const worker = new Worker(
                new URL('../transports/SnackTransport.worker.js', "http://localhost:3000/"),
                {
                    name: ``,
                    type: 'classic',
                }
            );
            worker.postMessage({ type: 'init', data: options });
            transport = worker;
        }
        return transport;
    }
    let transportListener;
    return {
        addEventListener: (type, listener) => {
            if (!transportListener) {
                transportListener = (event) => {
                    const message = event.data;
                    listener(message);
                };
            }
            getTransport().addEventListener(type, transportListener);
        },
        removeEventListener: (type , _listener) => {
            if (transportListener) {
                transport?.removeEventListener(type, transportListener);
                transportListener = undefined;
            }
        },
        postMessage: (message) => getTransport().postMessage(message),
    };
}
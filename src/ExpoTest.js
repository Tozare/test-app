import React from 'react';
import { Snack } from 'snack-sdk';
import createWorkerTransport from './transports/createWorkerTransport';

export const ExpoTest = () => {
    const webPreviewRef = React.useRef(null);
    const [snack] = React.useState(() =>
        new Snack({
            host: "https://test-app-12341.herokuapp.com/",
            files: {
                'App.js': {
                    type: 'CODE',
                    contents: `
import * as React from 'react';
import { View, Text } from 'react-native';

export default () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text style={{fontSize: 20, textAlign: 'center'}}>
      Hello Snack!
    </Text>
  </View>
);
`
                }
            },
            webPreviewRef,
            // verbose: true,
            // ...{createTransport: createWorkerTransport}
            // ...(USE_WORKERS ? { createTransport: createWorkerTransport } : {}),
        })
    );


//     const snack = new Snack({
//         files: {
//             'App.js': {
//                 type: 'CODE',
//                 contents: `
// import * as React from 'react';
// import { View, Text } from 'react-native';
//
// export default () => (
//   <View style={{flex: 1, justifyContent: 'center'}}>
//     <Text style={{fontSize: 20, textAlign: 'center'}}>
//       Hello Snack!
//     </Text>
//   </View>
// );
// `
//             }
//         },
//         // webPreviewRef,
//         verbose: true,
//         // ...{createTransport: createWorkerTransport}
//         // ...(USE_WORKERS ? { createTransport: createWorkerTransport } : {}),
//     })
    snack.setOnline(true);
    // const getWebPreview =
    // const getAsyncURL = async () => {
    //     const connectedClients = await snack.getPreviewAsync();
    //     Object.values(connectedClients).forEach(client => {
    //         console.log(
    //             `Preview ${client.platform}, url: ${client.previewURL}, time: ${client.previewTimestamp}`
    //         );
    //     });
    // };
    //
    // getAsyncURL();
    console.log(snack.getState());
    const { webPreviewURL } = snack.getState();
// Make the Snack available online
    return (
        <div style={{height: 40, backgroundColor: "blue"}}>
            HI bitch
            <iframe
                ref={(c) => (webPreviewRef.current = c?.contentWindow ?? null)}
                src={webPreviewURL}
                allow="geolocation; camera; microphone"
            />
        </div>
    );

}
import './index.css';
import React from 'react';

// highlight-import
import CreativeEditorSDK from '@cesdk/cesdk-js';
// highlight-import

import { useEffect, useRef, useState } from 'react';

// highlight-component
const config = {
  license: 'vERESgSXbYj5Rs-FF4DzkMvhdQLh0Mxe6AD8V-doP6wqe_gmYmx_oUKqIlMkwpMu',
  userId: 'guides-user',
  // Enable local uploads in Asset Library
  callbacks: { onUpload: 'local' },
};

export default function CreativeEditorSDKComponent() {
  // highlight-state
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  // highlight-state
  // highlight-effect
  useEffect(() => {
    if (!cesdk_container.current) return;

    let cleanedUp = false;
    let instance;
    CreativeEditorSDK.create(cesdk_container.current, config).then(
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }

        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await Promise.all([
          instance.addDefaultAssetSources(),
          instance.addDemoAssetSources({ sceneMode: 'Video' }),
        ]);
        await instance.createVideoScene();

        setCesdk(instance);
      }
    );
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return cleanup;
  }, [cesdk_container]);
  //highlight-effect
  return (
    // highlight-container
    <div
      ref={cesdk_container}
      style={{ width: '100%', height: '100vh' }}
    ></div>
    // highlight-container
  );
}
// highlight-component

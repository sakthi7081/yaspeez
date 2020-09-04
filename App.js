import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Navigation from './navigators';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {/* <KeyboardAwareScrollView> */}
          <Navigation />
        {/* </KeyboardAwareScrollView> */}
      </ApplicationProvider>
    </>
  );
}

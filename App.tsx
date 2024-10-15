import { NavigationContainer } from '@react-navigation/native';

import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useMemo } from 'react';
import Screens from 'Screens';
import { getItem } from '@libs';
import { setDark, store, useAppDispatch, useAppSelector } from '@redux';
import { CombinedDarkTheme, CombinedDefaultTheme } from 'themeConfig';

export function AppProvider(){
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.isDark.isDark);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  // load storage before render
  useMemo(() => {
    async function loadStorage(){
      const isDark = await getItem("isDark");

      if(isDark !== null)
        dispatch(setDark(isDark))
    }

    loadStorage();
  }, [])

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer 
          theme={theme} 
          documentTitle={{
            formatter: () => "All You Can Shop",
          }}
        >
          <Screens />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default function ReduxWrapper(){
  return (
    <Provider store={store}>
      <AppProvider />
    </Provider>
  );
}

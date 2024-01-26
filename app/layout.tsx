/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */

'use client';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import 'css/main.css';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

import React, { ReactNode, useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, Burger, Loader, ScrollArea, Group, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import persistStore from 'redux-persist/es/persistStore';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from '@mantine/notifications';
import { usePathname, useRouter } from 'next/navigation';
import { RootState, store } from '@/shared/providers';
import getFCMToken from '@/shared/hooks/getFCMToken';
import { useApiHandler } from '@/shared/hooks';
import { API_registerDevice, API_registerFCM } from '@/shared/apis';
import configureFirebase from '@/shared/hooks/firebase/configureFirebase';
import Cookies from 'js-cookie';
import AdminSidebar from '@/shared/components/AdminSidebar';
import AdminHeader from '@/shared/components/AdminHeader';
import MantineTheme from '../theme';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import "use-context-menu/styles.css";
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { setGlobalData } from '@/shared/providers/globalSlice';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.locale('id');
dayjs.tz.setDefault('Asia/Jakarta');

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [splashLoading, setSplashLoading] = useState(true);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const auth = useSelector((state: RootState) => state.auth);
  const globalHeaderState = useSelector((state: RootState) => state.global.globalData);
  const notifCount = useSelector((state: RootState) => state.global.globalData.notifCount);
  const dispatcher = useDispatch();

  const checkIsloggedIn = async () => {
    if (!auth.isLoggedIn) return router.replace('/login');
  };

  useEffect(() => {
    (window as any).dayjs = dayjs;
    checkIsloggedIn();
    setSplashLoading(false);
  }, []);

  useEffect(() => { setSplashLoading(false) }, []);

  if (auth.isLoggedIn) {
    return (
      <>
        <LoadingOverlay visible={splashLoading} zIndex={1000} />
        {!pathname?.startsWith('/login') ? (
          <AppShell
            navbar={{
              width: 176,
              breakpoint: 'sm',
              collapsed: { mobile: !mobileOpened },
            }}
            header={{ height: '4rem' }}
          >
            <AppShell.Header>
              <Group h="100%" px="md" className='!flex-nowrap'>
                <AdminHeader toggleOpen={toggleMobile} />
              </Group>
            </AppShell.Header>

            <AppShell.Navbar>
              <AdminSidebar opened={mobileOpened} toggleOpen={toggleMobile} role="developer" />
            </AppShell.Navbar>

            <AppShell.Main>
              <div className='p-4'>
                {children}
              </div>
            </AppShell.Main>
          </AppShell>
        ) : undefined}
        {pathname?.startsWith('/login') ? children : undefined}
      </>
    );
  } else {
    return (
      <>{children}</>
    )
  }
};

const persistor = persistStore(store, undefined);

const App = (props: { children: any }) => {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/logo-mini.svg" />
        <meta
          name="viewport"
          // content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body>
        {/* <div className='font-bold border-gray-600 text-white'>sdjfsdjfdsh</div> */}
        <MantineProvider theme={MantineTheme} >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Notifications position="top-right" />
              <RootLayout {...props} />
            </PersistGate>
          </Provider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default App;

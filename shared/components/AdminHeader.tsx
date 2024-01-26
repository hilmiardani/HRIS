/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Avatar, Burger, Button, Menu, Select, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import ArrowDown from "icons/ArrowDown";
import ButtonIcon from "./buttons/ButtonIcon";
import Logout from "icons/Logout";
import User from "@/icons/User";
import Bell from "@/icons/Bell";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useIntersectionObserver } from "../hooks/window";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../providers";
import { setGlobalData } from "../providers/globalSlice";
import { useApiHandler } from "../hooks";
import { setAuth, logout } from "../providers/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { API_getAllNotification } from "../apis/notification/getAllNotification";
import DarkMode from "@/icons/DarkMode";
import LightMode from "@/icons/LightMode";
import { API_getAdmin, API_logout } from "../apis";

export default function AdminHeader({ toggleOpen }: { toggleOpen: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const global = useSelector((state: RootState) => state.global.globalData);
  const auth = useSelector((state: RootState) => state.auth.data);
  const dispatcher = useDispatch();

  // const { data, fetch } = useApiHandler(API_getAllProperty, { silence: false })
  const { fetch: fetchAdmin } = useApiHandler(API_getAdmin, { silence: true })
  const { data: notificationData, fetch: fetchNotification, loadMore } = useApiHandler(API_getAllNotification, { silence: true })
  const { fetch: fetchLogout } = useApiHandler(API_logout, { silence: false })
  const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();
  // const handleNotification = async (id: Number) => {
  //   const res: any = await apiCall({
  //     method: "POST",
  //     url: `notification/${id}`,
  //     silence: true,
  //   });
  //   if (res) {
  //     console.log("res notif: ", res);
  //   }
  //   // do something
  //   // alert(`Notifications ${id}`);
  // };

  const getInfoProfile = async () => {
    try {
      if (auth?.id !== undefined) {
        const res = await fetchAdmin({
          params: {
            adminId: auth.id
          }
        })
        if (res) {
          dispatcher(setAuth({
            ...auth,
            name: res.data.data.name,
            email: res.data.data.email,
            thumbnail: res.data.data.thumbnail
          }))
        }
      }
    } catch (error) {
      console.warn(error)
    }
  };

  // const modifiedData = pathname.startsWith('/overview')
  //   ? [{ value: 'ALL', label: 'All' }, ...data?.map((value) => ({ value: String(value.id), label: value.name })) || []]
  //   : data?.map((value) => ({ value: String(value.id), label: value.name })) || [];

  const loadmoreRef = useIntersectionObserver({ threshold: 0.5 }, (entries) => {
    if (entries[0].isIntersecting) loadMore()
  });

  const changeProperty = (val: string) => {
    dispatcher(setGlobalData({ ...global, propertyId: val}))
  }

  const authLogout = async () => {
    const result = await fetchLogout({})
    if (result) {
      dispatcher(logout())
      router.replace('/login')
    }
  }

  const getAllNotification = async () => {
    try {
      const res = await fetchNotification({})
    } catch (error) {
      console.warn(error)
    }
  }

  const handleToggleColorScheme = () => {
    if(colorScheme === 'auto') setColorScheme('light');
    if(colorScheme === 'dark') setColorScheme('light');
    if(colorScheme === 'light') setColorScheme('dark');
    else return
  }

  useEffect(() => {
    getInfoProfile();
    getAllNotification()
  }, []);

  return (
    <>
      <NextLink className="md:w-48 " href="/admin">
        <div className="hidden md:block">
          {/* <Image alt="" src="/logo.svg" width="146" height="35" /> */}
          <p className="text-lg font-bold">H  R  I  S</p>
        </div>
        <div className="md:hidden">
          {/* <Image alt="" src="/logo-mini.svg" width="15" height="15" /> */}
          <p className="text-xs font-bold">H  R  I  S</p>
        </div>
      </NextLink>
      <div className="md:hidden">
        <Burger onClick={toggleOpen} hiddenFrom="sm" size="sm" mr="xl" />
      </div>
      {/* {
        !pathname?.startsWith("/property") && !pathname?.startsWith("/log") &&
        <div className="">
          <Select
            defaultValue='ALL'
            spellCheck={false}
            searchable
            placeholder="Select Property"
            data={modifiedData}
            value={global?.propertyId}
            onChange={(e: any) => changeProperty(e)}
          />
        </div>
      } */}
      <div className="ml-auto flex gap-4 items-center">
        <Menu position="bottom-end" width={250} >
          <Menu.Target>
            <div className="relative cursor-pointer">
              <Bell className="w-7" />
              <div className="w-4 h-4 rounded-full bg-red-500 absolute top-0 right-0 items-center justify-center text-white flex">
                <span className="text-xs">{notificationData?.length}</span>
              </div>
            </div>
          </Menu.Target>
          <Menu.Dropdown className="border-none shadow-lg p-0 max-h-64 overflow-x-auto">
            {notificationData && notificationData.length > 0 &&
              notificationData?.map((value: any, index: number) => (
                <Menu.Item
                  key={index}
                  leftSection={<User className="w-6" />}
                  onClick={() => console.log('Must implement Notification Clicked')}
                >
                  <div className="flex flex-col">
                    <span>
                      {value.name} - {index + 1}
                    </span>
                    <span>{value.email}</span>
                  </div>
                </Menu.Item>
              ))}
            {
              notificationData && notificationData.length > 0 &&
              <Menu.Item>
                <span ref={loadmoreRef}></span>
              </Menu.Item>
            }
            {
              notificationData && notificationData.length <= 0 || notificationData === undefined &&
              <Menu.Item>
                <span className="w-full inline-flex justify-center">No Notification</span>
              </Menu.Item>
            }
          </Menu.Dropdown>
        </Menu>

        <Menu position="bottom-end" offset={2} width={200}>
          <Menu.Target>
            <button className="flex flex-row items-center gap-3">
              <Avatar
                src={auth?.thumbnail ? auth.thumbnail : "/avatar.svg"}
                size={30}
                bg="gray"
                radius="xl"
              />
              <span className="text-sm whitespace-nowrap hidden md:block">{auth?.name}</span>
              <ArrowDown className="fill-gray-500 w-5" />
            </button>
          </Menu.Target>
          <Menu.Dropdown className=" p-0">
            <Menu.Item leftSection={<User className="w-6" />} onClick={() => router.push('/profile')}>Profile</Menu.Item>
            <Menu.Item leftSection={<Logout className="w-6" />} onClick={() => authLogout()}>Logout</Menu.Item>
            {
              colorScheme === 'auto' ? <Menu.Item leftSection={<LightMode className="w-6" />} onClick={handleToggleColorScheme}>Light Mode</Menu.Item> :
              colorScheme === 'light' ? <Menu.Item leftSection={<DarkMode className="w-6" />} onClick={handleToggleColorScheme}>Dark Mode</Menu.Item> :
              colorScheme === 'dark' ? <Menu.Item leftSection={<LightMode className="w-6" />} onClick={handleToggleColorScheme}>Light Mode</Menu.Item> : undefined
            }
            <Menu.Item leftSection={<DarkMode className="w-6" />} onClick={() => setColorScheme('auto')}>Device Default</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );
}

import getUniqueId from "@/shared/utils/getUniqueId";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_registerDevice } from "@/shared/apis/device";
import { registerDevice } from "@/shared/providers/deviceSlice";
import { RootState } from "@/shared/providers";

export default function CheckDevice() {
  // const [device, setDevice] = useRecoilState(deviceStore);
  const device = useSelector((state: RootState) => state.device);
  const dispatcher = useDispatch();

  const checkDeviceRegistration = async () => {
    console.log("Check device registration");
    try {
      console.log("Check device registration calling API");

      if (!device.registered || !device.data?.id || !device.data?.token) {
        const result = await API_registerDevice({
          data: {
            fingerprint: await getUniqueId(),
          }
        });
        console.log("Result check device ", result);

        if (result) {
          dispatcher(
            registerDevice({
              id: result.data.data.id,
              token: result.data.data.deviceToken,
            })
          );
        }

        // const result = (await apiCall({
        //   method: "post",
        //   url: "/device/register",
        //   data: {
        //     fingerprint: await getUniqueId(),
        //   },
        // })) as any;
        // console.log("Result", result);

        // if (result) {
        //   setDevice((prev) => ({
        //     ...prev,
        //     data: { id: result.id, token: result.deviceToken },
        //     registered: true,
        //   }));
        // }
      } else {
        console.log("Device is already registered", device);

        dispatcher(
          registerDevice({
            ...device,
            id: device.data?.id,
            token: device.data?.token,
          })
        );

        // setDevice((prev) => ({
        //   ...prev,
        //   data: { id: device.data?.id, token: device.data?.token },
        // }));
      }
      return true;
    } catch (error) {
      console.warn(error);
      // assume network error
      if (error instanceof AxiosError) console.log(error?.response?.data?.message);
      return false;
    }
  };

  useEffect(() => {
    checkDeviceRegistration();
  }, []);

  return <></>;
}

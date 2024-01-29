"use client";
import ProfileCard from "@/components/Global/Card/ProfileCard";
import { API_getOverview, ApiGetOverviewInputSchema } from "@/shared/apis/overview/getOverview";
import { useApiHandler } from "@/shared/hooks";
import { ribu } from "@/shared/support/formater";
import { Avatar, Grid, Group, Text } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { IconAt, IconPhoneCall } from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

interface DateState {
  start?: Dayjs,
  end?: Dayjs
}

export default function Overview() {
  const [date, setDate] = useState<DateState>({
    start: dayjs().startOf('month'),
    end: dayjs().endOf('month')
  })

  const { data, loadMore, setInput, input, load } = useApiHandler(API_getOverview, {
    silence: false, eager: true, inputValidator: ApiGetOverviewInputSchema,
    defaultInput: {
      query: {
        startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs().endOf('month').format('YYYY-MM-DD')
      }
    }
  })

  const onChangeDate = (isStart: boolean) => (dateValue: DateValue) =>
    setInput({
      query: {
        startDate: isStart ? dayjs(dateValue).format('YYYY-MM-DD') : input?.query?.startDate,
        endDate: !isStart ? dayjs(dateValue).format('YYYY-MM-DD') : input?.query?.endDate
      }
    })

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-slate-500 w-fit rounded-xl p-4">
        <ProfileCard
          name="Gus Abdul Majid S.Pd M.Mk"
          role="SENIOR KJHL NI BOS"
          email="abdoelganteng@kjhl.ac.id"
          phone="+62 896 0820 7601"
          avatarSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        />
      </div>
      <div className="inline-flex gap-4 flex-col">
        {/* <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-52">
            <DateInput
              label="Start Date"
              placeholder="Start Date"
              value={input?.query?.startDate ? dayjs(input?.query?.startDate, 'YYYY-MM-DD').toDate() : undefined}
              onChange={onChangeDate(true)}
              className="w-auto whitespace-nowrap"
              valueFormat="D MMM YYYY"
            />
          </div>
          <div className="w-full md:w-52">
            <DateInput
              label="End Date"
              placeholder="End Date"
              value={input?.query?.endDate ? dayjs(input?.query?.endDate, 'YYYY-MM-DD').toDate() : undefined}
              onChange={onChangeDate(false)}
              className="w-auto whitespace-nowrap"
              valueFormat="D MMM YYYY"
            />
          </div>
        </div> */}
      </div>
      <Grid>
        <Grid.Col span={{ md: 12, xs: 12 }}>
          <div >
            <Text fz="lg" fw={700}>This Month</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">1</Text>
            <Text fz="md">Attendance</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">12</Text>
            <Text fz="md">Absence Remaining</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">0</Text>
            <Text fz="md">Late</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">1</Text>
            <Text fz="md">Pending Absence Request</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">1</Text>
            <Text fz="md">Sick Leave</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">1</Text>
            <Text fz="md">Pending Dispute</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 12, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">1</Text>
            <Text fz="md">Absence</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 6, xs: 12 }}>
          <div className="flex flex-row gap-2">
            <Text fz="md">Total Paycut </Text>
            <Text fz="md">Rp. {ribu(1000000)}</Text>
          </div>
        </Grid.Col>
      </Grid>
    </div >
  );
}

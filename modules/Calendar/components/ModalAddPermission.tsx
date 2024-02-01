import React, { useEffect, useState } from "react";
import { Button, FileInput, Select, Text, TextInput, Textarea } from "@mantine/core";
import ModalGlobal from "@/shared/components/modal/ModalGlobal";
import { API_addPermissionInput, ApiAddPermissionInputSchema } from "@/shared/apis";
import { DateInput, DateValue, DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";

interface ModalAddPermissionProps {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  onSave: (input: API_addPermissionInput['data'], files: File[]) => any;
  onCancel: () => any
}
type PartialInterface<T> = {
  [K in keyof T]?: T[K];
};
type InputState = Omit<PartialInterface<API_addPermissionInput['data']>, ''>

export const ModalAddPermission = ({ opened, setOpened, onSave, onCancel }: ModalAddPermissionProps) => {
  const [input, setInput] = useState<InputState>()
  const [files, setFiles] = useState<File[]>([]);
  const [correct, setCorrection] = useState<boolean>(true)
  const handleSave = () => {
    const validated = ApiAddPermissionInputSchema.safeParse({ data: { ...input } });
    if (validated.success) onSave(validated.data.data, files);
  };
  const validate = () => {
    const validated = ApiAddPermissionInputSchema.safeParse({ data: { ...input } })    
    if (validated.success) setCorrection(true)
    else setCorrection(false)
  }

  const onChangeDate = (isStart: boolean) => (dateValue: DateValue) => {
    const formattedDate = dayjs(dateValue).format('YYYY-MM-DD');
    setInput((prevInput) => ({
      ...prevInput,
      startDate: isStart ? formattedDate : (prevInput?.startDate || ''),
      endDate: isStart ? (prevInput?.endDate || '') : formattedDate,
    }));
  };

  useEffect(() => { validate() }, [input])
  useEffect(() => {
    if (opened === false) setInput({})
  }, [opened])

  return (
    <ModalGlobal
      opened={opened}
      title={"Request Leave"}
      onClose={onCancel}
      classNames={{ content: "!overflow-y-visible" }}
    >
      <div className="flex flex-col gap-2">
        <DatesProvider settings={{ locale: 'id', firstDayOfWeek: 1, weekendDays: [0], timezone: 'UTC+7' }}>
          <DateInput
              label="Start Date"
              placeholder="Start Date"
              value={input?.startDate ? dayjs(input?.startDate, 'YYYY-MM-DD').toDate() : undefined}
              onChange={onChangeDate(true)}
              className="w-auto whitespace-nowrap"
              valueFormat="D MMM YYYY"
          />
        </DatesProvider>
        <DateInput
            label="End Date"
            placeholder="End Date"
            value={input?.endDate ? dayjs(input?.endDate, 'YYYY-MM-DD').toDate() : undefined}
            onChange={onChangeDate(true)}
            className="w-auto whitespace-nowrap"
            valueFormat="D MMM YYYY"
        />
        <Select
          label="Request"
          placeholder="Request"
          className="w-auto whitespace-nowrap"
          value={input?.type}
          onChange={ (e) => { if(e !== null) setInput((s) => ({ ...s, type: e }))} } 
          data={[
              { value: 'CUTI', label: 'Cuti' },
              { value: 'SAKIT', label: 'Sakit' },
              { value: 'DISPUTE', label: 'Dispute' },
              { value: 'CUTI_MELAHIRKAN', label: 'Cuti Melahirkan' },
              { value: 'BERDUKA', label: 'Berduka' }
          ]}
        />
        <Textarea
            required
            label="Description"
            placeholder="Description"
            value={input?.description}
            onChange={ (e) => setInput((s) => ({ ...s, description: e.target.value })) }
        />
        {/* <FileInput multiple value={input?.file} onChange={ (e: any) => setInput((s) => ({ ...s, file: e.target.value })) } /> */}
        <FileInput label="File" placeholder="File" multiple value={files} onChange={setFiles} />
        <div className="flex w-full justify-end mt-4 gap-2">
          <Button disabled={!correct} onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </ModalGlobal>
  );
};

export default ModalAddPermission;

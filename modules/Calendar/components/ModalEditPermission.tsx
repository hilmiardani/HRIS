import React, { useEffect, useState } from "react";
import { Button, FileInput, Select, Text, TextInput, Textarea } from "@mantine/core";
import ModalGlobal from "@/shared/components/modal/ModalGlobal";
import { APIEditPermission, UpdatePermissionInputSchema } from "@/shared/apis";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import { Permission } from "@/shared/@types";

interface ModalEditPermissionProps {
  opened: Permission | undefined
  onSave: (input: APIEditPermission, files: File[]) => Promise<any>
  onCancel: () => any
}
type PartialInterface<T> = {
  [K in keyof T]?: T[K];
};
type InputState = Omit<PartialInterface<Permission>, ''> | undefined

export const ModalEditPermission = ({ opened, onSave, onCancel }: ModalEditPermissionProps) => {
  const [input, setInput] = useState<InputState>()
  const [files, setFiles] = useState<File[]>([]);
  const [correct, setCorrection] = useState<boolean>(true)
  const handleSave = () => {
    const body = {
      startDate: input?.startDate,
      endDate: input?.endDate,
      type: input?.type,
      desc: input?.desc,
      files: input?.files
    }
    console.log('Body: ', body);
    console.log('input: ', input);
    const datax = { params: { permissionId: input?.id }, data: body }
    const validated = UpdatePermissionInputSchema.safeParse(datax)
    console.log('Validated: ', validated);
    if (validated.success) onSave(validated.data, files)
  };
  const validate = () => {
    const body = {
      startDate: input?.startDate,
      endDate: input?.endDate,
      type: input?.type,
      desc: input?.desc,
      files: input?.files
    }
    const datax = { params: { permissionId: input?.id }, data: body }
    const validated = UpdatePermissionInputSchema.safeParse(datax)
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
    setInput(opened)
  }, [opened])

  return (
    <ModalGlobal
      opened={opened !== undefined}
      title={"Request Leave"}
      onClose={onCancel}
      classNames={{ content: "!overflow-y-visible" }}
    >
      <div className="flex flex-col gap-2">
        <DateInput
            label="Start Date"
            placeholder="Start Date"
            value={input?.startDate ? dayjs(input?.startDate, 'YYYY-MM-DD').toDate() : undefined}
            onChange={onChangeDate(true)}
            className="w-auto whitespace-nowrap"
            valueFormat="D MMM YYYY"
        />
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
              { value: 'Cuti', label: 'Cuti' },
              { value: 'Sakit', label: 'Sakit' },
              { value: 'Dispute', label: 'Dispute' },
              { value: 'Cuti Melahirkan', label: 'Cuti Melahirkan' },
              { value: 'Berduka', label: 'Berduka' }
          ]}
        />
        <Textarea
            required
            label="Description"
            placeholder="Description"
            value={input?.desc}
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

export default ModalEditPermission;

import React, { useEffect, useState } from "react";
import { Button, FileInput, Select, Text, TextInput, Textarea } from "@mantine/core";
import ModalGlobal from "@/shared/components/modal/ModalGlobal";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import { API_addDisputeInput, ApiAddDisputeInputSchema } from "@/shared/apis/calendar/addDispute";

interface ModalAddDisputeProps {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  onSave: (input: API_addDisputeInput['data'], files: File[]) => any;
  onCancel: () => any
}
type PartialInterface<T> = {
  [K in keyof T]?: T[K];
};
type InputState = Omit<PartialInterface<API_addDisputeInput['data']>, ''>

export const ModalAddDispute = ({ opened, setOpened, onSave, onCancel }: ModalAddDisputeProps) => {
  const [input, setInput] = useState<InputState>()
  const [files, setFiles] = useState<File[]>([]);
  const [correct, setCorrection] = useState<boolean>(true)
  const handleSave = () => {
    const validated = ApiAddDisputeInputSchema.safeParse({ data: { ...input } });
    if (validated.success) onSave(validated.data.data, files);
  };
  const validate = () => {
    const validated = ApiAddDisputeInputSchema.safeParse({ data: { ...input } })    
    if (validated.success) setCorrection(true)
    else setCorrection(false)
  }

  const onChangeDate = (dateValue: DateValue) => {
    const formattedDate = dayjs(dateValue).format('YYYY-MM-DD');
    setInput((prevInput) => ({
      ...prevInput,
      date: formattedDate ,
    }));
  };

  useEffect(() => { validate() }, [input])
  useEffect(() => {
    if (opened === false) setInput({})
  }, [opened])

  return (
    <ModalGlobal
      opened={opened}
      title={"Dispute"}
      onClose={onCancel}
      classNames={{ content: "!overflow-y-visible" }}
    >
      <div className="flex flex-col gap-2">
        <DateInput
            label="Date"
            placeholder="Date"
            value={input?.date ? dayjs(input?.date, 'YYYY-MM-DD').toDate() : undefined}
            onChange={onChangeDate}
            className="w-auto whitespace-nowrap"
            valueFormat="D MMM YYYY"
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

export default ModalAddDispute;

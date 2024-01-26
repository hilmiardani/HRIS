import { ChangeEvent, useEffect, useState } from "react";
import { Model } from "shared/contracts/model";

export const useInput = <T>(initial: T) => {
  const [input, setInput] = useState(initial);
  const resetInput = () => {
    setInput(initial);
  };
  const handleInput =
    (name: keyof T, format = (val: any) => val) =>
      (val: any) =>
        setInput((prev) => ({
          ...prev,
          [name]: format(val?.target?.value ?? val),
        }));

  const handleChecked = (name: keyof T) => (val: any) =>
    setInput((prev) => ({
      ...prev,
      [name]: val.target.checked,
    }));
  return { input, handleInput, setInput, resetInput, handleChecked };
};

export const useArrayInput = <T>(initial: T[]) => {
  const [inputs, setInputs] = useState(initial);
  const resetInputs = () => {
    setInputs(initial);
  };
  const handleInputs =
    (index: number, name: keyof T, format = (val: any) => val) =>
      (val: any) =>
        setInputs((prev) =>
          prev.map((p, i) => {
            if (i == index) {
              return { ...p, [name]: format(val?.target?.value ?? val) };
            }
            return p;
          })
        );
  return { inputs, setInputs, handleInputs, resetInputs };
};

export const useCheckAll = (models: Model[]) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleCheck = (toggledId: string) => {
    if (checkedIds.includes(toggledId)) {
      setCheckedIds(checkedIds.filter((id) => toggledId != id));
    } else {
      setCheckedIds([...checkedIds, toggledId]);
    }
  };
  const toggleCheckAll = (e: ChangeEvent<any>) => {
    if (e.currentTarget.checked) {
      setCheckedIds(models.map((m) => m.id));
    } else {
      setCheckedIds([]);
    }
  };
  const isChecked = (modelId: string) => {
    return checkedIds.includes(modelId);
  };
  const isAllChecked = () => {
    return checkedIds.length == models.length && checkedIds.length > 0;
  };
  const isPartialChecked = () => {
    return checkedIds.length > 0 && checkedIds.length < models.length;
  };
  useEffect(() => {
    setCheckedIds([]);
  }, [models]);
  return {
    checkedIds,
    toggleCheck,
    toggleCheckAll,
    isChecked,
    isAllChecked,
    isPartialChecked,
  };
};

export const generateFormData = <T extends Record<string, any>>(payload: T) => {
  let fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === "object") {
          Object.keys(v).forEach((k: string) => {
            fd.append(key + `[][${k}]`, parseValue(v[k]));
          });
        } else {
          fd.append(key + "[]", parseValue(v));
        }
      });
    } else {
      fd.append(key, parseValue(value));
    }
  });
  return fd;
};

const parseValue = (value: any) => {
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return value;
};

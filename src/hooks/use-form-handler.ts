import { ChangeEvent, useState } from "react";

type TUseForm<TForm> = {
  form: TForm;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

export function useForm<TForm>(initialValues: TForm): TUseForm<TForm> {
  const [form, setForm] = useState<TForm>(initialValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const reset = (): void => {
    setForm(initialValues);
  };

  return { form, onChange, reset };
}

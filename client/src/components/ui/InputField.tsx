type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  name: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  name,
  type = "text",
  onChange,
  disabled,
  placeholder,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
    />
  </div>
);
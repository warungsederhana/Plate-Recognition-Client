"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import React from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, label, error }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
      {" "}
      {/* This div acts as a container for the input and the error message */}
      <div className="relative">
        {" "}
        {/* Relative positioning context for the icon */}
        <Input
          crossOrigin={undefined}
          type={showPassword ? "text" : "password"}
          label={label}
          value={value}
          onChange={onChange}
          size="lg"
          placeholder="********"
          className="pr-10" // Padding to ensure space for the icon
        />
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {showPassword ? (
            <EyeSlashIcon onClick={togglePasswordVisibility} className="cursor-pointer h-5 w-5" />
          ) : (
            <EyeIcon onClick={togglePasswordVisibility} className="cursor-pointer h-5 w-5" />
          )}
        </span>
      </div>
      {error && <p className="text-overline text-danger-500 px-2 mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;

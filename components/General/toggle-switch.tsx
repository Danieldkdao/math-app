import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

type ToggleSwitchPropsType = {
  register?: UseFormRegister<any>
  name?: string;
  state?: boolean;
  setState?: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const ToggleSwitch = ({register, name, state, setState, id}: ToggleSwitchPropsType) => {
  if(register && name){
    return (
      <input
        {...register(name)}
        type="checkbox"
        id={id}
        className="appearance-none w-15 h-8 bg-gray-200 rounded-full relative transition-colors duration-300 cursor-pointer after:content-[''] after:size-5 after:rounded-full after:bg-white after:absolute after:top-1/2 after:left-1/4 after:-translate-1/2 after:transition-all after:duration-300 checked:bg-cyan-800 checked:after:left-[70%]"
      />
    );
  }
  return (
    <input
      type="checkbox"
      checked={state}
      onChange={() => setState?.(!state)}
      id={id}
      className="appearance-none w-15 h-8 bg-gray-200 rounded-full relative transition-colors duration-300 cursor-pointer after:content-[''] after:size-5 after:rounded-full after:bg-white after:absolute after:top-1/2 after:left-1/4 after:-translate-1/2 after:transition-all after:duration-300 checked:bg-cyan-800 checked:after:left-[70%]"
    />
  );
}

export default ToggleSwitch
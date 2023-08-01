import { TitleProps } from "./Title.types";

export const Title = ({ text }: TitleProps) => {
  return <h2 className="text-gray-500">{text}</h2>;
};

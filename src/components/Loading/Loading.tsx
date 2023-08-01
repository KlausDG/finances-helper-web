import { RingLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
      <RingLoader color={"#123abc"} size={100} />
    </div>
  );
};

import img1 from "../assets/img1.png";
export const Appbar = () => {
  return (
    <div className="shadow h-16 flex justify-between">
      <div className="flex text-2xl  font-bold justify-center ml-4">
        <img className="h-10 mt-3" src={img1} alt="" />
        <div className="mt-[1.3rem] ml-[-0.3rem]">ayStream</div>
      </div>
      <div className="flex">
        <div className="flex flex-col mt-1 font-medium text-lg justify-center h-full mr-4">
          Hello User ,
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
};

export default function ViewBox() {
  return (
    <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
          <i className="bi bi-search text-3xl text-[#0068FF]"></i>
        </div>
        <p className="text-xl font-bold">View Box</p>
      </div>
    </div>
  );
}

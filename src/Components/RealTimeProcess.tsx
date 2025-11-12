export default function RealTimeProcess() {
  return (
    <div className="w-full text-center">
      <span className="flex gap-2 justify-center items-center">
        <h1 className="text-[#0068FF] text-2xl font-bold">Real Time process</h1>{" "}
        <p className="text-[#868E96]">(Experimental)</p>
      </span>
      <div className="bg-[#F8F9FA] rounded-2xl p-2 flex flex-col gap-2">
        <p>
          <b>Code:</b> 178294
        </p>
        <p>
          <b>Failure:</b> Hi-Low Drill
        </p>
        <p>
          {" "}
          <b>Time stopped:</b> 25s
        </p>
        <p>
          {" "}
          <b>Status:</b> Running
        </p>
      </div>
    </div>
  );
}

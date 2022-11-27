import Image from 'next/image';

function Row({
  image,
  name,
  score,
  win,
}: {
  image: string;
  name: string;
  score: string;
  win?: boolean;
}) {
  return (
    <div className="px-4 py-2 flex justify-between border-b border-gray-200">
      <div className="flex">
        <Image
          src={image}
          alt={name}
          width={20}
          height={20}
          className="h-6 w-6"
        />
        <p className="font-semibold ml-2">{name}</p>
      </div>
      <div className="flex text-right">
        <p className="text-gray-700">{score}</p>
        {win ? (
          <p className="text-green-700 font-semibold ml-2 w-3">W</p>
        ) : (
          <p className="text-red-700 font-semibold ml-2 w-3">L</p>
        )}
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <div className="">
      <h2 className="font-semibold text-2xl mx-2 my-2">Schedule</h2>
      <h3 className="font-semibold text-lg mx-2 mt-2">Next</h3>
      <Row
        image="https://a.espncdn.com/i/teamlogos/ncaa/500/66.png"
        name="IUPUI"
        score="89-39"
        win
      />
      <h3 className="font-semibold text-lg mx-2 mt-2">Full</h3>
      <div>
        <Row
          image="https://a.espncdn.com/i/teamlogos/ncaa/500/66.png"
          name="IUPUI"
          score="89-39"
          win
        />
        <Row
          image="https://a.espncdn.com/i/teamlogos/ncaa/500/66.png"
          name="IUPUI"
          score="89-39"
          win
        />
        <Row
          image="https://a.espncdn.com/i/teamlogos/ncaa/500/66.png"
          name="Iowa State Cyclones"
          score="89-39"
        />
        <Row
          image="https://a.espncdn.com/i/teamlogos/ncaa/500/66.png"
          name="IUPUI"
          score="102-22"
        />
      </div>
    </div>
  );
}

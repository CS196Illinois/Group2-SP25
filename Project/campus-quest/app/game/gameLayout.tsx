import SimpleMap from "./simpleMap";

const GamePage = ({upgrades} : {upgrades: {
    name: string;
    level: string;
  }[]}) => {



    return <div className="w-screen h-screen bg-[#061119]">
        <SimpleMap upgrades={upgrades}/>
    </div>
}

export default GamePage
import SimpleMap from "./simpleMap";

const GamePage = ({upgrades, coins, resources} : {upgrades: Map<string, number>, coins:number, resources:number}) => {
    return <div className="w-screen h-screen bg-[#061119]">
        <SimpleMap upgradesData={upgrades} coinsData = {coins} resourcesData={resources}/>
    </div>
}

export default GamePage
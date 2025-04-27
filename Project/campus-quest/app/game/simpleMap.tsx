"use client"
import React, { useRef, useState } from "react";
import L, { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Polygon, Popup, Rectangle, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Building } from "lucide-react";
import { BuyBuilding, SetCoins, SetResources } from "./mapMaster";

const SimpleMap = ({upgradesData, coinsData, resourcesData} : {upgradesData: Map<string,number>, coinsData:number, resourcesData:number}) => {
  const mapRef = useRef(null);
  const latitude = 40.10764371678033;
  const longitude = -88.22717929582448;
  const [upgrades, setUpgrades] = useState(upgradesData)
  const [resources, setResources] = useState(resourcesData)
  const [coins, setCoins] = useState(coinsData)
  const [buildingData, setData] = useState("")

  function playRound(rounds: number) {
    var sum = 0
    for (var building of Object.entries(Buildings).filter(x => upgrades.has(x[0]))) {
      sum += building[1].resourceFunc(upgrades.get(building[0]))
    }
    setResources(resources + sum)
    SetResources(resources + sum)
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setData(buildingData +`[${e.latlng.lat}, ${e.latlng.lng}],\n`);
      },
    });
    return false;
  }

  function purchaseBuilding(name: string, level: number) {
    upgrades.set(name, level + 1)
    BuyBuilding(name, level + 1)
  }

  
const PopupInfo = ({name, buildingInfo} : {name: string, buildingInfo: any}) => {
  const level = upgrades.get(name) ? upgrades.get(name) : 0
  const upgradeCost = buildingInfo.upgradeFunc(level)
  return (<div className="text-center">
    <p className="text-[20px]">{name + " | Lvl: " + (level) }</p>
    <p>{"Resource generation: " + buildingInfo.resourceFunc(level)}</p>
    <p className={(resources >= upgradeCost ? "text-white hover:bg-[#fe532d]": "text-red-500") + " select-none bg-[#1C2A35] rounded-[3px] py-2 active:bg-[#1C2A35]"}
      onClick = {()=> {if(resources >= upgradeCost) {
        purchaseBuilding(name, level!)
        setResources(resources - upgradeCost)
        SetResources(resources - upgradeCost)
    }}}>
      {"Upgrade: " + upgradeCost}
    </p>
  </div>)
}

  return (
    <div className="bg-[#061119]"> 
      <MapContainer center={[latitude, longitude]} minZoom={16} zoom={18} ref={mapRef} style={{height: "100vh", width: "100vw"}}
        maxBounds={new L.LatLngBounds(L.latLng(40.112568, -88.243503), L.latLng(40.091010, -88.214226))}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
        />
        <MapEvents/>
        {Object.entries(Buildings).map((place) => 
          <Polygon key={place[0]} fillOpacity={0.5} pathOptions={upgrades.get(place[0]) ? LevelColors[Math.min(upgrades.get(place[0])!, 6)] : LevelColors[0]}
            positions = {place[1].bounds as LatLngExpression[]}>
            <Popup>
              <PopupInfo name={place[0]} buildingInfo={place[1]}/>
            </Popup>
          </Polygon>
        )}
      </MapContainer>
      <div className="absolute z-1000 flex top-5 text-white left-20">
        <p onClick={()=> {
            console.log(`[${buildingData}]`)
            setData("")
        }} className="p-3 rounded-[5px] border-[#fe532d] border-5 select-none bg-[#1C2A35]">
          Resources: {resources}
        </p>
        <p className= {(coins < 10 ? "" : "hover:bg-[#fe532d]") + " translate-x-5 p-3 rounded-[5px] border-[#fe532d] border-5 select-none bg-[#1C2A35]"}
          onClick={() => {
            if (coins > 10) {
            playRound(1)
            setCoins(coins - 10)
            SetCoins(coins - 10)
          }}}
        >
          Play Round: <span className={coins < 10 ? "text-red-500" : ""}>{coins}</span>/10
        </p>
      </div>
    </div>
  );
};

const LevelColors = [
  {color: 'gray'},
  {color: 'blue'},
  {color: 'lime'},
  {color: 'yellow'},
  {color: 'red'},
  {color: 'pink'},
  {color: 'orange'}
]

const Buildings : {[k: string]: any} = {
  "The Quad" : {
    bounds: [[40.10874709823574, -88.22757527466892],
    [40.108767609503545, -88.2268297371068],
    [40.10627339398749, -88.22681900994762],
    [40.10624057475268, -88.22752700245267]],
    upgradeFunc: (level:number) => {return Math.round(500 * 1.2 ** level)},
    resourceFunc: (level:number) => {return Math.round(level == 0 ? 0 : 100 * level)}
  },
  "Illini Union" : {
    bounds: [[40.10987108123136, -88.2277791754012],
    [40.10990389871458, -88.22748417852412],
    [40.10981365059767, -88.22747881494452],
    [40.10983826373233, -88.22691027550864],
    [40.109924409633514, -88.22689954834946],
    [40.10991210308288, -88.22667964158656],
    [40.109575723170046, -88.22665282368862],
    [40.1095716209657, -88.22688882119031],
    [40.10891116284269, -88.22689418476988],
    [40.108902958353625, -88.22774163034411],
    [40.10927215938161, -88.22775772108287],
    [40.109280363826144, -88.22751099642203],
    [40.109485474617685, -88.22752172358118],
    [40.109501883454314, -88.22773090318498]],
    upgradeFunc: (level:number) => {return 0},
    resourceFunc: (level:number) => {return 0}
  },
  "Natural History Building" : {
    bounds: [[40.109837844684556, -88.2263141947278],
    [40.10989937748261, -88.22618544870667],
    [40.10989937748261, -88.22572410879751],
    [40.10964093935662, -88.22574020205015],
    [40.10963683715625, -88.22570265112732],
    [40.1093866024644, -88.22571337996241],
    [40.10939070467986, -88.22574020205015],
    [40.10913226462111, -88.22574020205015],
    [40.10907073112905, -88.22577775297299],
    [40.10909124229928, -88.22625518613478]],
    upgradeFunc: (level:number) => {return 0},
    resourceFunc: (level:number) => {return 0}
  },
  "Noyes Labratory" : {
    bounds: [[40.10877525373273, -88.2264214831101],
    [40.10878756048906, -88.2256919223235],
    [40.10857424306423, -88.22571874441128],
    [40.10856603853453, -88.22565973581824],
    [40.108377334078305, -88.22568655790596],
    [40.10826657252324, -88.2257241088288],
    [40.108213242821286, -88.22566510023579],
    [40.1081599130775, -88.22566510023579],
    [40.10808196953064, -88.22575629533408],
    [40.10809427641238, -88.22646439845047],
    [40.10823375425005, -88.22648585612065],
    [40.10826657252324, -88.2264000254399],
    [40.10863167474443, -88.22640538985743],
    [40.108639879266185, -88.22644830519783]],
    upgradeFunc: (level:number) => {return 0},
    resourceFunc: (level:number) => {return 0}
  },
  "Davenport Hall" : {
    bounds: [[40.10786033806343, -88.2264536696356],
    [40.10789315651677, -88.22640538987767],
    [40.10789315651677, -88.22568119350865],
    [40.10775367798072, -88.22567046467356],
    [40.10761830148106, -88.22572410884904],
    [40.10761830148106, -88.22597087205625],
    [40.1074336967291, -88.22596014322116],
    [40.10742959439558, -88.22590113462815],
    [40.10738446871064, -88.22589577021057],
    [40.10738036637417, -88.22580457511226],
    [40.10704397394092, -88.22582603278245],
    [40.107015257436615, -88.22597087205625],
    [40.106674760818784, -88.22597623647378],
    [40.106666556059984, -88.22616935550556],
    [40.10694141494134, -88.22618544875819],
    [40.106949619667006, -88.22626055060385],
    [40.106851162893804, -88.22628200827405],
    [40.10685526526221, -88.22656095798655],
    [40.10711781632485, -88.22655022915147],
    [40.10711781632485, -88.22656095798655],
    [40.10724498913156, -88.22657168682166],
    [40.107404980389326, -88.22652877148127],
    [40.10754035731355, -88.22655022915147],
    [40.107548561966965, -88.2262551861863],
    [40.107421389727826, -88.2262551861863],
    [40.10742959439558, -88.22619081317575],
    [40.107708552510765, -88.22618544875819],
    [40.107712654827445, -88.2264536696356]],
    upgradeFunc: (level:number) => {return 0},
    resourceFunc: (level:number) => {return 0}
  },
  "Deparment of Linguistics" : {
    bounds: [[40.106474243136105, -88.22653413592337],
    [40.106478345527236, -88.22570801562094],
    [40.10614605104447, -88.22569728678585],
    [40.106137846221884, -88.2265126782532]],
    upgradeFunc: (level:number) => {return 0},
    resourceFunc: (level:number) => {return 0}
  },
  "Foellinger Auditorium" : {
    bounds: [[40.106191127977304, -88.22741926484966],
    [40.10619523038553, -88.22688818751239],
    [40.10608856769191, -88.22688818751239],
    [40.1060844652773, -88.22695792494052],
    [40.106043441117365, -88.22693646727032],
    [40.10592036848914, -88.22692573843521],
    [40.10587113937553, -88.22696328935805],
    [40.10569473475912, -88.22698474702824],
    [40.10569063232074, -88.22734952742154],
    [40.10587113937553, -88.22733343416888],
    [40.105949085455634, -88.22737098509174],
    [40.10603523628241, -88.22735489183907],
    [40.10608036286241, -88.22731734091624],
    [40.106100874934306, -88.22731734091624],
    [40.10609267010632, -88.22738171392682]],
    upgradeFunc: (level:number) => {return 0},
    resourceFunc: (level:number) => {return 0}
  },
  // "" : {
  //   bounds: ,
  //   upgradeFunc: (level:number) => {return 0},
  //   resourceFunc: (level:number) => {return 0}
  // },
}


export default SimpleMap;
import supabase from "../../lib/supabaseClient"
import GamePage from "./gameLayout"

const uid = 1
const Buildings = async () => {
    const data = await Promise.all([
        await supabase.from("buildings").select("name, level").eq("user_id", 1),
        await supabase.from("users").select("id, Coins, resources").eq("id", uid)
    ])

    const toMap = new Map<string, number>()
    Object.entries(JSON.parse(JSON.stringify(data[0].data || []))).map((place) => {
        const parse2 = JSON.parse(JSON.stringify(place[1]))
        toMap.set(parse2.name, parse2.level)
    })
    const user = data[1].data?.filter(x => x.id == uid)[0]

    return <GamePage upgrades = {toMap} coins = {user?.Coins} resources={user?.resources}/>
}

export async function BuyBuilding (buildingName: string, lvl: number) {
    if (lvl == 1) {
        await supabase.from("buildings").insert({"user_id": uid, "name": buildingName, "level": lvl}) 
    } else {
        await supabase.from("buildings").update({"level": lvl}).eq("id", uid).eq("name", buildingName)
    }
}

export async function SetCoins (coins: number) {
    await supabase.from("users").update({"Coins":coins}).eq("id", uid)
}

export async function SetResources (resources: number) {
    await supabase.from("users").update({"resources":resources}).eq("id", uid)
}

export default Buildings
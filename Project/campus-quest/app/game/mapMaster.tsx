import supabase from "../supabaseClient"
import GamePage from "./gameLayout"

const Buildings = async () => {
    const { data, error } = await supabase
                                    .from("buildings")
                                    .select("name, level")
                                    .eq("user_id", 1)
    
    return <GamePage upgrades = {JSON.parse(JSON.stringify(data))}/>
}

export default Buildings
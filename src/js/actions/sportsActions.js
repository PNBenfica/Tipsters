import axios from "axios";

export function fetchTables(sport, league = "") {    
    if (league !== "")
        league = league + "/";

    return {
        type: "FETCH_TABLES", 
        payload: axios.get("http://web.ist.utl.pt/~ist175449/Tipsters/resources/sports/" + sport + "/" + league)
    }
}
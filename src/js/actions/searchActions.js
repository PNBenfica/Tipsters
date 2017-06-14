import { callAPI } from '../scripts/gapi'

export function fetchSuggestions() {

    return function(dispatch) {

        callAPI({
            type: "FETCH_SEARCH_SUGGESTIONS",
            path: "search/suggestions",
            dispatch,
            default: fetchSuggestions_default()
        })

    }
}


function fetchSuggestions_default(){
    return {
        suggestions:
        [
            { "name": "Aimar Bernardo", "type": "USER" },
            { "name": "Calado Diamantino", "type": "USER" },
            { "name": "Ederson Florentino", "type": "USER" },
            { "name": "Gamarra Hooijdonk", "type": "USER" },
            { "name": "Isaltino Jovic", "type": "USER" },
            { "name": "Kostas Lazar", "type": "USER" },
            { "name": "Mitroglou Nuno", "type": "USER" },
            { "name": "Otavio Preudhomme", "type": "USER" },
            { "name": "Renato Sanches", "type": "USER" },
            { "name": "Tamara Umbigo", "type": "USER" },
            { "name": "Xandao Zahovic", "type": "USER" },
            { "leagueId": "21116", "leagueName": "Czech CFL", "matchId": "1217471", "matchName": "FK Litomerice - Prevysov", "sportId": "1", "sportName": "Football", "type": "EVENT"},
            { "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1181289", "matchName": "Hull - Arsenal", "sportId": "1", "sportName": "Football", "type": "EVENT"},
            { "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1181299", "matchName": "Tottenham - Liverpool", "sportId": "1", "sportName": "Football", "type": "EVENT"},
            { "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1217752", "matchName": "Leicester - Burnley", "sportId": "1", "sportName": "Football", "type": "EVENT"},
            { "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1222579", "matchName": "Swansea - Manchester City", "sportId": "1", "sportName": "Football", "type": "EVENT"},
            { "leagueId": "10", "leagueName": "Davis Cup", "matchId": "1239585", "matchName": "Evgeny Donskoy - Mikhail Kukushkin", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "10", "leagueName": "Davis Cup", "matchId": "1240163", "matchName": "Vasek Pospisil - Nicolas Jarry", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "116", "leagueName": "French Open W.", "matchId": "1219945", "matchName": "Roland Garros Women 2017", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "18061", "leagueName": "Quebec WTA Doubles", "matchId": "1240176", "matchName": "Hlavackova A / Hradecka L - Cepede Royg V / Kostova E", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "18061", "leagueName": "Quebec WTA Doubles", "matchId": "1240177", "matchName": "Kudryavtseva A / Panova A - Irigoyen M / Krejcikova B", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "18564", "leagueName": "Tokyo WTA Doubles", "matchId": "1241234", "matchName": "Aoyama S / Ninomiya M - RAE J / Smith A", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "20416", "leagueName": "Cary Challenger", "matchId": "1239519", "matchName": "Tennys Sandgren - Francis Tiafoe", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "20416", "leagueName": "Cary Challenger", "matchId": "1240170", "matchName": "Ernesto Escobedo - Stefan Kozlov", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "20417", "leagueName": "Cary Challenger Doubles", "matchId": "1239516", "matchName": "Meister N / Quigley E - Bester P / Polansky P", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "20417", "leagueName": "Cary Challenger Doubles", "matchId": "1241043", "matchName": "Bambridge L / Mclachlan B - Kozlov S / Krajicek A", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "22", "leagueName": "Australian Open M.", "matchId": "1216724", "matchName": "Australian Open Men 2017", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "2205", "leagueName": "Quebec WTA", "matchId": "1241041", "matchName": "Alla Kudryavtseva - Lauren  Davis", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "2205", "leagueName": "Quebec WTA", "matchId": "1241042", "matchName": "Tereza Martincova - Jessica Pegula", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "239", "leagueName": "New Haven WTA", "matchId": "1221474", "matchName": "Johanna Larsson - Shelby Rogers", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "24", "leagueName": "Wimbledon M.", "matchId": "1219965", "matchName": "Wimbledon Men 2017", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "46", "leagueName": "Australian Open W.", "matchId": "1216725", "matchName": "Australian Open Women 2017", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "51", "leagueName": "Wimbledon W.", "matchId": "1219966", "matchName": "Wimbledon Women 2017", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "59", "leagueName": "French Open M.", "matchId": "1219944", "matchName": "Roland Garros Men 2017", "sportId": "2", "sportName": "Tennis", "type": "EVENT"},
            { "leagueId": "20381", "leagueName": "Int. Friendly", "matchId": "1221980", "matchName": "Sweden - Georgia", "sportId": "4", "sportName": "Basketball", "type": "EVENT"}
        ]
    }
}


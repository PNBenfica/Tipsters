from models import SearchSuggestionMessage, User, MatchModel, SportModel, EventModel

def fetch_suggestions():
    users = _fetch_users_suggestions()
    events = _fetch_events_suggestions()
    return users + events

def _fetch_users_suggestions():
    usernames = _fetch_all_usernames()
    user_suggestions = map(_to_user_suggestion_message, usernames)
    return user_suggestions

def _fetch_all_usernames():
    users = User.query().fetch()
    return map(lambda user : user.key.id(), users)

def _to_user_suggestion_message(username):
    return SearchSuggestionMessage(name=username, type="USER")


def _fetch_events_suggestions():
    events = _fetch_all_events()
    events_suggestions = map(_to_event_suggestion_message, events)
    return events_suggestions

def _fetch_all_events():
    data = []
    sports = SportModel.query().fetch()
    for sport in sports:
        events = EventModel.query(ancestor=sport.key)
        for event in events:
            matches = MatchModel.query(ancestor=event.key)
            for match in matches:
                data.append({'matchName' : match.name, 'matchId' : match.id,\
                             'eventName' : event.name, 'eventId' : event.id,\
                             'sportName' : sport.name, 'sportId' : sport.id})
    return data

def _to_event_suggestion_message(event):
    return SearchSuggestionMessage( type="EVENT",\
                         matchName = event["matchName"], matchId = event["matchId"],\
                         leagueName = event["eventName"], leagueId = event["eventId"],\
                         sportName = event["sportName"], sportId = event["sportId"])
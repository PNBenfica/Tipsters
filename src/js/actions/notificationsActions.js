import { callAPI } from '../scripts/gapi'

export function fetchNotifications() {

    return function(dispatch) {

        callAPI({
            type: "FETCH_NOTIFICATIONS",
            path: "notifications",
            auth: true,
            dispatch,
            default: fetchNotifications_default()
        })

    }
}

function fetchNotifications_default(){
    return {
        notifications:
        [
            {"content":"liked your post","date":"2017-04-16 21:53:05","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhkDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFwM","seen":false,"tipster":{"avatar":"img/user5.jpg","name":"Ederson Florentino"},"type":"LIKE"},
            {"content":"liked your post","date":"2017-04-16 21:53:04","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhhDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFwM","seen":false,"tipster":{"avatar":"img/user5.jpg","name":"Gamarra Hooijdonk"},"type":"LIKE"},
            {"content":"liked your post","date":"2017-04-16 21:53:04","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhiDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFwM","seen":false,"tipster":{"avatar":"img/user2.jpg","name":"Calado Diamantino"},"type":"LIKE"},
            {"content":"liked your post","date":"2017-04-16 21:53:02","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhdDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFEM","seen":false,"tipster":{"avatar":"img/user5.jpg","name":"Ederson Florentino"},"type":"LIKE"},
            {"content":"liked your post","date":"2017-04-16 21:53:02","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBheDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFEM","seen":false,"tipster":{"avatar":"img/user8.jpg","name":"Tamara Umbigo"},"type":"LIKE"},
            {"content":"commented your post","date":"2017-04-16 21:53:00","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhZDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFEM","seen":false,"tipster":{"avatar":"img/user2.jpg","name":"Xandao Zahovic"},"type":"COMMENT"},
            {"content":"commented your post","date":"2017-04-16 21:53:00","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhaDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GFEM","seen":false,"tipster":{"avatar":"img/pauloteixeira.jpg","name":"Mitroglou Nuno"},"type":"COMMENT"},
            {"content":"liked your post","date":"2017-04-16 21:52:58","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhQDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GEYM","seen":true,"tipster":{"avatar":"img/user6.jpg","name":"Isaltino Jovic"},"type":"LIKE"},
            {"content":"liked your post","date":"2017-04-16 21:52:58","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhSDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GEYM","seen":true,"tipster":{"avatar":"img/user2.jpg","name":"Aimar Bernardo"},"type":"LIKE"},
            {"content":"commented your post","date":"2017-04-16 21:52:57","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhNDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GEYM","seen":true,"tipster":{"avatar":"img/user8.jpg","name":"Tamara Umbigo"},"type":"COMMENT"},
            {"content":"commented your post","date":"2017-04-16 21:52:57","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhODA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GEYM","seen":false,"tipster":{"avatar":"img/user2.jpg","name":"Aimar Bernardo"},"type":"COMMENT"},
            {"content":"liked your post","date":"2017-04-16 21:52:57","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhPDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GEYM","seen":false,"tipster":{"avatar":"img/user5.jpg","name":"Ederson Florentino"},"type":"LIKE"},
            {"content":"commented your post","date":"2017-04-16 21:52:56","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhLDA","new":true,"post_id":"ahBkZXZ-dGlwc3RlcnMtMzY1ciILEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEgRQb3N0GEYM","seen":false,"tipster":{"avatar":"img/user2.jpg","name":"Calado Diamantino"},"type":"COMMENT"},
            {"content":"started following you","date":"2017-04-16 21:52:51","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBhBDA","new":true,"seen":false,"tipster":{"avatar":"img/user2.jpg","name":"Xandao Zahovic"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:49","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBg9DA","new":true,"seen":false,"tipster":{"avatar":"img/user8.jpg","name":"Tamara Umbigo"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:44","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBg0DA","new":true,"seen":false,"tipster":{"avatar":"img/user1.jpg","name":"Renato Sanches"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:40","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBgtDA","new":true,"seen":false,"tipster":{"avatar":"img/user6.jpg","name":"Otavio Preudhomme"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:37","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBgnDA","new":true,"seen":false,"tipster":{"avatar":"img/pauloteixeira.jpg","name":"Mitroglou Nuno"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:32","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBgaDA","new":true,"seen":false,"tipster":{"avatar":"img/user6.jpg","name":"Isaltino Jovic"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:31","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBgVDA","new":true,"seen":false,"tipster":{"avatar":"img/user5.jpg","name":"Gamarra Hooijdonk"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:29","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBgPDA","new":true,"seen":false,"tipster":{"avatar":"img/user5.jpg","name":"Ederson Florentino"},"type":"FOLLOW"},
            {"content":"started following you","date":"2017-04-16 21:52:26","id":"ahBkZXZ-dGlwc3RlcnMtMzY1ci8LEgRVc2VyIg5BaW1hciBCZXJuYXJkbwwLEhFOb3RpZmljYXRpb25Nb2RlbBgHDA","new":false,"seen":true,"tipster":{"avatar":"img/user2.jpg","name":"Calado Diamantino"},"type":"FOLLOW"}]
    }
}

export function setNotificationsNotNew() {

    return function(dispatch) {

        callAPI({
            type: "SET_NOTIFICATIONS_NOT_NEW",
            path: "notifications/notnew",
            method: "POST",
            auth: true,
            dispatch
        })

    }

}

export function markAsSeen(notification_key) {

    return function(dispatch) {

        callAPI({
            type: "MARK_AS_SEEN",
            path: "notifications/mark_as_seen",
            method: "POST",
            params: { notification_key },
            auth: true,
            dispatch, 
            action: { notification_key }
        })

    }

}



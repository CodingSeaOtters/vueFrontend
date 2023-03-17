import {createStore} from "vuex";

export default createStore({
    state: {
        username: "",
        loggedIn: false,
        JWT: "",
        boardIds: [],

    },
    mutations: {
        changeLoggedIn : state => !state.loggedIn,
    },
    actions: {
        addBoardIds(context, payload){
            context.commit('UPDATE_BOARDIDS', payload)
        }
    },
    getters: {
        getUsername : state => state.username,
        isLogged: state => state.loggedIn,
        getJWT: state => state.JWT,
    }
})
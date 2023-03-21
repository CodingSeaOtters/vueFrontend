import {createStore} from "vuex";
import axios from "axios";
import {connectionBase} from "@/ConnectionBase";
import router from "@/router";

const store = createStore({
    namespaced: true,
    state: {
        username: "",
        userId: 0,
        loggedIn: false,
        JWT: "",
        currentBoardId: 0,
        boards: [],
        notesOfBoard: [],
    },
    mutations: {
        changeLoggedIn: state => state.loggedIn = !state.loggedIn,
        setJwt: (state, payload) => state.JWT = payload,
        setUsername: (state, payload) => state.username = payload,
        setBoards: (state, payload) => state.boards = payload,
        setUserId: (state, payload) => state.userId = payload,
        setNotesOfBoard: (state, payload) => state.notesOfBoard = payload,
        setCurrentBoardId: (state, payload) => state.currentBoardId = payload,
    },
    actions: {
        logIn(context, body) {
            axios.post(connectionBase + '/auth/login', body)
                .then(response => {
                    if (response.status === 202) {
                        context.commit("setJwt", response.data);
                        context.commit("setUsername", body.username);
                        context.dispatch("getUserData", body.username)
                            .then(() => {
                                context.commit("changeLoggedIn");
                                router.push("/boards")
                            });
                    }
                });
        },
        getUserData(context, username) {
            return new Promise((resolve, reject) => {
                axios.get(connectionBase + "/user/find/" + username, {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.JWT
                    }
                }).then(response => {
                    if (response.status === 200) {
                        context.commit("setUserId", response.data.id);
                        context.dispatch("getUserBoards", response.data.id)
                            .then(() => resolve());
                    }
                }).catch(error => reject(error))
            })
        },
        getUserBoards(context, userId) {
            return new Promise((resolve, reject) => {
                axios.get(connectionBase + "/board/all/" + userId, {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.JWT
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            context.commit("setBoards", response.data);
                            resolve();
                        }
                    })
                    .catch(error => reject(error));
            })
        },
        changeLoggedIn(context) {
            context.commit("changeLoggedIn");
        },
        showBoard(context, boardId) {
            context.dispatch("getAllNotes", boardId)
                .then(() => {
                    context.commit("setCurrentBoardId", boardId)
                    router.push("/notes")
                })
        },
        getAllNotes(context, boardId) {
            return new Promise((resolve, reject) => {
                axios.get(connectionBase + "/note/all/" + boardId, {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.JWT
                    }
                }).then(response => {
                    if (response.status === 200) {
                        const notes = response.data.map(async (note) => {
                            const isExpired = await context.dispatch("isExpired", note);
                            return { ...note, isExpired };
                        });

                        Promise.all(notes).then((updatedNotes) => {
                            context.commit("setNotesOfBoard", updatedNotes);
                        });
                        resolve();
                    }
                }).catch(error => reject(error))
            })
        },
        isExpired(context, note) {
            const now = new Date;
            const endDate = new Date(note.endDate);
            return endDate < now;
        },
        createBoard(context, body) {
            axios.post(connectionBase + '/board/' + context.state.userId, body, {
                headers: {
                    'Authorization': 'Bearer ' + context.state.JWT,
                }
            })
                .then(() => context.dispatch("getUserBoards", context.state.userId))
                .catch(error => console.log(error))
        },
        modifyBoard(context, exchangeObject) {
            axios.put(connectionBase + "/board/" + exchangeObject.boardId, exchangeObject.body, {
                headers: {
                    'Authorization': 'Bearer ' + context.state.JWT,
                }
            }).then(() => {
                context.dispatch("getUserBoards", context.state.userId)
                    .catch(error => console.log(error))
            })
        },
        deleteBoard(context, boardId) {
            axios.delete(connectionBase + "/board/" + boardId, {
                headers: {
                    'Authorization': 'Bearer ' + context.state.JWT,
                }
            })
                .then(() => context.dispatch("getUserBoards", context.state.userId))
                .catch(error => console.log(error))
        },
        createNote(context, body) {
            axios.post(connectionBase + "/note/" + context.state.currentBoardId, body, {
                headers: {
                    'Authorization': 'Bearer ' + context.state.JWT
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        context.dispatch("getAllNotes", context.state.currentBoardId)
                            .catch(error => console.log(error));
                    }
                })
        },
        modifyNote(context, exchangeObject) {
            axios.put(connectionBase + "/note/" + exchangeObject.id, exchangeObject.body, {
                headers: {
                    'Authorization': 'Bearer ' + context.state.JWT,
                }
            }).then(() => context.dispatch("getAllNotes", context.state.currentBoardId))
                .catch(error => console.log(error))


        },
        deleteNote(context, noteId) {
            axios.delete(connectionBase + "/note/" + noteId, {
                headers: {
                    'Authorization': 'Bearer ' + context.state.JWT,
                }
            })
                .then(() => context.dispatch("getAllNotes", context.state.currentBoardId))
                .catch(error => console.log(error))
        },
    },
    getters: {
        getUsername(state) {
            return state.username;
        },
        getBoards(state) {
            return state.boards;
        },
        getUserId(state) {
            return state.userId;
        },
        isLogged(state) {
            return state.loggedIn;
        },
        getJWT(state) {
            return state.JWT;
        },
        getOnlyExpired(state){
            return state.notesOfBoard.filter(note => note.isExpired === true)
        },
        getNotExpired(state){
            return state.notesOfBoard.filter(note => note.isExpired === false)
        }
    }
})

export default store;
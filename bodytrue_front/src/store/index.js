import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_email: '',
                user_no: '',
                user_auth:'',
            },
            trainer:{
                tr_email: '',
                tr_no: '',
                tr_admit: '',
            }
        }
    },
    mutations: {
        setUser(state, data){
            state.user = data;
        },
        setTrainer(state, data){
            state.trainer = data;
        },
        setUserEmail(state, email) {
            state.user.user_email = email;
        }
    },
    actions: {
        updateUserEmail({ commit }, email) {
            commit('setUserEmail', email);
        }
    },
    getters: {
        userEmail: state => state.user.user_email
    },

    plugins: [
        persistedstate({
            paths: ['user', 'trainer']
        })
    ]
});

export default store;

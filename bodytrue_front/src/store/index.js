import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_email: '',
                user_no: '',
            },
            trainer:{
                tr_email: '',
                tr_no: '',
            }
        }
    },
    mutations: {
        setUser(state, data){
            state.user = data;
        },
        setTrainer(state, data){
            state.trainer = data;
        }
    },

    plugins: [
        persistedstate({
            paths: ['user', 'trainer']
        })
    ]
});

export default store;

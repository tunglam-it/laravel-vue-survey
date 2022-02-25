import {createStore} from "vuex";
import axiosClient from '../axios'

const tmpSurveys = [
    {
        id: 1,
        title: 'First Vue Project',
        slug: 'first-vue-project',
        status: 'draft',
        image: 'https://picsum.photos/400',
        description: "TuqLa is my name.<br>I am newbie dev and starting to learn code since 2 month.",
        created_at: "2022-02-15 18:00:00",
        updated_at: "2022-02-15 18:00:00",
        expire_date: "2022-02-18 18:00:00",
        question: [
            {
                id: 1,
                type: 'select',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        {uuid: "", text: ""},
                        {uuid: "", text: ""},
                        {uuid: "", text: ""},
                    ]
                }
            },
        ]
    },
    {
        id: 2,
        title: 'First Vue Project 2',
        slug: 'first-vue-project',
        status: 'draft',
        image: 'https://picsum.photos/400',
        description: "TuqLa is my name.<br>I am newbie dev and starting to learn code since 2 month.",
        created_at: "2022-02-15 18:00:00",
        updated_at: "2022-02-15 18:00:00",
        expire_date: "2022-02-18 18:00:00",
        question: [
            {
                id: 1,
                type: 'select',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        {uuid: "", text: ""},
                        {uuid: "", text: ""},
                        {uuid: "", text: ""},
                    ]
                }
            }
        ]
    },
    {
        id: 3,
        title: 'First Vue Project 3',
        slug: 'first-vue-project',
        status: 'draft',
        image: 'https://picsum.photos/400',
        description: "TuqLa is my name.<br>I am newbie dev and starting to learn code since 2 month.",
        created_at: "2022-02-15 18:00:00",
        updated_at: "2022-02-15 18:00:00",
        expire_date: "2022-02-18 18:00:00",
        question: [
            {
                id: 1,
                type: 'select',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        {uuid: "", text: ""},
                        {uuid: "", text: ""},
                        {uuid: "", text: ""},
                    ]
                }
            }
        ]
    },
]

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN")
        },
        currentSurvey: {
            loading: false,
            data: {},
        },
        surveys: [...tmpSurveys],
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
    },
    getters: {},
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        // saveSurvey: (state, survey) => {
        //     // ... return all value in array, combine two array
        //     state.surveys = [...state.surveys, survey.data];
        // },
        // updateSurvey: (state, survey) => {
        //     state.surveys = state.surveys.map((s) => {
        //         if (s.id == survey.data.id) {
        //             return survey.data;
        //         }
        //         return s;
        //     })
        // },

    },
    actions: {
        register({commit}, user) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        login({commit}, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        logout({commit}) {
            return axiosClient.post('/logout').then(response => {
                commit('logout');
                return response;
            })
        },
        getSurvey({commit}, id) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient
                .get(`/survey/${id}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                })
        },
        saveSurvey({commit}, survey) {
            delete survey.image_url;
            let response;
            if (survey.id) {
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data);
                        return res;
                    })
            } else {
                response = axiosClient.post("/survey", survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data)
                        return res;
                    })
            }
        }
    }
})

export default store;

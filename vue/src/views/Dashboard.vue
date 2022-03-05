<template>
    <PageComponent title="Dashboard">
        <div v-if="loading" class="flex justify-center">Loading......</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700" v-else>
            <div style="animation-delay: 0.1s" class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down">
                <h3 class="text-2x1 font-semibold">Total Surveys</h3>
                <div class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">{{ data.totalSurveys }}</div>
            </div>
            <div style="animation-delay: 0.2s" class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down">
                <h3 class="text-2x1 font-semibold">Total Answers</h3>
                <div class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">{{ data.totalAnswers }}</div>
            </div>
            <div class="bg-white shadow-md p-4 row-span-2 order-3 lg:order-1 animate-fade-in-down">
                <h3 class="text-2x1 font-semibold">Latest Survey</h3>
                <img :src="data.latestSurvey.image_url" alt="" class="w-[240px] mx-auto">
                <h3 class="text-x1 font-bold mb-3">{{ data.latestSurvey.title }}</h3>
                <div class="flex justify-between text-sm mb-1">
                    <div>Create Date: </div>
                    <div>{{data.latestSurvey.created_at}}</div>
                </div>
                <div class="flex justify-between text-sm mb-1">
                    <div>Expire Date: </div>
                    <div>{{data.latestSurvey.expire_date}}</div>
                </div>
                <div class="flex justify-between text-sm mb-1">
                    <div>Status: </div>
                    <div>{{data.latestSurvey.status?'Active':'Draft'}}</div>
                </div>
                <div class="flex justify-between text-sm mb-3">
                    <div>Questions:</div>
                    <div>{{data.latestSurvey.questions}}</div>
                </div>
                <div class="flex justify-between text-sm mb-3">
                    <div>Answers:</div>
                    <div>{{data.latestSurvey.answers}}</div>
                </div>
                <div class="flex justify-between">
                    <router-link class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                 :to="{name:'SurveyView',params:{id:data.latestSurvey.id}}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit Survey
                    </router-link>
                    <button class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                        </svg>
                        View Answers
                    </button>
                </div>
            </div>
            <div style="animation-delay: 0.3s" class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down">
                <div class="flex justify-between items-center mb-3 px-2">
                    <h3 class="text-2x1 font-semibold">Latest Answers</h3>
                    <a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration-blue-500">View all</a>
                </div>
                <a href="#" v-for="answer of data.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
                    <div class="font-semibold">{{answer.survey.title}}</div>
                    <small>Answer Made at: <i class="font-semibold">{{answer.end_date}}</i> </small>
                </a>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue'
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);
store.dispatch("getDashboardData");
</script>

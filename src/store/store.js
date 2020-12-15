import VUE from 'vue'
import Vuex from 'vuex'

VUE.use(Vuex)

export default new Vuex.Store({
    state: {
        isPractice: false, //练习模式标志
        isCollapse: false, //菜单栏左右滑动标志
        userInfo: null,
        menu: [
            {
                index: '1',
                title: '考试管理',
                meta: {
                    title: '考试管理',
                },
                icon: 'icon-kechengbiao',
                content: [
                    {
                        item: '功能介绍',
                        path: '/examDescription',
                        meta: {
                            title: '功能介绍',
                        }
                    },
                    {
                        item: '考试查询',
                        path: '/selectExam',
                        meta: {
                            title: '考试查询',
                        }
                    },
                    {
                        item: '添加考试',
                        path: '/addExam',
                        meta: {
                            title: '添加考试',
                        }
                    }
                ],
            },
            {
                index: '2',
                title: '题库管理',
                icon: 'icon-tiku',
                meta: {
                    title: '题库管理',
                },
                content: [
                    {
                        item: '功能介绍',
                        path: '/answerDescription',
                        meta: {
                            title: '功能介绍',
                        }
                    },
                    {
                        item: '所有题库',
                        path: '/selectAnswer',
                        meta: {
                            title: '所有题库',
                        }
                    },
                    {
                        item: '增加题库',
                        path: '/addAnswer',
                        meta: {
                            title: '增加题库',
                        }
                    },
                    {
                        path: '/addAnswerChildren'
                    }
                ],
            },
            {
                index: '3',
                title: '成绩查询',
                icon: 'icon-performance',
                meta: {
                    title: '成绩查询',
                },
                content: [
                    {
                        item: '学生成绩查询',
                        path: '/allStudentsGrade',
                        meta: {
                            title: '学生成绩查询',
                        }
                    },
                    {
                        path: '/grade'
                    },
                    {
                        item: '成绩分段查询',
                        path: '/selectExamToPart',
                        meta: {
                            title: '成绩分段查询',
                        }
                    },
                    {
                        path: '/scorePart'
                    }
                ],
            },
            {
                index: '4',
                title: '学生管理',
                icon: 'icon-role',
                meta: {
                    title: '学生管理',
                },
                content: [
                    {
                        item: '学生管理',
                        path: '/studentManage',
                        meta: {
                            title: '学生管理',
                        }
                    },
                    {
                        item: '添加学生',
                        path: '/addStudent',
                        meta: {
                            title: '添加学生',
                        }
                    }
                ],
            },
        ],
        adminMenu: [
            {
                index: '5',
                title: '教师管理',
                icon: 'icon-Userselect',
                content: [
                    {
                        item:'教师管理',
                        path:'/teacherManage'
                    },
                    {
                        item: '添加教师',
                        path: '/addTeacher'
                    }
                ],
            },
            {
                index: '6',
                title: '模块管理',
                icon: 'icon-module4mokuai',
                content: [
                    {
                        item:'模块操作',
                        path:'/module'
                    }
                ]
            }
        ]
    },
    mutations: {
        setBarCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        practice(state, status) {
            state.isPractice = status
        },
        changeUserInfo(state, info) {
            state.userInfo = info
        },
    },
    actions: {
        getUserInfo(context, info) {
            context.commit('changeUserInfo', info)
        },
        getPractice(context, status) {
            context.commit('practice', status)
        }
    },
    getters: {

    }
})

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001', // Substitua pelo URL base da sua API
})

// Adiciona o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('goals:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization // Remove o header Authorization se o token não estiver definido
  }
  return config
})

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    const token = response.data.access_token

    if (token) {
      localStorage.setItem('goals:token', token)
    }
    return response
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/users', { name, email, password })
    return response
  },
}

export const GoalService = {
  createGoal: (goal: {
    title: string
    description: string
    deadline: string
    thermalSensation: number
  }) => {
    const formattedGoal = {
      ...goal,
      deadline: new Date(goal.deadline).toISOString(), // Converte a deadline para ISO-8601
    }
    return api.post('/goals', formattedGoal)
  },

  getGoals: () => api.get('/goals'),

  getGoalById: (id: string) => api.get(`/goals/${id}`),

  updateGoal: (
    id: string,
    updates: { title?: string; description?: string; deadline?: string; thermalSensation?: number },
  ) => api.patch(`/goals/${id}`, updates),

  deleteGoal: (id: string) => api.delete(`/goals/${id}`),

  addThermalSensation: (record: {
    goalId: string
    thermalSensation: number
    date: string
  }) => {
    return api.post(`/goals/${record.goalId}/thermal-sensations`, record)
  },
}

export default api

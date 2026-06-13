import api from '../api/axios'

function validatePassword(password: string): void {
  if (password.length < 6) {
    throw new Error('password must have at least 6 characters');
  }

  if(!/[A-Z]/.test(password)) {
    throw new Error('password must have at least one uppercase letter');
  }

  if(!/[a-z]/.test(password)) {
    throw new Error('password must have at least one lowercase letter');
  }

  if(!/[0-9]/.test(password)) {
    throw new Error('password must have at least one number');
  }

}

export const authService = {

  async register(data: { username: string; password: string }) {
    validatePassword(data.password);
    return api.post('/auth/register', data);
  },

  async login(data: { username: string; password: string }) { 
    return api.post('/auth/login', data);
  },

  async changePassword(data: { username: string; newPassword: string ; oldPassword: string }) {
    validatePassword(data.newPassword);

    return api.post('/auth/changePassword',
      {
        username: data.username,
        password: data.oldPassword,
        newPassword: data.newPassword
      }
    );
  },

  async checkAuthStatus ():Promise<{isAuthenticated: boolean;username: string;}>{
    const response = await api.get('/auth/check');
    return {
      isAuthenticated: response.data.isAuthenticated,
      username: response.data.username,
    };
  },

  async logout() {
    return api.post('/auth/logout');
  },

}
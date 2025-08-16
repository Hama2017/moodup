class ApiService {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  get(url, options = {}) {
    return this.makeRequest(url, { method: 'GET', ...options });
  }

  post(url, data, options = {}) {
    return this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  put(url, data, options = {}) {
    return this.makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  delete(url, options = {}) {
    return this.makeRequest(url, { method: 'DELETE', ...options });
  }
}

export const apiService = new ApiService();
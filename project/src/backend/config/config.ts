export const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://vr-based-learning-tool.onrender.com/api'
    : 'http://localhost:5000/api',
  clientBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://vr-based-learning-tool.onrender.com'
    : 'http://localhost:5173'
}; 
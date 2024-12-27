import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { PostsManage } from './pages/postsManagement';
import { PostView } from './pages/postView';
import { EditPostForm } from './pages/postEdit';
import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { RouteAuth } from './auth/routeAuth';
import { NotFoundPage } from './pages/notFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <RouteAuth>
              <Dashboard />
            </RouteAuth>
            } />
          <Route path='/manage-posts' element={
            <RouteAuth>
              <PostsManage />
            </RouteAuth>
            } />
          <Route path='/post/:id' element={
            <RouteAuth>
              <PostView />
            </RouteAuth>
            } />
          <Route path='/edit-post' element={
            <RouteAuth>
              <EditPostForm />
            </RouteAuth>
            } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

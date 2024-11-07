import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { PostsManage } from './pages/postsManagement';
import { PostView } from './pages/postView';
import { EditPostForm } from './pages/postEdit';
import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/manage-posts' element={<PostsManage />} />
          <Route path='/post' element={<PostView />} />
          <Route path='/edit-post' element={<EditPostForm />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

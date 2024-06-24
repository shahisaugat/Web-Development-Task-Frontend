
import BookForm from './component/BookForm'
import GroundForm from './component/GroundForm'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './component/Sidebar';
import Dashboard from './component/Dashboard';
import UserForm from './component/UserForm';




function App() {

  return (
    <>
      <Router>
        <div className="flex  h-screen bg-white dark:bg-zinc-200">
          <section className="">
           <Sidebar />
          </section>
          <section className="grow  overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            <Route path="/book" element={<BookForm />} />
              <Route path="/ground" element={<GroundForm />} />
              <Route path="/user" element={<UserForm />} />
              
              
            </Routes>
          </section>
        </div>
      </Router>
    </>
  )
}

export default App

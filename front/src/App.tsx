import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import Navigation from "./header/navigation/Navigation";
import Sidebar from "./sidebar/Sidebar";
import { Suspense, lazy } from "react";

// Шапка сайта
const Home = lazy(() => import("./pages/home/Home"));
const History = lazy(() => import("./pages/history/History"));
const Schedule = lazy(() => import("./pages/Schedule/Schedule"));
const Contacts = lazy(() => import("./pages/contacts/Contscts"))

// Боковое меню
const Education = lazy(() => import("./pages/education/Education"))
const Cossacks = lazy(() => import("./pages/cossacks/Cossacks"));
const Construction = lazy(() => import("./pages/construction/Construction"));

// Кнопка поддержки
const Support = lazy(() => import("./pages/support/Support"))

// Ошибки
const NotFound = () => (
  <div style={{ padding: "20px" }}>404 — Страница не найдена</div>
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />

      {/* Обертка для контента и сайдбара */}
      <div className="page-layout">
        <main className="content-area">
          <Suspense fallback={<div>Загрузка</div>}>
            <Routes>
              {/* Шапка */}
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/contacts" element={<Contacts/>}/>

              {/* Боковое меню */}
              <Route path="/education" element={<Education/>}/>
              <Route path="/cossacks" element={<Cossacks />} />
              <Route path="/construction" element={<Construction/>}/>

              {/* Кнопка поддержки */}
              <Route path="/support" element={<Support />} />

              {/* Ошибки */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;

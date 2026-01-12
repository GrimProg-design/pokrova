import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import Navigation from "./header/navigation/Navigation";
import Sidebar from "./sidebar/Sidebar";
import { Suspense, lazy } from "react";
import { PrivateRoute } from "./defence/PrivateRoute";

// Шапка сайта
const Home = lazy(() => import("./pages/home/Home"));
const History = lazy(() => import("./pages/history/History"));
const Schedule = lazy(() => import("./pages/Schedule/Schedule"));
const Contacts = lazy(() => import("./pages/contacts/Contscts"));

// Боковое меню
const Education = lazy(() => import("./pages/education/Education"));
const Social = lazy(() => import("./pages/social/Social"));
const Cossacks = lazy(() => import("./pages/cossacks/Cossacks"));
const Construction = lazy(() => import("./pages/construction/Construction"));
const Decoration = lazy(() => import("./pages/decoration/Decoration"));

// Кнопка поддержки
const Support = lazy(() => import("./pages/support/Support"));

// Новости
const NewsDetails = lazy(() => import("./logics/news/NewsDetails"));

// Секции
const SectionDetails = lazy(() => import("./logics/sections/SectionDetails"));

// Архив
const Archive = lazy(() => import("./pages/archive/Archive"));

// Ошибки
const NotFound = () => (
  <div style={{ padding: "20px" }}>404 — Страница не найдена</div>
);

// Админка
const Login = lazy(() => import("./pages/Login"));
const AdminNews = lazy(() => import("./pages/admin/NewsCreate"));

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
              <Route path="/contacts" element={<Contacts />} />

              {/* Боковое меню */}
              <Route path="/education" element={<Education />} />
              <Route path="/social-service" element={<Social />} />
              <Route path="/cossacks" element={<Cossacks />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/decoration" element={<Decoration />} />

              {/* Кнопка поддержки */}
              <Route path="/support" element={<Support />} />

              {/* Новости */}
              <Route path="/news/:id" element={<NewsDetails />} />

              {/* Секции */}
              <Route path="/directions/:id" element={<SectionDetails />} />

              {/* Архив */}
              <Route path="/archive/:type" element={<Archive />} />

              {/* Ошибки */}
              <Route path="*" element={<NotFound />} />

              <Route path="/login" element={<Login />} />

              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <div className="admin-layout">
                      <AdminNews />
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>

        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;

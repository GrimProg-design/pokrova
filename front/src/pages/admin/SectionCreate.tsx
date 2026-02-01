import { useState } from "react";

export default function AdminSection() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("main"); // или любая дефолтная категория

  // Три отдельных стейта для трех разных полей файлов
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [inner1, setInner1] = useState<File | null>(null);
  const [inner2, setInner2] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    // Добавляем файлы по ключам, которые ожидает бэкенд (FileFieldsInterceptor)
    if (cardImage) formData.append("cardImage", cardImage);
    if (inner1) formData.append("inner1", inner1);
    if (inner2) formData.append("inner2", inner2);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/directions`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("adminToken") || "",
        },
      });

      if (res.ok) {
        alert("Направление успешно добавлено!");
        // Сброс полей
        setTitle("");
        setContent("");
        setCardImage(null);
        setInner1(null);
        setInner2(null);
      } else {
        alert("Ошибка при сохранении. Проверь логи сервера.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось отправить данные.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h1>Добавить новое направление</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label>Заголовок:</label>
          <input
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Контент (HTML или текст):</label>
          <textarea
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              marginTop: "5px",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Категория:</label>

          <select
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="education">Образование</option>
            <option value="social">Социальное служение</option>
            <option value="decoration">Украшение храма</option>
          </select>
        </div>

        <hr />

        <div>
          <label>
            <strong>Главное фото карточки (cardImage):</strong>
          </label>
          <input
            type="file"
            style={{ display: "block", marginTop: "5px" }}
            onChange={(e) => setCardImage(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div>
          <label>Дополнительное фото 1 (inner1):</label>
          <input
            type="file"
            style={{ display: "block", marginTop: "5px" }}
            onChange={(e) => setInner1(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label>Дополнительное фото 2 (inner2):</label>
          <input
            type="file"
            style={{ display: "block", marginTop: "5px" }}
            onChange={(e) => setInner2(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "15px",
            backgroundColor: loading ? "#ccc" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Сохранение..." : "Создать направление"}
        </button>
      </form>
    </div>
  );
}

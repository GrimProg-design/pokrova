import React, { useState } from "react";

export default function AdminNews() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [type, setType] = useState("main");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("data", data);
    formData.append("type", type);
    if (image) formData.append("image", image);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/news`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: localStorage.getItem("adminToken") || "",
      },
    });

    setLoading(false);

    if (res.ok) {
      alert("Новость успешно опубликована!");
      setTitle("");
      setData("");
    } else {
      alert("Ошибка при публикации. Проверьте права доступа.");
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
      <h1>Управление новостями</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label>Заголовок новости:</label>
          <input
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Текст новости:</label>
          <textarea
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              marginTop: "5px",
            }}
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Категория:</label>
          <select
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="main">Главные новости</option>
            <option value="cossack">Казачество</option>
            <option value="construction">Строительство</option>
          </select>
        </div>

        <div>
          <label>Изображение:</label>
          <input
            type="file"
            style={{ marginTop: "5px" }}
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "15px",
            backgroundColor: loading ? "#ccc" : "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Публикация..." : "Опубликовать новость"}
        </button>
      </form>
    </div>
  );
}

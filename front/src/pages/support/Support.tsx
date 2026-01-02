import { useState, useEffect } from "react";
import type { JSX } from "react";
import "./Support.style.css";

type PaymentMethod = "qr" | "phone" | "card";

export default function Support(): JSX.Element {
  const [method, setMethod] = useState<PaymentMethod>("qr");
  const [showToast, setShowToast] = useState(false);

  const paymentData = {
    phone: "+996 550 88 22 17",
    card: "4276 0000 0000 0000",
    qr: "/path-to-your-qr.png",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  // Автоматически скрываем уведомление через 3 секунды
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="support-container-fixed">
      <div className="support-page">
        <h1>Поддержите нас ❤️</h1>

        <div className="payment-display">
          {/* QR-код */}
          {method === "qr" && (
            <div className="payment-card qr-view">
              <div className="qr-box">
                <div className="qr-placeholder">
                  <span>QR CODE</span>
                </div>
              </div>
              <p className="hint">Отсканируйте в приложении банка</p>
            </div>
          )}

          {/* Телефон */}
          {method === "phone" && (
            <div className="payment-card phone-view">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="phone-content">
                    <span className="phone-label">Номер телефона</span>
                    <span className="phone-number">{paymentData.phone}</span>
                    <button
                      className="copy-btn-inner"
                      onClick={() => copyToClipboard(paymentData.phone)}
                    >
                      Скопировать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Карта */}
          {method === "card" && (
            <div className="payment-card card-view">
              <div className="bank-card">
                <div className="card-top">
                  <div className="card-chip"></div>
                  <span className="card-label">Visa / MBank</span>
                </div>

                <div className="card-middle">
                  <span className="card-number">{paymentData.card}</span>
                </div>

                <div className="card-bottom">
                  <button
                    className="copy-btn-inner card-btn"
                    onClick={() => copyToClipboard(paymentData.card)}
                  >
                    Скопировать номер карты
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Табы */}
        <div className="payment-tabs">
          <button
            className={method === "qr" ? "tab-btn active" : "tab-btn"}
            onClick={() => setMethod("qr")}
          >
            QR
          </button>
          <button
            className={method === "phone" ? "tab-btn active" : "tab-btn"}
            onClick={() => setMethod("phone")}
          >
            Телефон
          </button>
          <button
            className={method === "card" ? "tab-btn active" : "tab-btn"}
            onClick={() => setMethod("card")}
          >
            Карта
          </button>
        </div>

        {/* Уведомление (Toast) */}
        <div className={`toast ${showToast ? "visible" : ""}`}>
          <span className="check-icon">✓</span> Скопировано
        </div>
      </div>
    </div>
  );
}

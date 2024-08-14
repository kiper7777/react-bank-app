import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import "./NotificationsPage.css";
import announcement from "./svg/announcement.svg";
import warning from "./svg/warning.svg";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Функция для добавления нового уведомления
    const addNotification = (type, message) => {
      const time = new Date().toLocaleTimeString();
      setNotifications((prev) => [
        ...prev,
        { type, message, time },
      ]);
    };

    // Имитация получения новых уведомлений
    const loginInterval = setInterval(() => {
      addNotification("login", "New login detected");
    }, 10000); // каждые 10 секунд

    const balanceInterval = setInterval(() => {
      addNotification("balance", "Balance updated: $100");
    }, 15000); // каждые 15 секунд

    // Очистка интервалов при размонтировании компонента
    return () => {
      clearInterval(loginInterval);
      clearInterval(balanceInterval);
    };
  }, []);

  const handleBackButtonClick = () => {
    console.log("Back button clicked!");
  };

  return (
    <div className="page__notifications">
      <div className="header">
        <BackButton onClick={handleBackButtonClick} />
        <h1 className="header__notifications-title">Notifications</h1>
      </div>

      <div className="form__notifications">
        <div className="field__notifications">
          <div className="cards__notifications">
            {notifications.map((notification, index) => (
              <div className="card__notifications" key={index}>
                <img
                  src={notification.type === "login" ? warning : announcement}
                  alt={notification.type === "login" ? "Warning Icon" : "Announcement Icon"}
                  className="card__notifications-image"
                />
                <div className="card__notifications-text">
                  <span className="card__notifications-title">
                    {notification.message}
                  </span>
                  <p className="card__notifications-text-description">
                    {notification.time} - {notification.type === "login" ? "Warning" : "Announcement"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;



//   return (
//     <div className="page__notifications">
//       <div className="header">
//         <BackButton onClick={handleBackButtonClick} />
//         <h1 className="header__notifications-title">Notifications</h1>
//       </div>

//       <form className="form__notifications" onSubmit={handleSubmit}>
    
//         <div className="field__notifications">
          
//           <div className="cards__notifications">
//             <div className="card__notifications">
//               <img
//                 src={announcement}
//                 alt="Announcement Icon"
//                 className="card__notifications-image"
//                 onClick={click}
//               />
//               <div className="card__notifications-text">
//                 <span className="card__notifications-title">New reward system</span>
//                 <p className="card__notifications-text-description">10 min. ago - Announcement</p>
//               </div>
//             </div>

//             <div className="card__notifications">
//               <img
//                 src={warning}
//                 alt="Warning Icon"
//                 className="card__notifications-image"
//                 onClick={click}
//               />
//               <div className="card__notifications-text">
//                 <span className="card__notifications-title">New login</span>
//                 <p className="card__notifications-text-description">20 min. ago - Warning</p>
//               </div>
//             </div>

//             <div className="card__notifications">
//               <img
//                 src={announcement}
//                 alt="Announcement Icon"
//                 className="card__notifications-image"
//                 onClick={click}
//               />
//               <div className="card__notifications-text">
//                 <span className="card__notifications-title">New reward system</span>
//                 <p className="card__notifications-text-description">10 min. ago - Announcement</p>
//               </div>
//             </div>

//             <div className="card__notifications">
//               <img
//                 src={warning}
//                 alt="Warning Icon"
//                 className="card__notifications-image"
//                 onClick={click}
//               />
//               <div className="card__notifications-text">
//                 <span className="card__notifications-title">New login</span>
//                 <p className="card__notifications-text-description">20 min. ago - Warning</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };



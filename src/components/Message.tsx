import { NotificationPayload } from "firebase/messaging";
import "./Message.css";
const Message = ({
  notification,
}: {
  notification: NotificationPayload | undefined;
}) => {
  return (
    <>
      <div id="notificationHeader">
        {/* image is optional */}
        {notification?.image && (
          <div id="imageContainer">
            <img src={notification.image} width={100} />
          </div>
        )}
        <span>{notification?.title}</span>
      </div>
      <div id="notificationBody">{notification?.body}</div>
    </>
  );
};

export default Message;

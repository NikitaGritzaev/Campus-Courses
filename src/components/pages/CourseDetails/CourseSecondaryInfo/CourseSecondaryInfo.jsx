import { Tab, Tabs, Badge, Card, Button } from "react-bootstrap";
import parse from "html-react-parser";
import { notificationsCount } from "../../../../utils/CourseInfoHelpers";
import { BiFlag, BiMenu, BiError, BiEnvelope, BiSend } from "react-icons/bi";
import cls from "./notifications.module.css";

function CourseSecondaryInfo({
  annotations,
  requirements,
  notifications,
  isAdmin,
  isTeacher,
  addNotify,
}) {
  return (
    <div className="my-5">
      <Tabs fill>
        <Tab
          eventKey="requirements"
          title={<><BiFlag/>&nbsp;Требования к курсу</>}
          tabClassName="text-black fs-5 d-flex align-items-center justify-content-center"
          className="p-3 border-top-0 border"
        >
          {parse(requirements || " ")}
        </Tab>
        <Tab
          eventKey="annotations"
          title={<><BiMenu/>&nbsp;Аннотации</>}
          tabClassName="text-black fs-5 d-flex align-items-center justify-content-center"
          className="p-3 border-top-0 border"
        >
          {parse(annotations || " ")}
        </Tab>
        <Tab
          tabClassName="text-black fs-5 d-flex align-items-center justify-content-center"
          className="pt-1 border-top-0 border"
          eventKey="notifications"
          title={
            <>
              <BiEnvelope/>&nbsp;Уведомления&nbsp;
              <Badge bg={notifications?.length ? "danger" : "secondary"}>
                {notificationsCount(notifications?.length)}
              </Badge>
            </>
          }
        >
          {(isAdmin || isTeacher) && (
            <Button className="m-1 mb-2 d-flex align-items-center" onClick={addNotify}>
              <BiSend/>&nbsp;Добавить уведомление
            </Button>
          )}
          {!notifications?.length && <h3 className="text-center">Нет уведомлений</h3>}
          {notifications?.map((notification, i) => (
            <Card
              body
              key={i}
              className={
                notification.isImportant
                  ? `${cls.notificationImportant} imp`
                  : cls.notification
              }
            >
              {notification.isImportant ? (
                <BiError size={20} />
              ) : (
                <BiEnvelope size={20} />
              )}{" "}
              {notification.text}
            </Card>
          ))}
        </Tab>
      </Tabs>
    </div>
  );
}

export default CourseSecondaryInfo;

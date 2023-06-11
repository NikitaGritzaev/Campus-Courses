import Badge from "react-bootstrap/esm/Badge"

export const CREATED = 0 
export const OPEN_FOR_ASSIGNING = 1
export const STARTED = 2
export const FINISHED = 3

export const MIDTERM = "Midterm";
export const FINAL = "Final";

export const NOT_DEFINED = "NotDefined";
export const PASSED = "Passed";
export const FAILED = "Failed";

export const IN_QUEUE = "InQueue";
export const ACCEPTED = "Accepted";
export const DECLINED = "Declined";

export const getStatus = (statusString) => {
    switch(statusString) {
        case "Created":
            return CREATED;
        case "OpenForAssigning":
            return OPEN_FOR_ASSIGNING;
        case "Started":
            return STARTED;
        case "Finished":
            return FINISHED;
        default:
            return CREATED;
    }
}

export const getStudentStatusText = (statusString) => {
    switch(statusString) {
        case IN_QUEUE:
            return <p className="my-0">Статус - <span className="text-primary fw-bold">в очереди</span></p>
        case ACCEPTED:
            return <p className="my-0">Статус - <span className="text-success fw-bold">в группе</span></p>
        case DECLINED:
            return <p className="my-0">Статус - <span className="text-danger fw-bold">отклонен</span></p>
        default:
            return <p className="my-0">Статус не определен</p>
    }
}

export const getStudentMarkBadge = (markString) => {
    switch(markString) {
        case NOT_DEFINED:
            return <Badge bg="secondary">Нет оценки</Badge>
        case PASSED:
            return <Badge bg="success">Успешно</Badge>
        case FAILED:
            return <Badge bg="danger">Провалено</Badge>
        default:
            return <Badge>Нет данных</Badge>
    }
}
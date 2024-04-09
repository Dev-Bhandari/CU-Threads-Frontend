import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

function AlertToast(message = "No Message") {
    return (
        <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> {message}
        </Alert>
    );
}

export default AlertToast;

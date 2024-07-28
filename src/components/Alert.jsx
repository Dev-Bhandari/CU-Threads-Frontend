import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

function AlertToast(message = "No Message") {
    return (
        <div className="z-50">
            <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> {message}
            </Alert>
        </div>
    );
}

export default AlertToast;

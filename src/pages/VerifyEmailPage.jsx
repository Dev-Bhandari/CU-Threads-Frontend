import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../utils/api/user.api";
import { useModalContext } from "../utils/modalContext";

function VerifyEmailPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("emailToken");
    const { setAlertResponse } = useModalContext();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await verifyEmail(token);
                console.log(response);
                console.log("User verified successfully!");
            } catch (error) {
                console.log("Something went wrong");
                console.log(error);
                if (error && !error.response.data.message)
                    setAlertResponse({ message: "Something went wrong" });
                else setAlertResponse({ message: error.response.data.message });
            } finally {
                navigate("/home");
            }
        };
        verifyUser();
    }, [token]);

    console.log("token:", token);


    return <div>Verification Page</div>;
}

export default VerifyEmailPage;

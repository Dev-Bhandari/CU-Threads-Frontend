import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import userAPI from "../utils/api";
import { useModalContext } from "../utils/modalContext";

function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("emailToken");
    const { setAlertResponse } = useModalContext();
    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Send API request to verify user with token
                const response = await userAPI.verifyEmail(token);
                // Verification successful, handle accordingly
                console.log(response);
                console.log("User verified successfully!");
            } catch (error) {
                // Handle verification error
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
    }, [token]); // In

    // Use the token as needed
    console.log("token:", token);

    // Your verification logic here

    return <div>Verification Page</div>;
}

// Your existing App component

export default VerifyEmail;

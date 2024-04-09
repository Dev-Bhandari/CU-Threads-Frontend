import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import userAPI from "../utils/api";

function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("emailToken");

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Send API request to verify user with token
                const response = await userAPI.verifyEmail(token);
                // Verification successful, handle accordingly
                console.log(response);
                console.log("User verified successfully!");
                navigate("/home");
            } catch (error) {
                // Handle verification error
                console.log("Something went wrong");
                console.log(error.response);
                if (!error.response.data.success) {
                    const errorMessage = error.response.data;
                    console.log(errorMessage);
                }
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

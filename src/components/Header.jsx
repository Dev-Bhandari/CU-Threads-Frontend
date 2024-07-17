import { useAuth } from "../utils/authContext"; // Import the useAuth hook if needed
import { Navbar, Dropdown, Avatar, Alert } from "flowbite-react";
import {
    HiCog,
    HiCurrencyDollar,
    HiLogout,
    HiInformationCircle,
} from "react-icons/hi";
import { logoutUser } from "../utils/api/user.api";
import { useModalContext } from "../utils/modalContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { user, removeUserData } = useAuth();
    const { toggleLoginModal, alertResponse, setAlertResponse, resetOnLogout } =
        useModalContext();
    const navigate = useNavigate();

    return (
        <>
            <Navbar fluid rounded className="h-14 sticky top-0 z-30 shadow-sm">
                <Navbar.Brand href="/home">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">
                        CU Threads
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {user?.isVerified ? (
                        <>
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt="Avatar"
                                        img={user?.avatar}
                                        rounded
                                    />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm text-center">
                                        {user?.username}
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item icon={HiCog}>
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item icon={HiCurrencyDollar}>
                                    Earnings
                                </Dropdown.Item>
                                <Dropdown.Divider />

                                <Dropdown.Item
                                    icon={HiLogout}
                                    onClick={async () => {
                                        try {
                                            resetOnLogout();
                                            removeUserData();
                                            await logoutUser();
                                            navigate(0);
                                        } catch (error) {
                                            console.log(error.response);
                                            throw error;
                                        }
                                    }}
                                >
                                    Log Out
                                </Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </>
                    ) : (
                        <div>
                            <button
                                className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                                onClick={toggleLoginModal}
                            >
                                Login
                            </button>
                            <Navbar.Toggle />
                        </div>
                    )}
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="/home" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            {alertResponse.message && (
                <div className="px-10 py-1 z-50">
                    <Alert
                        color="failure"
                        icon={HiInformationCircle}
                        onDismiss={() => setAlertResponse({ message: null })}
                    >
                        <span className="font-medium">Info alert! </span>
                        {alertResponse.message}
                    </Alert>
                </div>
            )}
        </>
    );
};

export default Header;

import { useAuth } from "../../utils/authContext"; // Import the useAuth hook if needed
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiMail } from "react-icons/hi";
import userAPI from "../../utils/api";
import { useModalContext } from "../../utils/modalContext";

const Header = () => {
    const { user, removeUserData } = useAuth();
    const { toggleLoginModal, toggleVerifyUserModal, setResendResponse } =
        useModalContext();

    return (
        <Navbar fluid rounded className="sticky top-0 z-50">
            <Navbar.Brand href="/">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    CU Threads
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {user?.isVerified ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="Avatar" img={user?.avatar} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm text-center">
                                {user?.username}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                        <Dropdown.Item icon={HiCurrencyDollar}>
                            Earnings
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item
                            icon={HiLogout}
                            onClick={async () => {
                                try {
                                    if (user.isVerified)
                                        await userAPI.logoutUser();
                                    removeUserData();
                                } catch (error) {
                                    console.log(error.response);
                                    throw error;
                                }
                            }}
                        >
                            Log Out
                        </Dropdown.Item>
                    </Dropdown>
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
    );
};

export default Header;

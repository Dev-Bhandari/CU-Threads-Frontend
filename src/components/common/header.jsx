import { useAuth } from "../../utils/authContext"; // Import the useAuth hook if needed
import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import userAPI from "../../utils/api";

const Header = () => {
    const { user, logout } = useAuth(); // If you need user information or logout functionality

    return (
        <Navbar fluid rounded className="sticky top-0 z-50">
            <Navbar.Brand href="/">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    CU Threads
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {user ? (
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
                            {/* <span className="block truncate text-sm font-medium">
                                {user?.email}
                            </span> */}
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
                                    await userAPI.logoutUser();
                                    logout();
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
                        <Button href="/login">Login</Button>
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

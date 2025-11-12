import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { User } from "@/types";
import { authApi, useLogoutMutation } from "@/app/services/auth";
import { logout } from "@/pages/auth/authSlice";

export default function AccountDropdown({ user }: { user: User | null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation(undefined);
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  const items: MenuProps["items"] = [
    // {
    //   key: "profile",
    //   label: "Profile",
    //   icon: <UserOutlined />,
    //   onClick: () => navigate("/account"),
    // },
    // {
    //   type: "divider",
    // },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (!user)
    return (
      <Link to="/login">
        <Button type="text" icon={<UserOutlined />} />
      </Link>
    );

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        type="text"
        icon={<UserOutlined />}
        style={{ display: "flex", alignItems: "center" }}
      >
        {user?.first_name || "Account"}
      </Button>
    </Dropdown>
  );
}

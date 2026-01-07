import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}

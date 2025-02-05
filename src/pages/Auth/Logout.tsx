import { useNavigate } from "react-router-dom";
import { logoutHost } from "../../api/auth/auth";
import { useEffect } from "react";

export default function Logout({ authSetter }: { authSetter: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate();

    useEffect(() => {
        logoutHost()
            .then(() => {
                authSetter(false);
                navigate("/");
            })
            .catch((error) => console.log(error));
    }, [authSetter, navigate]);
    return <h1>Logging out...</h1>;
}
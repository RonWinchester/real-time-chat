import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Chat from "./Chat";
const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Signup}/>
            <Route path="/chat" Component={Chat}/>
        </Routes>
    )
}

export default AppRoutes
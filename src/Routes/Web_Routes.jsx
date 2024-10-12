import { createBrowserRouter } from "react-router-dom";
import FixedElement from "../Web_Pages/FixedElement";
import Home from "../Web_Pages/Home/Home";
import Login from "../Web_Pages/Login/Login";
import Registration from "../Web_Pages/Register/Registration";
import Payment from "../Payments/Payment";

const Web_Routes = createBrowserRouter([
    {
        path: '/',
        element: <FixedElement></FixedElement>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Registration></Registration>
    }
])

export default Web_Routes;
//para realizar rutas privadas, en el app.js pondríamos por ejemplo:
//<PrivateRoute path="/" exact>
//<Home />
//</PrivateRoute>

//lo que le dice es que si hay token me muestre el hijo (Home), si no hay token que me devuelva al /login

// import React from 'react';
// import { Redirect, Route } from "react-router-dom";
// import {ACCES_TOKEN_NAME} from '../constants/constants'

// function PrivateRoute({ children, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 localStorage.getItem(ACCES_TOKEN_NAME) ? (
//                     children
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: { from: location }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }
// export default PrivateRoute;
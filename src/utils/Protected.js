import { Redirect } from "react-router-dom";


const Protected = ({ isLoggedIn, children }) => {
    console.log('PROTECTED')
    if (!isLoggedIn) {
    
    
return <Redirect to="/" replace />;

}

return children;
};
export default Protected;
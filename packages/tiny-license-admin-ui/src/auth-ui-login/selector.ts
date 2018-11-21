import { selector as authState } from "@australis/tiny-auth-redux";
/** */
const selector = (state: {}) => {    
    return {
        authState: authState(state),                
    };
};
/** */
export default selector;
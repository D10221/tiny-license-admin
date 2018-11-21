
module.exports.default = ({ user, license }) => `
Hi ${user.displayName},\n\r
    This is the ${license.displayName} token.\n\r 
    ${license.token}\n\r
    Regards.\n\r
    The Robot.
`;
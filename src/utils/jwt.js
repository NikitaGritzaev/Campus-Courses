const validateJwt = () => {
    const jwtRegex = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;
    let token = localStorage.getItem("jwt");
    if (token?.match(jwtRegex)) return `Bearer ${token}`;
    localStorage.removeItem("jwt");
    return null;
}

export default validateJwt;
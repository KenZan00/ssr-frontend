export function extractUser(): string {
    const token = localStorage.getItem("token")

    let username=""

    if (!token) {
        username = "incognito"
        return username
        } else {
            const tokenDecoded = JSON.parse(atob(token.split(".")[1]));
            const user = tokenDecoded.email;
            console.log("Decoded token", tokenDecoded)
            console.log("User", user)
            return user
    }
}

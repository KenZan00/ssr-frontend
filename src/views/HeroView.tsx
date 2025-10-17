import logo from "../assets/logo.png";

export default function HeroView() {
    return (
        <div className="hero-container">
            <div className="left-hero">
                <h1>Code & Write</h1>
                <img src={logo} alt="Logo" width={600} height={600} />
                <div className="left-hero-textbox">
                    <p>Full collaboration</p>
                    <div className="lower-yellow-circle">
                        <span>Write and run javascript!</span>
                    </div>
                    <p>Text documents</p>
                </div>
            </div>
            <div className="right-hero">
                {/*A NOT working form, only for testing --> form handling should be in component*/}
                <form className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

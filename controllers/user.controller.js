const user = require("../modals/user.modal")
const jwt = require("jsonwebtoken")

const signupui = (req, res) => {
    res.render("signup")
}

const create = async (req, res) => {
    let { username, email, password } = req.body
    let users = await user.findOne({ email: email })

    if (users) {
        res.redirect("login")
    }
    else {
        let data = await user.create(req.body)
        res.cookie("id", data.id)
        res.cookie("role", data.role).redirect("login")
    }
}

const loginui = (req, res) => {
    res.render("login")
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const users = await user.findOne({ email: email });

    if (!users) {
        return res.send("user not found");
    } else if (users.password !== password) {
        return res.send("password not match");
    } else {
        let token = jwt.sign({ id: users._id }, "token");
        res.cookie("token", token).cookie("id", users._id).cookie("role", users.role);
        res.redirect("/event/home")

    }
};

module.exports = {
    signupui,
    create,
    loginui,
    login
}
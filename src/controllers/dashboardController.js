
function dashboard(req, res) {
    const user = req.session.user;
    res.render('dashboard', { user });
}

module.exports = { dashboard };

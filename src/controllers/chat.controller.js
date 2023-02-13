const getMessage = (req, res) => {

    const userLog = req.user;
    res.render('chat', { userLog });
}

export { getMessage }
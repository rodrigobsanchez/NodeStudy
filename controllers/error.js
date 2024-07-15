exports.get404 = (req, res, next) => {
    //adding the undefined as a sign that this was working on the teacher locally though i had not defined.
    res.status(404).render('404', {pageTitle: 'Page Not Found!!!', path: undefined});
}

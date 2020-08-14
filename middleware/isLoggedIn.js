// export to see if theres a user
module.exports = (req, res, next) =>{
    // if this current req.user goes to another page on our site but 
    // still have url that a site that they were signed but they wanna access that 
    // this telling you gotta sign in again if you try to go to a different page when your logged out
    if (!req.user) {
       req.flash('Error', 'You must be signed in to access this page.') 
       res.redirect('/auth/login')
    } else {
    // this else lets go to the next page if they pass the first one
        next()
    }
}
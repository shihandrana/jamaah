module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        console.log(req.user);

        var agendaData = [{
            id: "1",
            khatibName: "Dr. Syafiq Riza Basalamah, Lc",
            title: "Andai Aku Tidak Menikah Dengannya",
            dateGregorian: "07 Januari 2017 M",
            dateHijriah: "03 Rabi'uts Tsani 1438 H",
            timeStart: "09:00",
            timeEnd: "11:30",
            timeZone: "WIB",
            location: "Ex. Sidimacho, Samping SMAN 1, Dekat Gate 3",
            city: "Duri",
            tag: "Kajian",
            description: "lalala yeyeyeye",
            notes: "- Demi kenyamanan parkir, ummahat yang rumahnya berdekatan untuk datang bersama dalam 1 mobil<br/>- Bagi yang membawa anak mohon diperhatikan selama kajian berlangsung.",
            CPBrother: "085271126273",
            CPSister: "085272237384",
            organizer: "Yayasan Baitul Huda, Duri",
            attend: "Yes"
        }, {
            id: "2",
            khatibName: "Abu Zubair Hawaary, Lc",
            title: "Keutamaan Manhaj Sunnah Dalam Kehidupan Sosial Masyarakat",
            dateGregorian: "08 Januari 2017 M",
            dateHijriah: "04 Rabi'uts Tsani 1438 H",
            timeStart: "20:00",
            timeEnd: "21:30",
            timeZone: "WIB",
            location: "Mesjid Muslimin, Jl. Nusantara No.13, Duri",
            city: "Duri",
            tag: "Khusus Akhwat",
            description: "lalala yeyeyeye",
            notes: "- Demi kenyamanan parkir, ummahat yang rumahnya berdekatan untuk datang bersama dalam 1 mobil<br/>- Bagi yang membawa anak mohon diperhatikan selama kajian berlangsung.",
            CPBrother: "085271126273",
            CPSister: "085272237384",
            organizer: "Pengurus Mesjid Muslimin, Duri",
            attend: "No"
        }];

        res.render('home', {
            user: req.user, // get the user out of session and pass to template
            data: agendaData
        })
    });

    app.get('/profile',
        /*isLoggedIn,*/
        function(req, res) { // use route middleware to verify (isLoggedIn function)
            res.render('profile', {
                user: req.user // get the user out of session and pass to template
            });
        });

    app.get('/updateEvent',
        isLoggedIn,
        function(req, res) { // use route middleware to verify (isLoggedIn function)
            res.render('update-event', {
                user: req.user // get the user out of session and pass to template
            });
        });

    app.get('/test',
        function(req, res) {
            var data = [{ // this should generate panel-success
                type: "funny",
                sure: "Yes"
            }, { // this should generate panel-a
                type: "funny",
                sure: "No"
            }, { // this should generate panel-b
                type: "pissed",
                sure: "No",
            }];

            res.render('test', {
                data: agendaData
            });
        });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the register form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/test', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: 'test', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // FACEBOOK ROUTES =====================    
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: 'profile',
            failureRedirect: '/'
        }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
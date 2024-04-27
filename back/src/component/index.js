document.addEventListener('DOMContentLoaded', () => {
    if (window.session) {
        const {user} = window.session

        if (user.isConfirm) {
            location.assign('/balance')
        } else {
            location.assign('/signup-confirm')
        }
    }   else {
            location.assign('/signup')
    }
})
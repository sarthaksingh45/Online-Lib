const domain = 'meet.jit.si';

const options = {
    roomName: 'MyPublicLibrary',
    width: window.screen.width,
    height: window.screen.height,
    parentNode: document.querySelector('#meet'),
    userInfo: {
        email: email,
        displayName: user,
    }
};
const api = new JitsiMeetExternalAPI(domain, options);
api.addListener("videoConferenceLeft", function(){
    window.location ="https://our-online-library.herokuapp.com/home";
});
//console.log(user);
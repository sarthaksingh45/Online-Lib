const domain = '8x8.vc';

const options = {
    roomName: 'vpaas-magic-cookie-5c7717c6a236429286b7061cd688dc6b/MyPublicLibrary',
    width: window.screen.width,
    height: window.screen.height,
    parentNode: document.querySelector('#meet'),
    // userInfo: {
    //     email: email,
    //     displayName: user,
    //     "moderator": false,
    //     configOverwrite: { toolbarButtons: ['hangup', 'microphone', 'camera'], },
    // }
    jwt: jsontoken
};
const api = new JitsiMeetExternalAPI(domain, options);
api.addListener("videoConferenceLeft", function(){
    window.location ="https://our-online-library.herokuapp.com/home";
});
//console.log(user);
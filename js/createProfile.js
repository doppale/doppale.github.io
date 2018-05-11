function fillInputs() {
    api.getByWallet("", (resp) => {
        if (!resp || !resp.result) {
            return;
        }

        let profile;
        try {
            profile = JSON.parse(resp.result);
        }
        catch(e) {}

        if(!profile){
            return;
        }

        document.querySelector("#name").value = profile.name;
        document.querySelector("#about").value = profile.about;
        document.querySelector("#avatar").value = profile.avatar;
        document.querySelector("#email").value = profile.email;
        document.querySelector("#skype").value = profile.skype;
        document.querySelector("#telegram").value = profile.telegram;
        document.querySelector("#slack").value = profile.slack;
        document.querySelector("#whatsapp").value = profile.whatsapp;
        document.querySelector("#facebook").value = profile.facebook;
        document.querySelector("#twitter").value = profile.twitter;
        document.querySelector("#instagram").value = profile.instagram;
        document.querySelector("#vk").value = profile.vk;
        document.querySelector("#youtube").value = profile.youtube;
        document.querySelector("#twitch").value = profile.twitch;
        document.querySelector("#reddit").value = profile.reddit;
        document.querySelector("#linkedin").value = profile.linkedin;
        document.querySelector("#github").value = profile.github;

    });
}

function addProfileHandler() {
    let profile = {};
    profile.added = Date.now();
    profile.name = document.querySelector("#name").value;
    profile.about = document.querySelector("#about").value;
    profile.avatar = document.querySelector("#avatar").value;
    profile.email = document.querySelector("#email").value;
    profile.skype = document.querySelector("#skype").value;
    profile.telegram = document.querySelector("#telegram").value;
    profile.slack = document.querySelector("#slack").value;
    profile.whatsapp = document.querySelector("#whatsapp").value;
    profile.facebook = document.querySelector("#facebook").value;
    profile.twitter = document.querySelector("#twitter").value;
    profile.instagram = document.querySelector("#instagram").value;
    profile.vk = document.querySelector("#vk").value;
    profile.youtube = document.querySelector("#youtube").value;
    profile.twitch = document.querySelector("#twitch").value;
    profile.reddit = document.querySelector("#reddit").value;
    profile.linkedin = document.querySelector("#linkedin").value;
    profile.github = document.querySelector("#github").value;

    api.addOrUpdateProfile(profile, (resp) => {
        console.log(resp);
    });
}

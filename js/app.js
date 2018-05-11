function loadBeginData() {
    showLoadingAnimation();
    api.getTotalCount((resp) => {
        if(resp && resp.result) {
            let total = JSON.parse(resp.result);
            document.querySelector(".totalProfiles span").innerHTML = total;
        }
    });

    api.getLastRegistered((resp) => {
        if(resp && resp.result) {            
            let profiles = JSON.parse(resp.result);
            showProfile(profiles.reverse()[0]);                        
            showLastRegisteredProfiles(profiles);
        }
        clearLoadingAnimation();        
    });
}

function showLoadingAnimation() {
    document.querySelector(".loader").classList.remove("hide");
    document.querySelector("body > .container").classList.add("hide");
}

function clearLoadingAnimation() {
    document.querySelector(".loader").classList.add("hide");
    document.querySelector("body > .container").classList.remove("hide");
}

function searchWallet() {
    let wallet = document.querySelector("#search").value;
    api.getByWallet(wallet, (response) => {
        if(response && response.result) {
            let profile = JSON.parse(response.result);
            showProfile(profile);
        }
        else {            
            let card = document.querySelector(".user-card");
            card.innerHTML = `Profile <span>${wallet}</span> not found`;
            card.classList.add("no-profile");
        }
    });     
}

function showProfile(profile) {
    if(!profile) return;
    
    let hasContacts = profile.email || profile.skype || profile.telegram || profile.whatsapp || profile.slack;
    let hasSocial = profile.facebook || profile.twitter || profile.instagram || profile.vk || profile.youtube 
                 || profile.twitch || profile.reddit || profile.github  || profile.linkedin;

    let innerHtml = `<div class="user-card">
    <div class="user-card__header d-flex justify-content-between">
        <span>added: ${convertUnixStampToScreenDate(profile.added)}</span>`;

    if(profile.updated) {
        innerHtml += `<span>updated: ${convertUnixStampToScreenDate(profile.updated)}</span>`;
    }    
    
    innerHtml += `</div>
    <div class="user-card__body">
        <div class="user-card__main-info d-flex">
            <div class="d-flex flex-column align-items-center left">
                <img src="${profile.avatar  || "img/no_avatar.png"}" style="width: 100px; height: 100px;">
                <div class="d-flex flex-wrap justify-content-center align-items-center views">
                    <span class="text">#</span>
                    <span class="count">${profile.id}</span>                    
                </div>
            </div>
            <div class="right">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="name">${profile.name}</div>
                    <div class="wallet">
                    ${profile.wallet}
                    </div>
                </div>
                <div class="about">${profile.about || ""}</div>
            </div>
        </div>`;

    if(hasContacts) {      
        
        
        innerHtml += ` <div class="d-flex">
                            <div class="user-card__contacts">    
                            <h5>Contacts</h5>`;
        if(profile.email) {
            innerHtml += `<a class="contact-link mail" href="mailto:${profile.email}" alt="email" data-toggle="tooltip" data-placement="top" title="Email" target="_blank"></a>`;
        }
    
        if(profile.skype) {
            innerHtml += `<a class="contact-link skype" href="skype:${profile.skype}" alt="skype" data-toggle="tooltip" data-placement="top" title="Skype" target="_blank"></a>`;
        }
    
        if(profile.telegram) {
            innerHtml += `<a class="contact-link telegram" href="https://t.me/${profile.telegram}" alt="telegram" data-toggle="tooltip" data-placement="top" title="Telegram" target="_blank"></a>`;
        }
    
        if(profile.whatsapp) {
            innerHtml += `<a class="contact-link whatsapp" href="whatsapp:${profile.whatsapp}" alt="whatsapp" data-toggle="tooltip" data-placement="top" title="Whatsapp" target="_blank"></a>`;
        }
    
        if(profile.slack) {
            innerHtml += `<a class="contact-link slack" href="https://${profile.slack}.slack.com" alt="slack" data-toggle="tooltip" data-placement="top" title="Slack" target="_blank"></a>`;
        }

        innerHtml += "</div>";
    }

    if(hasSocial) {

        innerHtml += `<div class="user-card__social">
                        <h5>Social</h5>`;

        if(profile.facebook) {
            innerHtml += `<a class="contact-link facebook" href="https://fb.com/${profile.facebook}" alt="facebook" data-toggle="tooltip" data-placement="top" title="Facebook" target="_blank"></a>`;
        }
    
        if(profile.twitter) {
            innerHtml += `<a class="contact-link twitter" href="https://twitter.com/${profile.twitter}" alt="twitter" data-toggle="tooltip" data-placement="top" title="Twitter" target="_blank"></a>`;
        }
    
        if(profile.instagram) {
            innerHtml += `<a class="contact-link instagram" href="https://instagram.com/${profile.instagram}" alt="instagram" data-toggle="tooltip" data-placement="top" title="Instagram" target="_blank"></a>`;
        }
    
        if(profile.vk) {
            innerHtml += `<a class="contact-link vk" href="https://vk.com/${profile.vk}" alt="vk" data-toggle="tooltip" data-placement="top" title="VK" target="_blank"></a>`;
        }
    
        if(profile.youtube) {
            innerHtml += `<a class="contact-link youtube" href="https://youtube.com/channel/${profile.youtube}" alt="youtube" data-toggle="tooltip" data-placement="top" title="Youtube chanel" target="_blank"></a>`;
        }
    
        if(profile.twitch) {
            innerHtml += `<a class="contact-link twitch" href="https://twitch.com/${profile.twitch}" alt="twitch" data-toggle="tooltip" data-placement="top" title="Twitch" target="_blank"></a>`;
        }
    
        if(profile.reddit) {
            innerHtml += `<a class="contact-link reddit" href="https://reddit.com/user/${profile.reddit}" alt="reddit" data-toggle="tooltip" data-placement="top" title="Reddit" target="_blank"></a>`;
        }
    
        if(profile.linkedin) {
            innerHtml += `<a class="contact-link linkedin" href="https://linkedin.com/${profile.linkedin}" alt="linkedin" data-toggle="tooltip" data-placement="top" title="LinkedIn" target="_blank"></a>`;
        }
    
        if(profile.github) {
            innerHtml += `<a class="contact-link github" href="https://github.com/${profile.github}" alt="github" data-toggle="tooltip" data-placement="top" title="Github" target="_blank"></a>`;
        }

        innerHtml += "</div>";
    } 
            
    innerHtml += `</div></div></div>`;

    let div = document.createElement("div");
    div.innerHTML = innerHtml;
    let page = document.querySelector(".page-body");    
    let card = page.querySelector(".user-card");
    page.replaceChild(div.firstChild, card);
}

function showLastRegisteredProfiles(profiles) {
    if(!profiles) return;
    window.mostViewedProfiles = profiles;

    let mostview = document.querySelector(".mostview .block-body");
    let ul = document.createElement("ul");
    for (const profile of profiles) {
        console.log(profile);
        let li = document.createElement("li");
        li.append(generateProfileLink(profile))
        ul.append(li);
    }
    mostview.replaceChild(ul, mostview.querySelector("ul"));
}

function generateProfileLink(profile) {
    if(!profile) return;
    let div = document.createElement('div');
    div.innerHTML = `<button class="profile-link" data-id="${profile.id}">${profile.name}</button>`;
    let a = div.firstChild;  
    a.onclick = (event) => {        
        event.preventDefault();
        let profileId = event.target.dataset.id;
        if(!profileId)
            return false;
        if(!checkIdAndShowCard(profileId, profile)) {
            let profiles = window.mostViewedProfiles ? Array.from(window.mostViewedProfiles) : [];
            for (const profile of profiles) {
                if(checkIdAndShowCard(profileId, profile)){
                    break;
                }               
            }
        }
        return false;
        
        function checkIdAndShowCard(id, profile) {
            if(profile.id == id) {
                showProfile(profile);
                return true;
            }
            return false;
        }
    };
    return a;
}

function addNoExtensionAlert() {
    let div = document.createElement('div');
    div.innerHTML = `<div class="container mb-0"><div class="alert alert-danger" role="alert">
        Please install <a href="https://github.com/ChengOrangeJu/WebExtensionWallet" class="alert-link">WebExtensionWallet</a> to use Nebulas Profile.
    </div></div>`;

    let nav = document.querySelector(".main-nav");
    nav.parentNode.insertBefore(div.firstChild, nav.nextSibling);
}


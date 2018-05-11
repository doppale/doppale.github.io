# Nebulas Profile
 
The application allows you to keep information about the owner of the wallet. You can specify in your profile much links to your social networks and save contacts of instant messengers. This helps to store a lot of information in one place and identify the owner of the wallet.

![profile](https://github.com/doppale/doppale.github.io/blob/master/img/profile.png?raw=true)

## Smart Contract

- `total()` 
Returns count of profiles.

- `addOrUpdate(profileJson)` 
Add new or update exists profile.

- `get(limit, offset)`
Returns profiles.

- `getById(id)` 
Returns profile by id.

- `getByWallet(wallet)` 
Returns profile by wallet.

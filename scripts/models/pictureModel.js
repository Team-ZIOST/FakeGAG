var Picture = (function () {
    function Picture(objectId, title, caption, url, votes, voters, category, owner, ownerName) {
        this._title = title;
        this._votes = votes;
        this._voters = voters;
        this._caption = caption;
        this._owner = owner;
        this._category = category;
        this._objectId = objectId;
        this._pictureURL = url;
        this._ownerName = ownerName;
    }

    return Picture;
}());
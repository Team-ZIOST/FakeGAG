var Picture = (function () {
    function Picture(objectId, title, caption, url, votes, category, owner) {
        this._title = title;
        this._votes = votes;
        this._caption = caption;
        this._owner = owner;
        this._category = category;
        this._objectId = objectId;
        this._pictureURL = url;
    }

    return Picture;
//picture Binding Model
}());
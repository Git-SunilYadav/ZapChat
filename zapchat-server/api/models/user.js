function Authentication(){
    this.loginId = "";
    this.password = "";
}

Authentication.prototype.setCredentials = function(loginId,password){
    this.loginId = loginId;
    this.password = password;
}

Authentication.prototype.getLoginId = function(){
    return this.loginId;
}

Authentication.prototype.getPassword = function(){
    return this.password;
}

module.exports = {
    authObject: function() {
        return new Authentication();
    },

    setCredentials: function(loginId,password) {
        return Authentication.prototype.setCredentials(loginId,password)
    },

    getLoginId: function() {
        return Authentication.prototype.getLoginId()
    },

    getPassword: function() {
        return Authentication.prototype.getPassword()
    }
}


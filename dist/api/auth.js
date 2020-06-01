export class AuthManager {
    /**
     * @name AuthManager
     */
    constructor() { }
    get hasInfo() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success({ authSetting }) {
                    if (authSetting["scope.userInfo"]) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                },
                fail(e) {
                    reject(e);
                },
            });
        });
    }
    getUserInfo(isRecursive = false) {
        console.log('getUserInfo begin');
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: (result) => {
                    resolve(result);
                },
                fail: (e) => {
                    reject(e);
                },
            });
        });
    }
    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: ({ errMsg, code }) => {
                    if (errMsg === "login:ok") {
                        this.code = code;
                    }
                    resolve({ status: true });
                },
                fail: (e) => {
                    reject(e);
                }
            });
        });
    }
}
//# sourceMappingURL=auth.js.map
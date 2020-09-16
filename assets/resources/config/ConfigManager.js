//所有配置文件都可以这里获取
var configManager = {
    configs: [],
    init: function() {
        // cc.log("初始化配置文件管理器");
        this.configs["PropsConfig"] = require("PropsConfig");
        this.configs["ShootConfig"] = require("ShootConfig");
        this.configs["StageConfig"] = require("StageConfig");
    },
    getConfigTypeId: function(type, id) {
        let configs = this.configs[type];
        for(let i = 0; i < configs.length; i++) {
            let cfg = configs[i];
            if(cfg.id === id) {
                return cfg;
            }
        }
        return null;
    }
};
configManager.init();

module.exports = configManager;
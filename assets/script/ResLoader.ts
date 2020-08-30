export default class ResLoader {
    /**
    * 载入单个资源
    * - 输出log
    * @todo ts的类型系统（特别是泛型这一块）需要进一步学习，争取去掉强制类型转换
    * @param path
    * @param type
    * @static
    */
    static LoadRes<T extends typeof cc.Asset>(bundle:cc.AssetManager.bundle, path: string, type:T):Promise<InstanceType<T>> {
        return new Promise(res => {
            bundle.load(path, type, (err, resource) => {
            if (err) {
                console.error(err);
                res(null)
            } else {
                res(resource)
            }
        });
    });
}
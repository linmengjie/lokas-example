class Component {

    /**
     * @returns {Array}
     */
    static get defineDepends() {
        return [];
    }

    get defineDepends() {
        return this.__proto__.constructor.defineDepends;
    }

    /**
     * @returns {string}
     */
    static get defineName() {
        return 'Component';
    }

    /**
     * @returns {string}
     */
    get defineName() {
        return this.__proto__.constructor.defineName;
    }

    constructor() {
        this._ecs = this._ecs || null;
        this._dirty = true;
        this._entity = null;
    }

    static get defineData() {
        return {};
    }

    get defineData() {
        return this.__proto__.constructor.defineData;
    }

    /**
     * @returns {string}
     */
    getComponentName() {
        return this.constructor.defineName;
    }

    /**
     * @param {String|Component}comp
     */
    getSibling(comp) {
        if (this._entity) {
            return this._entity.get(comp);
        }
    }

    /**
     * @param {Entity}ent
     */
    setEntity(ent) {
        this._entity = ent;
    }

    /**
     * 是否是客户端
     * @returns {Boolean}
     */
    isClient() {
        return this._ecs.isClient();
    }

    /**
     * @returns {Entity}
     */
    getEntity() {
        return this._entity;
    }

    /**
     * @returns {ECS}
     */
    getECS() {
        return this._ecs;
    }

    dirty() {
        this._dirty = true;
        this.onDirty && this.onDirty(this._entity, this._entity._ecs);
        if (this.isClient()) {

            if (this.updateView) {
                this.getECS().addRenderQueue(this);
            }
            let renderer = this.getRenderer();
            if (renderer) {
                let renderComp = this.getSibling(renderer);
                renderComp && renderComp.dirty();
            }
        }
        if (this._entity) {
            this._entity.markDirty(this);
        }
        if (this._ecs && this._ecs._dirtyComponents.indexOf(this) === -1) {
            this._ecs._dirtyComponents.push(this);
        }
    }

    isDirty() {
        return this._dirty;
    }

    clean() {
        this._dirty = false;
    }

    getRenderer() {
        return this.getECS().getComponentRenderer(this);
    }

    isRenderer() {
        return this.getECS().rendererArray.indexOf(this.getComponentName()) !== -1;
    };

    /**
     * @param {Entity}ent
     * @param {ECS}ecs
     */
    onAdd(ent, ecs) {

    }

    /**
     * @param {Entity}ent
     * @param {ECS}ecs
     */
    onRemove(ent, ecs) {

    }

    /**
     * @param {Entity}ent
     * @param {ECS}ecs
     */
    onDirty(ent, ecs) {

    }

    /**
     * @param {ECS}ecs
     */
    onCreate(ecs) {

    }

    /**
     * @param {ECS}ecs
     */
    onDestroy(ecs) {

    }

    /**
     * @param {ECS}ecs
     */
    onRegister(ecs) {

    }
}

module.exports = Component;
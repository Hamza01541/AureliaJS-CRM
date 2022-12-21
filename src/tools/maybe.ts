export class Maybe {
    payload: any;

    constructor(x) {
        this.payload = x;
    }

    static of(x) {
        return new Maybe(x);
    }

    fmap(f) {
        if (this.isNothing) {
            return this;
        }
        return new Maybe(f(this.payload));
    }

    ap(m: Maybe) {
        if (this.isNothing || m.isNothing) {
            return m;
        }

        return new Maybe(m.payload(this.payload));
    }

    get isNothing() {
        return this.payload == undefined || this.payload === null;
    }

    get isSomething() {
        return !this.isNothing;
    }
}

export const empty = Maybe.of(undefined);
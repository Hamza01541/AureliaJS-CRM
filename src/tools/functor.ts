export class Functor {
    payload: any;

    constructor(x) {
        this.payload = x;
    }

    static of(x) {
        return new Functor(x);
    }

    inspect(msg?) {
        if (msg) {
            console.log(msg);
        }
        console.log(this.payload);
        return this;
    }

    fmap(f) {
        return new Functor(f(this.payload));
    }
}

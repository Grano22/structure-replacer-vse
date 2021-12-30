export default interface Clonable<T> {
    clone(): T;
    cloneEmpty(): T;
}
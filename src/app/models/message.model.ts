export class MessageModel {
    constructor(
        public _id: string,
        public text: string,
        public created_at: string,
        public emitter: string,
        public receiver: string) {
    }
}
export default class Controller {
    #view
    #service
    constructor({ view, service }) {
        this.#view = view
        this.#service = service

        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
    }

    static async initialize(deps) {
        const controller = new Controller(deps)
        controller.log("Blink detection not has yet started. Click on the button to continue")
        return controller.init()
    }

    async init () {
        console.log('init')
    }

    log(text) {
        this.#view.log(`log: ${text}`)
    }

    onBtnStart() {
        this.log('Initializing detection...')
    }
}
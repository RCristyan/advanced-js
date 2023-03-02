export default class HandGestureController {
    #camera
    #view
    #service
    constructor({ camera, view, service }){
        this.#camera = camera
        this.#view = view
        this.#service = service
    }

    async init() {
        return this.#loop()
    }

    async #estimateHands() {
        try {
            const hands = await this.#service.estimateHands(this.#camera.video)
            for await(const { event, x, y } of this.#service.detectGestures(hands)) {
                console.log({ event, x, y })
            }
        } catch (error) {
            console.log('Erro:', error)
        }
    }
    
    async #loop() {
        await this.#service.initializeDetector()
        await this.#estimateHands()
        this.#view.loop(this.#loop.bind(this))
    }

    static async initialize(deps) {
        const controller = new HandGestureController(deps)
        return controller.init()
    }
}

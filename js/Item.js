import KanbanAPI from "./KanbanAPI.js";

export default class Item {
    constructor(id, content) {
        this.element = {};
        this.element.root = Item.create()
        this.element.items = this.element.root.querySelector('.items')
        this.element.input = this.element.root.querySelector('.column__body--item')
        this.element.icons= this.element.root.querySelector('.icons')
        this.element.time = this.element.root.querySelector('.times')
        this.element.check = this.element.root.querySelector('.check')

        this.element.root.dataset.id = id
        this.element.input.textContent = content
        this.content = content

        const onBlur = () => {
            const newContent = this.element.input.textContent.trim()
            if(newContent === this.content) {
                return
            }
            this.content = newContent
            KanbanAPI.updateItem(id, {
                content: this.content
            })
        }
        this.element.time.addEventListener('click', () => {
            KanbanAPI.deleteItem(id)
            this.element.input.removeEventListener('blur', onBlur)
            this.element.root.parentElement.removeChild(this.element.root)
        })
        this.element.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData('text/plain', id)
        })
        this.element.root.addEventListener("drop", e => {
            e.preventDefault()
        })

    }
    static create() {
        const range = document.createRange()
        range.selectNode(document.body)
        return range.createContextualFragment(`
        <div class="items">
        <div class="column__body--item" contenteditable></div>
        <div class="icons">
            <span class="times">
                <i class="fa-solid fa-square-xmark"></i>
            </span>
            <span class="check">
                <i class="fa-solid fa-square-check"></i>
            </span>
        </div>
        </div>`).children[0]
    }
} 